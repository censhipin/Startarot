@echo off
cd /d "%~dp0"

echo 正在部署星塔网站到 Vercel ...
echo.

git add .
git commit -m "更新"
git push

echo.
echo 部署完成！Vercel 会自动构建更新。
echo 网址：https://startarot-pi.vercel.app/
pause