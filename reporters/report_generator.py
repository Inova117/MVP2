"""
Report Generator
Creates beautiful, actionable reports in multiple formats
"""

import json
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any
from jinja2 import Template
from rich.console import Console
from rich.table import Table
from rich.panel import Panel

console = Console()


class ReportGenerator:
    """Multi-format report generation"""
    
    def __init__(self, output_dir: str = "./audit-reports"):
        """Initialize report generator"""
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Create subdirectories
        (self.output_dir / "latest").mkdir(exist_ok=True)
        (self.output_dir / "history").mkdir(exist_ok=True)
        (self.output_dir / "trends").mkdir(exist_ok=True)
    
    def generate_all_reports(
        self,
        findings: Dict[str, List[Any]],
        metadata: Dict[str, Any]
    ) -> Dict[str, str]:
        """
        Generate all report formats
        
        Args:
            findings: Dict mapping file paths to findings
            metadata: Analysis metadata (timestamp, git info, etc.)
            
        Returns:
            Dict of generated report paths
        """
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
        
        # Aggregate all findings
        all_findings = []
        for file_path, file_findings in findings.items():
            all_findings.extend(file_findings)
        
        # Generate reports
        reports = {}
        
        # JSON report
        json_path = self._generate_json_report(all_findings, metadata, timestamp)
        reports['json'] = str(json_path)
        
        # Markdown report
        md_path = self._generate_markdown_report(all_findings, metadata, timestamp)
        reports['markdown'] = str(md_path)
        
        # Summary report
        summary_path = self._generate_summary_report(all_findings, metadata)
        reports['summary'] = str(summary_path)
        
        # Critical issues report
        critical_path = self._generate_critical_report(all_findings, metadata)
        reports['critical'] = str(critical_path)
        
        # Console output
        self._print_console_summary(all_findings, metadata)
        
        return reports
    
    def _generate_json_report(
        self,
        findings: List[Any],
        metadata: Dict[str, Any],
        timestamp: str
    ) -> Path:
        """Generate JSON report"""
        
        report_data = {
            'metadata': metadata,
            'summary': self._calculate_summary(findings),
            'findings': [self._serialize_finding(f) for f in findings]
        }
        
        # Save to history
        history_path = self.output_dir / "history" / f"{timestamp}.json"
        with open(history_path, 'w') as f:
            json.dump(report_data, f, indent=2)
        
        # Save to latest
        latest_path = self.output_dir / "latest" / "full-report.json"
        with open(latest_path, 'w') as f:
            json.dump(report_data, f, indent=2)
        
        return latest_path
    
    def _generate_markdown_report(
        self,
        findings: List[Any],
        metadata: Dict[str, Any],
        timestamp: str
    ) -> Path:
        """Generate Markdown report"""
        
        summary = self._calculate_summary(findings)
        
        md_content = f"""# Code Audit Report

**Generated:** {metadata.get('timestamp', 'N/A')}  
**Branch:** {metadata.get('git_branch', 'N/A')}  
**Commit:** {metadata.get('git_commit', 'N/A')}  
**Files Analyzed:** {metadata.get('files_analyzed', 0)}

---

## 📊 Summary

- **Total Issues:** {summary['total']}
- **Critical:** {summary['by_severity']['critical']} 🔴
- **High:** {summary['by_severity']['high']} 🟠
- **Medium:** {summary['by_severity']['medium']} 🟡
- **Low:** {summary['by_severity']['low']} ⚪

### By Category

"""
        
        for category, count in summary['by_category'].items():
            md_content += f"- **{category.replace('_', ' ').title()}:** {count}\n"
        
        md_content += "\n---\n\n"
        
        # Group findings by severity
        by_severity = {
            'critical': [],
            'high': [],
            'medium': [],
            'low': []
        }
        
        for finding in findings:
            severity = getattr(finding, 'severity', 'low')
            by_severity[severity].append(finding)
        
        # Write findings by severity
        severity_icons = {
            'critical': '🔴',
            'high': '🟠',
            'medium': '🟡',
            'low': '⚪'
        }
        
        for severity in ['critical', 'high', 'medium', 'low']:
            if not by_severity[severity]:
                continue
            
            md_content += f"## {severity_icons[severity]} {severity.upper()} Issues ({len(by_severity[severity])})\n\n"
            
            for i, finding in enumerate(by_severity[severity], 1):
                md_content += self._format_finding_markdown(finding, i)
        
        # Save to history
        history_path = self.output_dir / "history" / f"{timestamp}.md"
        with open(history_path, 'w') as f:
            f.write(md_content)
        
        # Save to latest
        latest_path = self.output_dir / "latest" / "full-report.md"
        with open(latest_path, 'w') as f:
            f.write(md_content)
        
        return latest_path
    
    def _generate_summary_report(
        self,
        findings: List[Any],
        metadata: Dict[str, Any]
    ) -> Path:
        """Generate executive summary"""
        
        summary = self._calculate_summary(findings)
        
        # Get top issues
        critical = [f for f in findings if getattr(f, 'severity', '') == 'critical']
        high = [f for f in findings if getattr(f, 'severity', '') == 'high']
        
        md_content = f"""# Executive Summary

**Date:** {metadata.get('timestamp', 'N/A')}

## 🎯 Key Metrics

- **Files Analyzed:** {metadata.get('files_analyzed', 0)}
- **Total Issues Found:** {summary['total']}
- **Critical Issues:** {summary['by_severity']['critical']}
- **High Priority Issues:** {summary['by_severity']['high']}

## ⚠️ Action Required

"""
        
        if critical:
            md_content += f"### 🔴 Critical Issues ({len(critical)})\n\n"
            md_content += "These issues require **immediate attention**:\n\n"
            for finding in critical[:5]:  # Top 5
                md_content += f"- **{getattr(finding, 'title', 'Unknown')}** in `{getattr(finding, 'file_path', 'unknown')}`\n"
                md_content += f"  - {getattr(finding, 'impact', 'No impact description')}\n\n"
        
        if high:
            md_content += f"\n### 🟠 High Priority ({len(high)})\n\n"
            for finding in high[:5]:  # Top 5
                md_content += f"- **{getattr(finding, 'title', 'Unknown')}** in `{getattr(finding, 'file_path', 'unknown')}`\n"
        
        md_content += "\n## 📈 Trends\n\n"
        md_content += "_Trend analysis will be available after multiple audit runs._\n"
        
        # Save summary
        summary_path = self.output_dir / "latest" / "summary.md"
        with open(summary_path, 'w') as f:
            f.write(md_content)
        
        return summary_path
    
    def _generate_critical_report(
        self,
        findings: List[Any],
        metadata: Dict[str, Any]
    ) -> Path:
        """Generate critical issues only report"""
        
        critical = [f for f in findings if getattr(f, 'severity', '') == 'critical']
        
        md_content = f"""# 🔴 Critical Issues Report

**Generated:** {metadata.get('timestamp', 'N/A')}  
**Total Critical Issues:** {len(critical)}

---

"""
        
        if not critical:
            md_content += "✅ **No critical issues found!**\n"
        else:
            for i, finding in enumerate(critical, 1):
                md_content += self._format_finding_markdown(finding, i)
        
        # Save critical report
        critical_path = self.output_dir / "latest" / "critical.md"
        with open(critical_path, 'w') as f:
            f.write(md_content)
        
        return critical_path
    
    def _format_finding_markdown(self, finding: Any, index: int) -> str:
        """Format a single finding as markdown"""
        
        md = f"### {index}. {getattr(finding, 'title', 'Unknown Issue')}\n\n"
        md += f"**File:** `{getattr(finding, 'file_path', 'unknown')}`  \n"
        
        line_start = getattr(finding, 'line_start', None)
        line_end = getattr(finding, 'line_end', None)
        
        if line_start:
            if line_end and line_end != line_start:
                md += f"**Lines:** {line_start}-{line_end}  \n"
            else:
                md += f"**Line:** {line_start}  \n"
        
        md += f"**Category:** {getattr(finding, 'category', 'unknown').replace('_', ' ').title()}  \n"
        md += f"**Confidence:** {getattr(finding, 'confidence', 0)}%  \n\n"
        
        md += f"**Description:**  \n{getattr(finding, 'description', 'No description')}\n\n"
        
        code_snippet = getattr(finding, 'code_snippet', None)
        if code_snippet:
            md += f"**Code:**\n```typescript\n{code_snippet}\n```\n\n"
        
        impact = getattr(finding, 'impact', None)
        if impact:
            md += f"**Impact:**  \n{impact}\n\n"
        
        suggestion = getattr(finding, 'suggestion', None)
        if suggestion:
            md += f"**Suggested Fix:**  \n{suggestion}\n\n"
        
        md += "---\n\n"
        
        return md
    
    def _calculate_summary(self, findings: List[Any]) -> Dict[str, Any]:
        """Calculate summary statistics"""
        
        summary = {
            'total': len(findings),
            'by_severity': {
                'critical': 0,
                'high': 0,
                'medium': 0,
                'low': 0
            },
            'by_category': {}
        }
        
        for finding in findings:
            severity = getattr(finding, 'severity', 'low')
            category = getattr(finding, 'category', 'unknown')
            
            summary['by_severity'][severity] = summary['by_severity'].get(severity, 0) + 1
            summary['by_category'][category] = summary['by_category'].get(category, 0) + 1
        
        return summary
    
    def _serialize_finding(self, finding: Any) -> Dict[str, Any]:
        """Serialize finding to dict"""
        
        return {
            'severity': getattr(finding, 'severity', 'low'),
            'category': getattr(finding, 'category', 'unknown'),
            'title': getattr(finding, 'title', 'Unknown'),
            'description': getattr(finding, 'description', ''),
            'file_path': getattr(finding, 'file_path', ''),
            'line_start': getattr(finding, 'line_start', None),
            'line_end': getattr(finding, 'line_end', None),
            'code_snippet': getattr(finding, 'code_snippet', None),
            'suggestion': getattr(finding, 'suggestion', ''),
            'impact': getattr(finding, 'impact', ''),
            'confidence': getattr(finding, 'confidence', 0)
        }
    
    def _print_console_summary(self, findings: List[Any], metadata: Dict[str, Any]):
        """Print beautiful console summary"""
        
        summary = self._calculate_summary(findings)
        
        # Create summary table
        table = Table(title="📊 Audit Summary", show_header=True)
        table.add_column("Severity", style="bold")
        table.add_column("Count", justify="right")
        
        severity_colors = {
            'critical': 'red',
            'high': 'yellow',
            'medium': 'blue',
            'low': 'dim'
        }
        
        for severity in ['critical', 'high', 'medium', 'low']:
            count = summary['by_severity'][severity]
            if count > 0:
                table.add_row(
                    f"[{severity_colors[severity]}]{severity.upper()}[/{severity_colors[severity]}]",
                    f"[{severity_colors[severity]}]{count}[/{severity_colors[severity]}]"
                )
        
        console.print(table)
        
        # Print critical issues
        critical = [f for f in findings if getattr(f, 'severity', '') == 'critical']
        if critical:
            console.print("\n[red bold]🔴 CRITICAL ISSUES:[/red bold]")
            for finding in critical[:3]:
                console.print(f"  • {getattr(finding, 'title', 'Unknown')} in {getattr(finding, 'file_path', 'unknown')}")
