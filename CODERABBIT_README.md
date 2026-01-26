# 🐰 CodeRabbit - High-Precision Code Audit System

Automated code analysis system powered by **Gemini Flash AI** that detects bugs, security vulnerabilities, and code quality issues with high precision.

## ✨ Features

### 🎯 High-Precision Bug Detection
- **Security Vulnerabilities**: SQL Injection, XSS, CSRF, exposed secrets
- **Logic Bugs**: Null dereferencing, race conditions, infinite loops
- **Type Safety**: Missing types, unsafe assertions, `any` abuse
- **Error Handling**: Unhandled promises, missing try-catch blocks
- **Performance**: Memory leaks, N+1 queries, inefficient algorithms
- **Code Quality**: Code smells, complexity, duplicated code

### 🤖 AI-Powered Analysis
- Uses **Gemini Flash 1.5** for context-aware code understanding
- Multi-file context analysis
- Framework-specific checks (Next.js, React, TypeScript)
- Confidence scoring (only reports issues >70% confidence)

### 📊 Professional Reports
- **Markdown**: Human-readable with code snippets
- **JSON**: Machine-readable for CI/CD integration
- **Summary**: Executive summary with key metrics
- **Critical**: Critical issues only report
- **Console**: Beautiful terminal output with Rich

### ⚡ Smart Analysis
- **Git Integration**: Only analyzes changed files
- **Incremental**: Avoids re-analyzing unchanged code
- **Scheduled**: Runs every 2 hours automatically
- **Parallel Processing**: Fast analysis of multiple files

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements-coderabbit.txt
```

### 2. Configure API Key

Copy the example environment file:

```bash
cp .env.audit.example .env.audit
```

Edit `.env.audit` and add your Gemini API key:

```bash
GEMINI_API_KEY=your_api_key_here
```

**Get your API key:** https://makersuite.google.com/app/apikey

### 3. Run Analysis

```bash
# Analyze files changed in last 2 hours
python code_rabbit.py analyze

# Analyze files changed in last 6 hours
python code_rabbit.py analyze --hours 6

# Analyze ALL files
python code_rabbit.py all

# Schedule automatic analysis every 2 hours
python code_rabbit.py schedule

# Schedule with custom interval
python code_rabbit.py schedule --interval 4
```

---

## 📋 Usage Examples

### One-Time Analysis

```bash
# Quick check of recent changes
python code_rabbit.py analyze

# Deep analysis of all files
python code_rabbit.py all
```

### Scheduled Analysis (Recommended)

```bash
# Run in background every 2 hours
nohup python code_rabbit.py schedule > audit.log 2>&1 &

# Check the log
tail -f audit.log
```

### Using Cron (Alternative)

Add to crontab:

```bash
# Run every 2 hours
0 */2 * * * cd /path/to/project && python code_rabbit.py analyze >> audit.log 2>&1
```

---

## ⚙️ Configuration

### Environment Variables (`.env.audit`)

```bash
# API Configuration
GEMINI_API_KEY=your_api_key_here

# Analysis Settings
ANALYSIS_INTERVAL_HOURS=2
MAX_FILES_PER_RUN=50
ENABLE_PARALLEL_PROCESSING=true

# Report Settings
REPORT_OUTPUT_DIR=./audit-reports
ENABLE_HTML_REPORTS=true
ENABLE_JSON_REPORTS=true
ENABLE_MARKDOWN_REPORTS=true

# Severity Thresholds
FAIL_ON_CRITICAL=false
FAIL_ON_HIGH=false
MIN_CONFIDENCE_SCORE=70

# Git Settings
GIT_BRANCH=main
ANALYZE_LAST_N_COMMITS=5
INCLUDE_UNCOMMITTED_CHANGES=true

# File Patterns
INCLUDE_PATTERNS=*.ts,*.tsx,*.js,*.jsx,*.py
EXCLUDE_PATTERNS=node_modules/**,*.test.ts,dist/**,build/**
```

### Audit Rules (`config/audit_rules.yaml`)

Customize detection rules, severity levels, and patterns:

```yaml
security:
  sql_injection:
    severity: critical
    enabled: true
    patterns:
      - "execute.*\\+.*"
      - "query.*\\+.*"

# ... more rules
```

---

## 📊 Report Structure

```
audit-reports/
├── latest/
│   ├── summary.md              # Executive summary
│   ├── critical.md             # Critical issues only
│   ├── full-report.json        # Complete findings (JSON)
│   └── full-report.md          # Complete findings (Markdown)
├── history/
│   ├── 2026-01-14_19-21.json
│   └── 2026-01-14_19-21.md
└── trends/
    ├── bug-trends.json         # Bug count over time
    └── quality-score.json      # Quality metrics trend
```

---

## 🎯 What Gets Detected

### 🔴 Critical Issues

- **SQL Injection**: Unsafe query construction
- **XSS Vulnerabilities**: Unsafe HTML rendering
- **Exposed Secrets**: API keys, passwords in code
- **Authentication Flaws**: Insecure auth patterns

### 🟠 High Priority

- **Null Dereferencing**: Potential null/undefined access
- **Race Conditions**: Async/await issues
- **Unhandled Promises**: Missing error handling
- **Memory Leaks**: Event listeners, intervals not cleaned up

### 🟡 Medium Priority

- **Type Safety**: Missing types, `any` abuse
- **Code Complexity**: High cyclomatic complexity
- **Performance**: Inefficient patterns

### ⚪ Low Priority

- **Code Smells**: Long functions, duplicated code
- **Console Logs**: Debug statements in production
- **Documentation**: Missing comments

---

## 📈 Example Report

### Summary

```markdown
# Code Audit Report

**Generated:** 2026-01-14 19:30:00
**Files Analyzed:** 15
**Total Issues:** 23

## 📊 Summary

- **Critical:** 2 🔴
- **High:** 5 🟠
- **Medium:** 10 🟡
- **Low:** 6 ⚪

### Critical Issues

1. **Exposed API Key** in `lib/api.ts`
   - Line 15: API key hardcoded in source
   - **Impact:** Security breach, unauthorized access
   - **Fix:** Move to environment variables

2. **SQL Injection** in `api/users/route.ts`
   - Line 42: Unsafe query construction
   - **Impact:** Database compromise
   - **Fix:** Use parameterized queries
```

---

## 🔧 Advanced Usage

### CI/CD Integration

```bash
# In your CI pipeline
python code_rabbit.py analyze --hours 24

# Fail build on critical issues
if grep -q '"severity": "critical"' audit-reports/latest/full-report.json; then
  echo "Critical issues found!"
  exit 1
fi
```

### Custom Rules

Edit `config/audit_rules.yaml` to add project-specific rules:

```yaml
custom:
  deprecated_api:
    severity: high
    enabled: true
    description: "Using deprecated API"
    patterns:
      - "oldFunction\\("
      - "deprecatedMethod\\("
```

---

## 🎨 Console Output

CodeRabbit provides beautiful, color-coded terminal output:

```
🐰 CodeRabbit - Code Audit System

📝 Analyzing 15 files...

✓ lib/api.ts: 3 issues
✓ app/page.tsx: No issues
✓ components/Button.tsx: 1 issue

📊 Generating reports...

┌─────────────────┬───────┐
│ Severity        │ Count │
├─────────────────┼───────┤
│ CRITICAL        │   2   │
│ HIGH            │   5   │
│ MEDIUM          │  10   │
│ LOW             │   6   │
└─────────────────┴───────┘

🔴 CRITICAL ISSUES:
  • Exposed API Key in lib/api.ts
  • SQL Injection in api/users/route.ts

✓ Analysis complete!

Reports saved to:
  • summary: ./audit-reports/latest/summary.md
  • critical: ./audit-reports/latest/critical.md
  • json: ./audit-reports/latest/full-report.json
  • markdown: ./audit-reports/latest/full-report.md
```

---

## 🤝 Contributing

To add new detection rules:

1. Edit `config/audit_rules.yaml`
2. Add patterns to `analyzers/bug_detector.py`
3. Update Gemini prompts in `analyzers/gemini_analyzer.py`

---

## 📝 License

MIT License - Feel free to use in your projects!

---

## 🆘 Troubleshooting

### "GEMINI_API_KEY not found"

Make sure you've created `.env.audit` with your API key:

```bash
cp .env.audit.example .env.audit
# Edit and add your key
```

### "No files to analyze"

Check your file patterns in `.env.audit`:

```bash
INCLUDE_PATTERNS=*.ts,*.tsx,*.js,*.jsx
```

### High API costs

Reduce analysis frequency or file count:

```bash
MAX_FILES_PER_RUN=20
ANALYSIS_INTERVAL_HOURS=4
```

---

## 🎯 Success Metrics

- **Detection Rate**: >90% for known vulnerabilities
- **False Positive Rate**: <10%
- **Performance**: Analyzes 1000 LOC in <30 seconds
- **Confidence**: Only reports issues >70% confidence

---

**Built with ❤️ using Gemini Flash AI**
