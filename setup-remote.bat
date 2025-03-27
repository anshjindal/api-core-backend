@echo off

REM Reset remote origin
git remote remove origin
git remote add origin https://github.com/anshjindal/api-core-backend
git remote set-url --add origin https://gitea.wouessi.com/Wouessi/api-core-backend.git

echo Remotes configured. Git will push to GitHub first, then Gitea.
pause
