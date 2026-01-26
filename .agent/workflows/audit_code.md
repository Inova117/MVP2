---
description: Run Automated Code Audit (CodeRabbit)
---

This workflow runs the CodeRabbit audit system to check for bugs, security issues, and code quality problems.

1. Install dependencies (if not needed frequently, can be skipped)
// turbo
2. pip install -r requirements-coderabbit.txt

3. Run Audit (Last 8 Hours of Changes)
// turbo
4. python3 code_rabbit.py analyze --hours 8

5. View Report Summary
// turbo
6. cat audit-reports/latest/summary.md

---

**Note:** To run in offline mode (static analysis only), the script automatically detects if the API key is invalid/missing and switches modes.
