@echo off
echo ============================================
echo    PORTFOLIO PROJECT STARTUP SCRIPT
echo ============================================
echo.

echo 1. Checking for existing Node.js processes...
tasklist | findstr node.exe
if %errorlevel% equ 0 (
  echo   - Found existing Node processes, terminating...
  taskkill /F /IM node.exe >nul 2>&1
  timeout /t 2 /nobreak >nul
) else (
  echo   - No existing Node processes found
)

echo.
echo 2. Starting Backend Server (Port 3000)...
cd /d "C:\portofolio_new\portofolio_backend"
start "Portfolio Backend" cmd /k "echo Portfolio Backend Server && node server.js"
echo   - Backend server starting...

echo.
echo 3. Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo 4. Starting Frontend Development Server...
cd /d "C:\portofolio_new\portofolio_frontend"  
start "Portfolio Frontend" cmd /k "echo Portfolio Frontend Dev Server && npm run dev"
echo   - Frontend server starting...

echo.
echo 5. Waiting for services to fully load...
timeout /t 8 /nobreak >nul

echo.
echo ============================================
echo             SERVERS STARTED
echo ============================================
echo.
echo ✅ Backend API:  http://localhost:3000
echo ✅ Frontend:     http://localhost:5173
echo.
echo 📝 Default Login Credentials:
echo    Email:    admin@portfolio.com
echo    Password: admin123
echo.
echo 🔧 Database Mode: Mock Data (No PostgreSQL required)
echo.
echo 📊 Available API Endpoints:
echo    - POST /api/auth/login
echo    - GET  /api/dashboard/stats
echo    - GET  /api/projects
echo    - GET  /api/skills
echo    - GET  /api/experiences
echo    - GET  /api/biodata
echo    - GET  /api/contact
echo.
echo Press any key to open frontend in browser...
pause >nul
start http://localhost:5173
echo.
echo ============================================
echo  Both servers are running in separate windows
echo  Close those windows to stop the servers
echo ============================================
pause
