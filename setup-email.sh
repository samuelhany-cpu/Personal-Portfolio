#!/bin/bash

# Email Configuration Setup Script for Firebase Functions
# This script helps you set up the email credentials for Cloud Functions

echo "🚀 Firebase Cloud Functions Email Setup"
echo "========================================"
echo ""

# Check if Firebase CLI is available
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed or not in PATH"
    echo "Please install it with: npm install -g firebase-tools"
    exit 1
fi

echo "📧 Setting up email configuration for Cloud Functions..."
echo ""

# Get email credentials from user
read -p "Enter your Gmail address: " gmail_user
echo ""

echo "📝 To get your Gmail App Password:"
echo "1. Go to Google Account settings"
echo "2. Security → 2-Step Verification → App passwords"
echo "3. Generate a new app password for 'Mail'"
echo "4. Copy the 16-character password (spaces are ignored)"
echo ""

read -s -p "Enter your Gmail App Password: " gmail_password
echo ""
echo ""

# Set Firebase Functions config
echo "🔧 Setting Firebase Functions configuration..."

firebase functions:config:set gmail.user="$gmail_user"
firebase functions:config:set gmail.password="$gmail_password"

echo ""
echo "✅ Email configuration set successfully!"
echo ""

# Display current config (without sensitive data)
echo "📊 Current configuration:"
firebase functions:config:get gmail.user

echo ""
echo "🚀 Next steps:"
echo "1. Deploy your functions: firebase deploy --only functions"
echo "2. Test the email setup by submitting a contact form"
echo "3. Check your email for notifications"
echo ""
echo "📝 To view function logs: firebase functions:log"
echo "🧪 To test email: Use the testEmail function in Firebase Console"
echo ""
