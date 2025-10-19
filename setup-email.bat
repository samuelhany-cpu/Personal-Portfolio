@echo off
REM Email Configuration Setup Script for Firebase Functions (Windows)
REM This script helps you set up the email credentials for Cloud Functions

echo 🚀 Firebase Cloud Functions Email Setup
echo ========================================
echo.

REM Check if Firebase CLI is available
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI is not installed or not in PATH
    echo Please install it with: npm install -g firebase-tools
    pause
    exit /b 1
)

echo 📧 Setting up email configuration for Cloud Functions...
echo.

REM Get email credentials from user
set /p gmail_user="Enter your Gmail address: "
echo.

echo 📝 To get your Gmail App Password:
echo 1. Go to Google Account settings
echo 2. Security → 2-Step Verification → App passwords
echo 3. Generate a new app password for 'Mail'
echo 4. Copy the 16-character password (spaces are ignored)
echo.

set /p gmail_password="Enter your Gmail App Password: "
echo.

REM Set Firebase Functions config
echo 🔧 Setting Firebase Functions configuration...

firebase functions:config:set gmail.user="%gmail_user%"
firebase functions:config:set gmail.password="%gmail_password%"

echo.
echo ✅ Email configuration set successfully!
echo.

REM Display current config (without sensitive data)
echo 📊 Current configuration:
firebase functions:config:get gmail.user

echo.
echo 🚀 Next steps:
echo 1. Deploy your functions: firebase deploy --only functions
echo 2. Test the email setup by submitting a contact form
echo 3. Check your email for notifications
echo.
echo 📝 To view function logs: firebase functions:log
echo 🧪 To test email: Use the testEmail function in Firebase Console
echo.

pause
