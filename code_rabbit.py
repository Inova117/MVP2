"""
CodeRabbit - High-Precision Code Audit System
Automated code analysis using Gemini Flash API
"""

#!/usr/bin/env python3

import os
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Any, Optional
import click
import yaml
import schedule
from dotenv import load_dotenv
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
import git

# Add current directory to path
sys.path.insert(0, str(Path(__file__).parent))

from analyzers.gemini_analyzer import GeminiAnalyzer, AnalysisResult
from analyzers.bug_detector import BugDetector, StaticFinding
from reporters.report_generator import ReportGenerator

console = Console()


class CodeRabbit:
    """Main orchestrator for code analysis"""
    
    def __init__(self, config_path: str = "config/audit_rules.yaml", offline: bool = False):
        """Initialize CodeRabbit"""
        load_dotenv('.env.audit')
        
        self.offline = offline
        self.api_key = os.getenv('GEMINI_API_KEY')
        
        if not self.api_key and not self.offline:
            console.print("[yellow]Warning: GEMINI_API_KEY not found. Switching to offline mode (static analysis only).[/yellow]")
            self.offline = True
        
        # Load configuration
        self.config = self._load_config(config_path)
        
        # Initialize components
        # Only init Gemini if not offline
        if not self.offline and self.api_key:
            self.gemini_analyzer = GeminiAnalyzer(self.api_key)
        else:
            self.gemini_analyzer = None
            
        self.bug_detector = BugDetector(self.config)
        self.report_generator = ReportGenerator(
            os.getenv('REPORT_OUTPUT_DIR', './audit-reports')
        )
        
        # Git repository
        try:
            self.repo = git.Repo('.')
        except (git.InvalidGitRepositoryError, git.NoSuchPathError):
            self.repo = None
        
        # Settings
        self.max_files = int(os.getenv('MAX_FILES_PER_RUN', 50))
        self.include_patterns = os.getenv('INCLUDE_PATTERNS', '*.ts,*.tsx,*.js,*.jsx,*.py').split(',')
        self.exclude_patterns = os.getenv('EXCLUDE_PATTERNS', 'node_modules/**,dist/**').split(',')
    
    def _load_config(self, config_path: str) -> Dict[str, Any]:
        """Load YAML configuration"""
        try:
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            console.print(f"[yellow]Warning: Config file {config_path} not found, using defaults[/yellow]")
            return {}
    
    def get_changed_files(self, hours: int = 2) -> List[Path]:
        """Get files changed in the last N hours (Git + Filesystem fallback)"""
        
        changed_files = set()
        
        # Method 1: Git detection (if available)
        if self.repo:
            try:
                # Uncommitted changes
                if os.getenv('INCLUDE_UNCOMMITTED_CHANGES', 'true').lower() == 'true':
                    # Staged
                    for item in self.repo.index.diff(None):
                        file_path = Path(item.a_path)
                        if self._should_analyze_file(file_path):
                            changed_files.add(file_path)
                    # Untracked
                    for item in self.repo.untracked_files:
                        file_path = Path(item)
                        if self._should_analyze_file(file_path):
                            changed_files.add(file_path)
                                
                # Committed changes
                since = datetime.now() - timedelta(hours=hours)
                commits = list(self.repo.iter_commits(since=since.isoformat()))
                for commit in commits:
                    for item in commit.stats.files:
                        file_path = Path(item)
                        if self._should_analyze_file(file_path):
                            changed_files.add(file_path)
            except Exception as e:
                console.print(f"[yellow]Git detection warning: {e}[/yellow]")

        # Method 2: Filesystem mtime detection (Always run this to catch non-git changes)
        try:
            cutoff_time = time.time() - (hours * 3600)
            for pattern in self.include_patterns:
                for file_path in Path('.').rglob(pattern.strip()):
                    if file_path.is_file():
                        try:
                            mtime = file_path.stat().st_mtime
                            if mtime > cutoff_time and self._should_analyze_file(file_path):
                                changed_files.add(file_path)
                        except OSError:
                            pass
        except Exception as e:
            console.print(f"[yellow]Filesystem detection warning: {e}[/yellow]")
            
        if not changed_files:
            console.print(f"[dim]No changed files found in last {hours} hours[/dim]")
            return []
            
        return list(changed_files)[:self.max_files]
    
    def _get_all_files(self) -> List[Path]:
        """Get all files matching patterns"""
        files = []
        
        for pattern in self.include_patterns:
            pattern = pattern.strip()
            for file_path in Path('.').rglob(pattern):
                if self._should_analyze_file(file_path):
                    files.append(file_path)
                    if len(files) >= self.max_files:
                        return files
        
        return files
    
    def _should_analyze_file(self, file_path: Path) -> bool:
        """Check if file should be analyzed"""
        
        # Check if file exists
        if not file_path.exists() or not file_path.is_file():
            return False
        
        # Check exclude patterns
        for pattern in self.exclude_patterns:
            pattern = pattern.strip()
            if file_path.match(pattern):
                return False
        
        # Check include patterns
        for pattern in self.include_patterns:
            pattern = pattern.strip()
            if file_path.match(pattern):
                return True
        
        return False
    
    def analyze_files(self, files: List[Path]) -> Dict[str, List[Any]]:
        """Analyze multiple files"""
        
        if not files:
            console.print("[yellow]No files to analyze[/yellow]")
            return {}
        
        console.print(f"\n[cyan]📝 Analyzing {len(files)} files...[/cyan]\n")
        
        all_findings = {}
        
        with Progress(
            SpinnerColumn(),
            TextColumn("[progress.description]{task.description}"),
            console=console
        ) as progress:
            
            task = progress.add_task("Analyzing...", total=len(files))
            
            for file_path in files:
                progress.update(task, description=f"Analyzing {file_path.name}...")
                
                try:
                    # Read file content
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Static analysis
                    static_findings = self.bug_detector.analyze_file(
                        str(file_path),
                        content
                    )
                    
                    # AI analysis with Gemini
                    file_type = file_path.suffix[1:]  # Remove dot
                    ai_findings = []
                    
                    if self.gemini_analyzer:
                        ai_findings = self.gemini_analyzer.analyze_code(
                            code=content,
                            file_path=str(file_path),
                            file_type=file_type,
                            context=self._get_file_context(file_path)
                        )
                    
                    # Combine findings
                    combined_findings = list(static_findings) + list(ai_findings)
                    
                    if combined_findings:
                        all_findings[str(file_path)] = combined_findings
                        console.print(f"[green]✓ {file_path.name}: {len(combined_findings)} issues[/green]")
                    else:
                        console.print(f"[dim]✓ {file_path.name}: No issues[/dim]")
                    
                except Exception as e:
                    console.print(f"[red]✗ {file_path.name}: Error - {str(e)}[/red]")
                
                progress.advance(task)
        
        return all_findings
    
    def _get_file_context(self, file_path: Path) -> Dict[str, Any]:
        """Get context for file analysis"""
        context = {}
        
        # Get git diff if available
        if self.repo:
            try:
                diff = self.repo.git.diff('HEAD', str(file_path))
                if diff:
                    context['git_diff'] = diff
            except:
                pass
        
        # Get related files (same directory)
        related = []
        for sibling in file_path.parent.glob('*'):
            if sibling != file_path and sibling.is_file():
                related.append(str(sibling))
        
        if related:
            context['related_files'] = related[:5]  # Max 5
        
        return context
    
    def run_analysis(self, hours: Optional[int] = None) -> Dict[str, str]:
        """Run complete analysis"""
        
        console.print("\n[bold cyan]🐰 CodeRabbit - Code Audit System[/bold cyan]\n")
        
        # Get files to analyze
        if hours:
            files = self.get_changed_files(hours)
            console.print(f"[cyan]Analyzing files changed in last {hours} hours[/cyan]")
        else:
            files = self._get_all_files()
            console.print(f"[cyan]Analyzing all matching files[/cyan]")
        
        if not files:
            console.print("[yellow]No files to analyze[/yellow]")
            return {}
        
        # Analyze files
        findings = self.analyze_files(files)
        
        # Generate metadata
        metadata = {
            'timestamp': datetime.now().isoformat(),
            'files_analyzed': len(files),
            'git_branch': self.repo.active_branch.name if self.repo else 'N/A',
            'git_commit': self.repo.head.commit.hexsha[:8] if self.repo else 'N/A',
        }
        
        # Generate reports
        console.print("\n[cyan]📊 Generating reports...[/cyan]")
        report_paths = self.report_generator.generate_all_reports(findings, metadata)
        
        console.print("\n[green]✓ Analysis complete![/green]")
        console.print(f"\n[cyan]Reports saved to:[/cyan]")
        for report_type, path in report_paths.items():
            console.print(f"  • {report_type}: {path}")
        
        return report_paths
    
    def schedule_analysis(self, interval_hours: int = 2):
        """Schedule periodic analysis"""
        
        console.print(f"\n[cyan]🕐 Scheduling analysis every {interval_hours} hours[/cyan]")
        console.print("[dim]Press Ctrl+C to stop[/dim]\n")
        
        # Run immediately
        self.run_analysis(hours=interval_hours)
        
        # Schedule future runs
        schedule.every(interval_hours).hours.do(
            lambda: self.run_analysis(hours=interval_hours)
        )
        
        # Keep running
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            console.print("\n[yellow]Stopped by user[/yellow]")


@click.group()
def cli():
    """CodeRabbit - High-Precision Code Audit System"""
    pass


@cli.command()
@click.option('--hours', default=2, help='Analyze files changed in last N hours')
def analyze(hours):
    """Run code analysis once"""
    rabbit = CodeRabbit()
    rabbit.run_analysis(hours=hours)


@cli.command()
@click.option('--interval', default=2, help='Analysis interval in hours')
def schedule_cmd(interval):
    """Schedule periodic analysis"""
    rabbit = CodeRabbit()
    rabbit.schedule_analysis(interval_hours=interval)


@cli.command()
def all():
    """Analyze all files (ignore git changes)"""
    rabbit = CodeRabbit()
    rabbit.run_analysis(hours=None)


if __name__ == '__main__':
    cli()
