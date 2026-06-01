@echo off
cd /d "%~dp0"
echo 正在查看最近的提交记录...
git log --oneline -10
echo.
echo 如果要恢复到上一个版本，执行：
echo git checkout HEAD~1 -- pages/index.js
echo.
pause
