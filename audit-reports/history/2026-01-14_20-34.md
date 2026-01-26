# Code Audit Report

**Generated:** 2026-01-14T20:34:31.646624  
**Branch:** main  
**Commit:** ea3dbb94  
**Files Analyzed:** 5

---

## 📊 Summary

- **Total Issues:** 5
- **Critical:** 1 🔴
- **High:** 0 🟠
- **Medium:** 3 🟡
- **Low:** 1 ⚪

### By Category

- **Security:** 1
- **Quality:** 2
- **Type Safety:** 2

---

## 🔴 CRITICAL Issues (1)

### 1. Potential SQL injection vulnerability

**File:** `unknown`  
**Category:** Security  
**Confidence:** 0%  

**Description:**  
Pattern matched: sql_injection

**Code:**
```typescript
!function(){if("undefined"!=typeof Prism&&"undefined"!=typeof document){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var t={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},e="data-src-status",i='pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])';Prism.hooks.add("before-highlightall",(function(t){t.selector+=", "+i})),Prism.hooks.add("before-sanity-check",(function(a){var n=a.element;if(n.matches(i)){a.code="",n.setAttribute(e,"loading");var s=n.appendChild(document.createElement("CODE"));s.textContent="Loading…";var r=n.getAttribute("data-src"),l=a.language;if("none"===l){var o=(/\.(\w+)$/.exec(r)||[,"none"])[1];l=t[o]||o}Prism.util.setLanguage(s,l),Prism.util.setLanguage(n,l);var h=Prism.plugins.autoloader;h&&h.loadLanguages(l),function(t,i,a){var r=new XMLHttpRequest;r.open("GET",t,!0),r.onreadystatechange=function(){4==r.readyState&&(r.status<400&&r.responseText?function(t){n.setAttribute(e,"loaded");var i=function(t){var e=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(t||"");if(e){var i=Number(e[1]),a=e[2],n=e[3];return a?n?[i,Number(n)]:[i,void 0]:[i,i]}}(n.getAttribute("data-range"));if(i){var a=t.split(/\r\n?|\n/g),r=i[0],l=null==i[1]?a.length:i[1];r<0&&(r+=a.length),r=Math.max(0,Math.min(r-1,a.length)),l<0&&(l+=a.length),l=Math.max(0,Math.min(l,a.length)),t=a.slice(r,l).join("\n"),n.hasAttribute("data-start")||n.setAttribute("data-start",String(r+1))}s.textContent=t,Prism.highlightElement(s)}(r.responseText):r.status>=400?a("✖ Error "+r.status+" while fetching file: "+r.statusText):a("✖ Error: File does not exist or is empty"))},r.send(null)}(r,0,(function(t){n.setAttribute(e,"failed"),s.textContent=t}))}})),Prism.plugins.fileHighlight={highlight:function(t){for(var e,a=(t||document).querySelectorAll(i),n=0;e=a[n++];)Prism.highlightElement(e)}};var a=!1;Prism.fileHighlight=function(){a||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),a=!0),Prism.plugins.fileHighlight.highlight.apply(this,arguments)}}}();
```

---

## 🟡 MEDIUM Issues (3)

### 1. High complexity

**File:** `unknown`  
**Category:** Quality  
**Confidence:** 0%  

**Description:**  
Line has 33 decision points

**Code:**
```typescript
!function(){if("undefined"!=typeof Prism&&"undefined"!=typeof document){Element.prototype.matches||(
```

---

### 2. Excessive use of 'any' type

**File:** `unknown`  
**Category:** Type Safety  
**Confidence:** 0%  

**Description:**  
Pattern matched: any_abuse

**Code:**
```typescript
const parsedType = (data: any): string => {
```

---

### 3. Use of "any" type

**File:** `unknown`  
**Category:** Type Safety  
**Confidence:** 0%  

**Description:**  
Avoid using "any" type, use specific types instead

**Code:**
```typescript
const parsedType = (data: any): string => {
```

---

## ⚪ LOW Issues (1)

### 1. Function too long

**File:** `unknown`  
**Category:** Quality  
**Confidence:** 0%  

**Description:**  
Function "const" is 110 lines (threshold: 50)

**Code:**
```typescript
function const (... 110 lines ...)
```

---

