@echo off
echo ========================================
echo    PORTFOLIO PROJECT CLEANUP SCRIPT
echo ========================================
echo.

echo 1. Cleaning up temporary files...
del /q /f C:\portofolio_new\portofolio_backend\test-*.js 2>nul
del /q /f C:\portofolio_new\portofolio_backend\test-*.json 2>nul
del /q /f C:\portofolio_new\portofolio_backend\debug*.js 2>nul
del /q /f C:\portofolio_new\portofolio_backend\check-*.js 2>nul
echo   - Temporary test files cleaned

echo.
echo 2. Checking for unnecessary folders...
if exist "C:\portofolio_new\old_files" (
  echo   - Found old_files folder, removing...
  rmdir /s /q "C:\portofolio_new\old_files"
)

if exist "C:\portofolio_new\backup" (
  echo   - Found backup folder, removing...
  rmdir /s /q "C:\portofolio_new\backup"
)

if exist "C:\portofolio_new\temp" (
  echo   - Found temp folder, removing...
  rmdir /s /q "C:\portofolio_new\temp"
)

echo   - Cleanup completed

echo.
echo 3. Project structure after cleanup:
echo   C:\portofolio_new\
echo   ├── portofolio_backend\     (Node.js API Server)
echo   ├── portofolio_frontend\    (Vue.js Frontend)
echo   ├── start-servers.bat       (Startup script)
echo   └── cleanup.bat             (This cleanup script)

echo.
echo ========================================
echo         CLEANUP COMPLETED
echo ========================================
pause
