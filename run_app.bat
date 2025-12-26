@echo off
echo Starting BorsaPro...

start cmd /k "echo Starting Backend... & cd backend & py -m uvicorn main:app --reload"
start cmd /k "echo Starting Frontend... & cd frontend & npm run dev"

echo Application started.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
