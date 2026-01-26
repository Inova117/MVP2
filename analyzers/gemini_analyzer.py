"""
Gemini Flash API Integration for Code Analysis
Handles communication with Google's Gemini API for intelligent code analysis
"""

import os
import json
import time
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import google.generativeai as genai
from rich.console import Console

console = Console()


@dataclass
class AnalysisResult:
    """Structured result from Gemini analysis"""
    severity: str  # critical, high, medium, low
    category: str  # security, logic, performance, quality
    title: str
    description: str
    file_path: str
    line_start: Optional[int]
    line_end: Optional[int]
    code_snippet: Optional[str]
    suggestion: str
    impact: str
    confidence: int  # 0-100


class GeminiAnalyzer:
    """High-precision code analyzer using Gemini Flash API"""
    
    def __init__(self, api_key: str):
        """Initialize Gemini analyzer with API key"""
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.rate_limit_delay = 1.0  # seconds between requests
        self.last_request_time = 0
        
    def _wait_for_rate_limit(self):
        """Ensure we don't exceed rate limits"""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.rate_limit_delay:
            time.sleep(self.rate_limit_delay - elapsed)
        self.last_request_time = time.time()
    
    def analyze_code(
        self,
        code: str,
        file_path: str,
        file_type: str,
        context: Optional[Dict[str, Any]] = None
    ) -> List[AnalysisResult]:
        """
        Analyze code using Gemini Flash API
        
        Args:
            code: The code to analyze
            file_path: Path to the file being analyzed
            file_type: File extension (ts, tsx, js, py, etc.)
            context: Additional context (related files, git diff, etc.)
            
        Returns:
            List of AnalysisResult objects
        """
        self._wait_for_rate_limit()
        
        prompt = self._build_analysis_prompt(code, file_path, file_type, context)
        
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    'temperature': 0.1,  # Low temperature for consistent results
                    'top_p': 0.95,
                    'top_k': 40,
                    'max_output_tokens': 8192,
                }
            )
            
            return self._parse_response(response.text, file_path)
            
        except Exception as e:
            console.print(f"[red]Error analyzing {file_path}: {str(e)}[/red]")
            return []
    
    def _build_analysis_prompt(
        self,
        code: str,
        file_path: str,
        file_type: str,
        context: Optional[Dict[str, Any]]
    ) -> str:
        """Build context-aware prompt for Gemini"""
        
        base_prompt = f"""You are an expert code reviewer specializing in bug detection and security analysis.
Analyze the following {file_type.upper()} code for bugs, security vulnerabilities, and code quality issues.

FILE: {file_path}

CODE:
```{file_type}
{code}
```

"""
        
        if context:
            if 'git_diff' in context:
                base_prompt += f"\nRECENT CHANGES:\n```diff\n{context['git_diff']}\n```\n"
            
            if 'related_files' in context:
                base_prompt += f"\nRELATED FILES: {', '.join(context['related_files'])}\n"
        
        base_prompt += """
ANALYZE FOR:

1. **SECURITY VULNERABILITIES** (CRITICAL/HIGH):
   - SQL Injection, XSS, CSRF
   - Authentication/Authorization flaws
   - Exposed secrets, API keys, passwords
   - Insecure data handling
   - Path traversal vulnerabilities

2. **LOGIC BUGS** (HIGH/MEDIUM):
   - Null/undefined dereferencing
   - Race conditions
   - Infinite loops
   - Off-by-one errors
   - Incorrect async/await usage
   - State management issues

3. **TYPE SAFETY** (MEDIUM):
   - Missing type annotations
   - Unsafe type assertions
   - Excessive use of 'any'
   - Type coercion problems

4. **ERROR HANDLING** (HIGH/MEDIUM):
   - Unhandled promise rejections
   - Missing try-catch blocks
   - Silent error suppression
   - Improper error propagation

5. **PERFORMANCE** (MEDIUM/LOW):
   - Memory leaks (event listeners, intervals)
   - N+1 query problems
   - Inefficient algorithms
   - Unnecessary re-renders (React)

6. **CODE QUALITY** (LOW):
   - Code smells
   - Duplicated code
   - Long functions (>50 lines)
   - High complexity

RESPONSE FORMAT (JSON):
Return a JSON array of findings. Each finding must have:
{
  "severity": "critical|high|medium|low",
  "category": "security|logic|type_safety|error_handling|performance|quality",
  "title": "Brief title of the issue",
  "description": "Detailed explanation of what's wrong",
  "line_start": <line number or null>,
  "line_end": <line number or null>,
  "code_snippet": "The problematic code",
  "suggestion": "How to fix it with code example",
  "impact": "Why this matters and potential consequences",
  "confidence": <0-100, how confident you are this is a real issue>
}

IMPORTANT:
- Only report REAL issues with high confidence (>70%)
- Provide SPECIFIC line numbers when possible
- Include CODE EXAMPLES in suggestions
- Focus on ACTIONABLE findings
- If no issues found, return empty array: []

Return ONLY valid JSON, no markdown formatting.
"""
        
        return base_prompt
    
    def _parse_response(self, response_text: str, file_path: str) -> List[AnalysisResult]:
        """Parse Gemini response into structured results"""
        try:
            # Remove markdown code blocks if present
            response_text = response_text.strip()
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            findings = json.loads(response_text)
            
            if not isinstance(findings, list):
                console.print(f"[yellow]Warning: Expected list, got {type(findings)}[/yellow]")
                return []
            
            results = []
            for finding in findings:
                try:
                    result = AnalysisResult(
                        severity=finding.get('severity', 'low'),
                        category=finding.get('category', 'quality'),
                        title=finding.get('title', 'Unknown issue'),
                        description=finding.get('description', ''),
                        file_path=file_path,
                        line_start=finding.get('line_start'),
                        line_end=finding.get('line_end'),
                        code_snippet=finding.get('code_snippet'),
                        suggestion=finding.get('suggestion', ''),
                        impact=finding.get('impact', ''),
                        confidence=finding.get('confidence', 50)
                    )
                    
                    # Filter by confidence threshold
                    if result.confidence >= 70:
                        results.append(result)
                    
                except Exception as e:
                    console.print(f"[yellow]Warning: Failed to parse finding: {e}[/yellow]")
                    continue
            
            return results
            
        except json.JSONDecodeError as e:
            console.print(f"[red]Failed to parse JSON response: {e}[/red]")
            console.print(f"[dim]Response: {response_text[:200]}...[/dim]")
            return []
        except Exception as e:
            console.print(f"[red]Error parsing response: {e}[/red]")
            return []
    
    def analyze_multiple_files(
        self,
        files: List[Dict[str, str]],
        max_concurrent: int = 3
    ) -> Dict[str, List[AnalysisResult]]:
        """
        Analyze multiple files (sequential for now, can be made async)
        
        Args:
            files: List of dicts with 'path', 'content', 'type'
            max_concurrent: Max concurrent requests (for future async implementation)
            
        Returns:
            Dict mapping file paths to analysis results
        """
        results = {}
        
        for i, file_info in enumerate(files, 1):
            console.print(f"[cyan]Analyzing {file_info['path']} ({i}/{len(files)})...[/cyan]")
            
            file_results = self.analyze_code(
                code=file_info['content'],
                file_path=file_info['path'],
                file_type=file_info['type'],
                context=file_info.get('context')
            )
            
            results[file_info['path']] = file_results
            
            if file_results:
                console.print(f"[green]✓ Found {len(file_results)} issues[/green]")
            else:
                console.print(f"[dim]✓ No issues found[/dim]")
        
        return results
