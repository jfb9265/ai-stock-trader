@echo off
echo Starting AI Stock Trader server...
cd C:\Users\joejo\AI_projects\ai-stock-trader-website
start "AI Stock Trader Server" cmd /k "npm run dev"

echo Waiting for server to initialize...
timeout /t 5 /nobreak > nul

echo Opening application in browser...
start http://localhost:3000
exit