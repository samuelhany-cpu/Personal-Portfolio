# 🚀 Firebase Cloud Functions Deployment Guide

## Quick Deployment Steps

### 1. Set Up Email Credentials

**Option A: Use the setup script (Windows)**
```bash
setup-email.bat
```

**Option B: Manual setup**
```bash
firebase functions:config:set gmail.user="your-email@gmail.com"
firebase functions:config:set gmail.password="your-gmail-app-password"
```

### 2. Deploy Functions

```bash
# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:sendContactEmail
```

### 3. Verify Deployment

```bash
# Check function logs
firebase functions:log

# Test email configuration
firebase functions:shell
# Then run: testEmail()
```

## 📧 Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to Google Account settings**
3. **Security → 2-Step Verification → App passwords**
4. **Select "Mail" and generate password**
5. **Copy the 16-character password** (ignore spaces)

## 🔧 Function Details

### `sendContactEmail` Function:
- **Trigger**: New document in `contactSubmissions` collection
- **Action**: Sends HTML email notification
- **Updates**: Marks document with `emailSent: true/false`

### Email Template Includes:
- ✅ Professional HTML formatting with portfolio colors
- ✅ Contact details (name, email, subject, message)
- ✅ Timestamp and submission tracking
- ✅ Plain text fallback for compatibility
- ✅ Branded footer with portfolio theme

## 📊 Firestore Integration

The function automatically updates the contact document with:
```javascript
{
  emailSent: true,        // Success status
  emailSentAt: timestamp, // When email was sent
  emailError: "...",      // Error message if failed
  emailAttemptedAt: timestamp // When attempt was made
}
```

## 🧪 Testing Your Setup

### 1. Test Email Function
```bash
firebase functions:shell
testEmail()
```

### 2. Test Contact Form
1. Submit a contact form on your portfolio
2. Check your email for notification
3. Verify Firestore document has `emailSent: true`

### 3. Check Function Logs
```bash
firebase functions:log --only sendContactEmail
```

## 🐛 Troubleshooting

### Common Issues:

**❌ Authentication Error**
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail
- Check config: `firebase functions:config:get`

**❌ Function Deployment Fails**
- Run `firebase login` to authenticate
- Verify billing is enabled (Blaze plan required)
- Check project ID in `.firebaserc`

**❌ Emails Not Sending**
- Check function logs: `firebase functions:log`
- Test with `testEmail()` function first
- Verify internet connectivity

**❌ Permission Errors**
- Ensure Firestore rules allow writes
- Check Cloud Functions have admin permissions

## 💰 Billing Information

Firebase Cloud Functions require the **Blaze (Pay-as-you-go)** plan:
- **Free tier**: 125K invocations/month, 40K GB-seconds/month
- **After free tier**: $0.40 per million invocations
- **Typical usage**: Contact forms usually stay within free limits

## 🔒 Security Best Practices

1. **Never commit credentials** to version control
2. **Use Firebase config** for environment variables
3. **Monitor function usage** to prevent abuse
4. **Set up proper Firestore security rules**
5. **Regularly review function logs**

## 📈 Monitoring & Analytics

### Firebase Console:
1. Go to Firebase Console → Functions
2. View execution metrics and logs
3. Monitor performance and errors

### Email Tracking:
- Check Firestore documents for `emailSent` status
- Monitor function logs for detailed execution info
- Set up alerts for function failures

---

## ✅ Deployment Checklist

- [ ] Gmail app password generated
- [ ] Firebase Functions config set
- [ ] Functions deployed successfully
- [ ] Test email sent and received
- [ ] Contact form tested end-to-end
- [ ] Function logs verified
- [ ] Billing plan confirmed (Blaze)

**Ready to deploy? Run the commands above to get your email notifications working!** 🚀
