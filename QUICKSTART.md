# 🚀 CodeRabbit Quick Start Guide

## Get Started in 3 Steps

### Step 1: Get Your Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Configure CodeRabbit

Edit the `.env.audit` file and add your API key:

```bash
GEMINI_API_KEY=paste_your_actual_api_key_here
```

### Step 3: Run Your First Analysis

```bash
# Analyze files changed in the last 2 hours
python3 code_rabbit.py analyze
```

That's it! 🎉

---

## What Happens Next?

CodeRabbit will:
1. ✅ Detect files changed in the last 2 hours (via Git)
2. ✅ Analyze them for bugs and vulnerabilities
3. ✅ Generate detailed reports
4. ✅ Show you a summary in the terminal

Reports are saved to `audit-reports/latest/`:
- `summary.md` - Executive summary
- `critical.md` - Critical issues only
- `full-report.md` - Complete findings
- `full-report.json` - Machine-readable format

---

## Common Commands

```bash
# One-time analysis of recent changes
python3 code_rabbit.py analyze

# Analyze files from last 6 hours
python3 code_rabbit.py analyze --hours 6

# Deep scan of ALL files
python3 code_rabbit.py all

# Run automatically every 2 hours
python3 code_rabbit.py schedule

# Run automatically every 4 hours
python3 code_rabbit.py schedule --interval 4
```

---

## Run in Background

### Option 1: Using nohup (Simple)

```bash
# Start in background
nohup python3 code_rabbit.py schedule > audit.log 2>&1 &

# Check the log
tail -f audit.log

# Stop it
pkill -f code_rabbit.py
```

### Option 2: Using cron (Scheduled)

```bash
# Edit crontab
crontab -e

# Add this line (runs every 2 hours)
0 */2 * * * cd /home/martin/ZerionStudio/DemoApps/mvp-02-booking-platform && python3 code_rabbit.py analyze >> audit.log 2>&1
```

---

## View Reports

```bash
# View summary
cat audit-reports/latest/summary.md

# View critical issues only
cat audit-reports/latest/critical.md

# View full report
cat audit-reports/latest/full-report.md

# View JSON (for scripts)
cat audit-reports/latest/full-report.json
```

---

## Customize Settings

Edit `.env.audit` to change:

```bash
# How many files to analyze per run
MAX_FILES_PER_RUN=50

# Which files to include
INCLUDE_PATTERNS=*.ts,*.tsx,*.js,*.jsx,*.py

# Which files to exclude
EXCLUDE_PATTERNS=node_modules/**,dist/**,build/**

# Minimum confidence score (0-100)
MIN_CONFIDENCE_SCORE=70
```

---

## Troubleshooting

### "GEMINI_API_KEY not found"

Make sure you edited `.env.audit` and added your API key:

```bash
GEMINI_API_KEY=your_actual_key_here
```

### "No files to analyze"

Try analyzing all files instead:

```bash
python3 code_rabbit.py all
```

Or check your file patterns in `.env.audit`.

### "Command 'python' not found"

Use `python3` instead:

```bash
python3 code_rabbit.py analyze
```

---

## Need Help?

- 📖 Full documentation: `CODERABBIT_README.md`
- ⚙️ Configuration: `.env.audit` and `config/audit_rules.yaml`
- 🐛 Issues: Check `audit.log` if running in background

---

**Happy bug hunting! 🐰**
