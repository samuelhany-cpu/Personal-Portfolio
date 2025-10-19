# 📧 Cloud Functions Email Setup Guide

## Overview
This guide will help you set up Firebase Cloud Functions to automatically send email notifications when someone submits your contact form.

## 🚀 What's Been Created

### Files Structure:
```
functions/
├── index.js              # Main Cloud Function code
├── package.json          # Dependencies & scripts
├── .eslintrc.js          # ESLint configuration
firebase.json             # Firebase project configuration
.firebaserc              # Firebase project settings
```

### Functions Created:
1. **`sendContactEmail`** - Automatically triggered when new contact submission is added
2. **`testEmail`** - Optional function to test email configuration

## 🔧 Email Configuration Setup

### Step 1: Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

### Step 2: Set Environment Variables

You need to configure these environment variables in Firebase Functions:

```bash
# Set your Gmail credentials (run these commands in your terminal)
firebase functions:config:set gmail.user="your-email@gmail.com"
firebase functions:config:set gmail.password="your-16-character-app-password"
```

**Alternative: Using .env file for local development:**
Create `functions/.env`:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

## 📦 Deployment Commands

### Install Dependencies (Already Done)
```bash
cd functions
npm install
```

### Deploy to Firebase
```bash
# From project root
firebase deploy --only functions
```

### Deploy Specific Function
```bash
firebase deploy --only functions:sendContactEmail
```

## 🧪 Testing

### Test Email Function
```bash
# Call the test function
firebase functions:shell
# Then run: testEmail()
```

### Test Contact Form
1. Submit a contact form on your portfolio
2. Check your email for the notification
3. Verify the submission was marked as "emailSent: true" in Firestore

## 📧 Email Template Features

The email notification includes:
- ✅ Professional HTML formatting
- ✅ Contact details (name, email, subject, message)
- ✅ Timestamp and source information
- ✅ Portfolio branding with your color scheme
- ✅ Plain text fallback for compatibility

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `GMAIL_USER` | Your Gmail address | `samuel.ehab@gmail.com` |
| `GMAIL_APP_PASSWORD` | Gmail app password | `abcd efgh ijkl mnop` |

## 📊 Function Triggers

### `sendContactEmail` Trigger:
- **Event**: Document created in `contactSubmissions` collection
- **Action**: Sends formatted email notification
- **Updates**: Marks document with `emailSent: true/false`

### `testEmail` Trigger:
- **Event**: Manual function call
- **Action**: Sends test email to verify setup
- **Usage**: For testing email configuration

## 🐛 Troubleshooting

### Common Issues:

**1. Authentication Error:**
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
- Check environment variables are set correctly

**2. Function Deployment Fails:**
- Run `firebase login` to authenticate
- Verify project ID in `.firebaserc`
- Check billing is enabled (Functions require Blaze plan)

**3. Emails Not Sending:**
- Check function logs: `firebase functions:log`
- Verify Firestore triggers are working
- Test with `testEmail` function first

**4. Permission Errors:**
- Ensure Firestore rules allow writes to `contactSubmissions`
- Verify Cloud Functions have admin permissions

## 📈 Monitoring & Logs

### View Function Logs:
```bash
firebase functions:log --only sendContactEmail
```

### Monitor in Firebase Console:
1. Go to Firebase Console
2. Functions section
3. View execution logs and metrics

## 🔒 Security Best Practices

1. **Never commit email credentials** to version control
2. **Use environment variables** for sensitive data
3. **Enable proper Firestore security rules**
4. **Monitor function usage** to prevent abuse
5. **Set up email rate limiting** if needed

## 📋 Next Steps

1. **Set up Gmail app password**
2. **Configure environment variables**
3. **Deploy functions to Firebase**
4. **Test with a contact form submission**
5. **Monitor and verify email delivery**

---

**Ready to deploy your email notifications? Follow the steps above to get started!** 🚀
