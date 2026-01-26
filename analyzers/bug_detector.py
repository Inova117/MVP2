"""
Bug Detection Engine
Static analysis patterns for common bugs and vulnerabilities
"""

import re
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from pathlib import Path


@dataclass
class StaticFinding:
    """Finding from static analysis"""
    severity: str
    category: str
    title: str
    description: str
    line_number: int
    code_snippet: str
    pattern_matched: str


class BugDetector:
    """High-precision static bug detection"""
    
    def __init__(self, rules_config: Dict[str, Any]):
        """Initialize with rules from config"""
        self.rules = rules_config
        self.patterns = self._compile_patterns()
    
    def _compile_patterns(self) -> Dict[str, List[re.Pattern]]:
        """Compile regex patterns from rules"""
        compiled = {}
        
        for category, rules in self.rules.items():
            if category in ['file_patterns', 'severity_levels', 'thresholds']:
                continue
                
            compiled[category] = []
            
            for rule_name, rule_config in rules.items():
                if not rule_config.get('enabled', True):
                    continue
                
                patterns = rule_config.get('patterns', [])
                for pattern in patterns:
                    try:
                        compiled[category].append({
                            'name': rule_name,
                            'pattern': re.compile(pattern, re.MULTILINE),
                            'severity': rule_config.get('severity', 'medium'),
                            'description': rule_config.get('description', '')
                        })
                    except re.error as e:
                        print(f"Warning: Invalid pattern '{pattern}': {e}")
        
        return compiled
    
    def analyze_file(self, file_path: str, content: str) -> List[StaticFinding]:
        """
        Perform static analysis on file content
        
        Args:
            file_path: Path to the file
            content: File content
            
        Returns:
            List of StaticFinding objects
        """
        findings = []
        lines = content.split('\n')
        
        # Check each category of patterns
        for category, pattern_list in self.patterns.items():
            for pattern_info in pattern_list:
                findings.extend(
                    self._check_pattern(
                        pattern_info,
                        lines,
                        file_path,
                        category
                    )
                )
        
        # Additional heuristic checks
        findings.extend(self._check_function_length(lines, file_path))
        findings.extend(self._check_complexity(content, file_path))
        findings.extend(self._check_typescript_specific(lines, file_path))
        
        return findings
    
    def _check_pattern(
        self,
        pattern_info: Dict,
        lines: List[str],
        file_path: str,
        category: str
    ) -> List[StaticFinding]:
        """Check for pattern matches in code"""
        findings = []
        
        for line_num, line in enumerate(lines, 1):
            if pattern_info['pattern'].search(line):
                findings.append(StaticFinding(
                    severity=pattern_info['severity'],
                    category=category,
                    title=pattern_info['description'],
                    description=f"Pattern matched: {pattern_info['name']}",
                    line_number=line_num,
                    code_snippet=line.strip(),
                    pattern_matched=pattern_info['name']
                ))
        
        return findings
    
    def _check_function_length(
        self,
        lines: List[str],
        file_path: str
    ) -> List[StaticFinding]:
        """Check for overly long functions"""
        findings = []
        threshold = self.rules.get('quality', {}).get('long_function', {}).get('threshold', 50)
        
        in_function = False
        function_start = 0
        function_name = ""
        brace_count = 0
        
        for line_num, line in enumerate(lines, 1):
            stripped = line.strip()
            
            # Detect function start (simplified)
            if re.match(r'(function|const|let|var)\s+\w+\s*=?\s*(\(|async)', stripped):
                in_function = True
                function_start = line_num
                function_name = re.search(r'\w+', stripped).group()
                brace_count = 0
            
            if in_function:
                brace_count += stripped.count('{') - stripped.count('}')
                
                # Function ended
                if brace_count == 0 and '{' in line:
                    function_length = line_num - function_start
                    
                    if function_length > threshold:
                        findings.append(StaticFinding(
                            severity='low',
                            category='quality',
                            title='Function too long',
                            description=f'Function "{function_name}" is {function_length} lines (threshold: {threshold})',
                            line_number=function_start,
                            code_snippet=f'function {function_name} (... {function_length} lines ...)',
                            pattern_matched='long_function'
                        ))
                    
                    in_function = False
        
        return findings
    
    def _check_complexity(self, content: str, file_path: str) -> List[StaticFinding]:
        """Check cyclomatic complexity (simplified)"""
        findings = []
        
        # Count decision points
        decision_keywords = ['if', 'else', 'for', 'while', 'case', '&&', '||', '?']
        
        lines = content.split('\n')
        for line_num, line in enumerate(lines, 1):
            complexity = sum(line.count(keyword) for keyword in decision_keywords)
            
            if complexity > 5:  # High complexity in single line
                findings.append(StaticFinding(
                    severity='medium',
                    category='quality',
                    title='High complexity',
                    description=f'Line has {complexity} decision points',
                    line_number=line_num,
                    code_snippet=line.strip()[:100],
                    pattern_matched='high_complexity'
                ))
        
        return findings
    
    def _check_typescript_specific(
        self,
        lines: List[str],
        file_path: str
    ) -> List[StaticFinding]:
        """TypeScript-specific checks"""
        findings = []
        
        if not file_path.endswith(('.ts', '.tsx')):
            return findings
        
        for line_num, line in enumerate(lines, 1):
            stripped = line.strip()
            
            # Check for 'any' type abuse
            if ': any' in stripped or '<any>' in stripped:
                # Ignore type definitions and interfaces
                if not stripped.startswith('type ') and not stripped.startswith('interface '):
                    findings.append(StaticFinding(
                        severity='medium',
                        category='type_safety',
                        title='Use of "any" type',
                        description='Avoid using "any" type, use specific types instead',
                        line_number=line_num,
                        code_snippet=stripped,
                        pattern_matched='any_abuse'
                    ))
            
            # Check for non-null assertions
            if '!' in stripped and not stripped.startswith('//'):
                if re.search(r'\w+!\.', stripped):
                    findings.append(StaticFinding(
                        severity='medium',
                        category='type_safety',
                        title='Non-null assertion',
                        description='Non-null assertion (!) can cause runtime errors if value is null/undefined',
                        line_number=line_num,
                        code_snippet=stripped,
                        pattern_matched='non_null_assertion'
                    ))
            
            # Check for console.log in production code
            if 'console.log' in stripped and not stripped.startswith('//'):
                findings.append(StaticFinding(
                    severity='low',
                    category='quality',
                    title='Console.log in code',
                    description='Remove console.log statements before production',
                    line_number=line_num,
                    code_snippet=stripped,
                    pattern_matched='console_log'
                ))
        
        return findings
    
    def get_summary(self, findings: List[StaticFinding]) -> Dict[str, Any]:
        """Generate summary statistics"""
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
            summary['by_severity'][finding.severity] = \
                summary['by_severity'].get(finding.severity, 0) + 1
            
            summary['by_category'][finding.category] = \
                summary['by_category'].get(finding.category, 0) + 1
        
        return summary
