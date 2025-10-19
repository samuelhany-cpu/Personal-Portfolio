/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {onCall} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
initializeApp();

/**
 * Cloud Function: Send Email on Contact Form Submission
 * 
 * This function triggers when a new document is created in the 'contactSubmissions' collection
 * It sends an email notification with the contact details to your email address
 */
exports.sendContactEmail = onDocumentCreated("contactSubmissions/{documentId}", async (event) => {
  // Get the contact data from the newly created document
  const contactData = event.data.data();
  
  if (!contactData) {
    console.error("No contact data found in document");
    return;
  }

  console.log("New contact submission received:", contactData);

  // Email configuration
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
      user: functions.config().gmail.user, // Your email address (set in Firebase Functions config)
      pass: functions.config().gmail.password, // Your app password (set in Firebase Functions config)
    },
  });

  // Email content
  const mailOptions = {
    from: functions.config().gmail.user,
    to: functions.config().gmail.user, // Send to yourself
    subject: `🚀 New Portfolio Contact: ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #0A192F; text-align: center; margin-bottom: 30px;">
          🚀 New Portfolio Contact Submission
        </h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #64FFDA; margin-bottom: 15px;">Contact Details:</h3>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #0A192F;">Name:</strong>
            <span style="margin-left: 10px;">${contactData.name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #0A192F;">Email:</strong>
            <span style="margin-left: 10px;">
              <a href="mailto:${contactData.email}" style="color: #64FFDA; text-decoration: none;">
                ${contactData.email}
              </a>
            </span>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #0A192F;">Subject:</strong>
            <span style="margin-left: 10px;">${contactData.subject}</span>
          </div>
          
          <div>
            <strong style="color: #0A192F;">Message:</strong>
            <div style="margin-top: 10px; padding: 15px; background: #f8f9fa; border-left: 4px solid #64FFDA; border-radius: 4px;">
              ${contactData.message.replace(/\\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h4 style="color: #0A192F; margin-bottom: 10px;">📊 Submission Details:</h4>
          <p style="margin: 5px 0; font-size: 14px; color: #666;">
            <strong>Submitted:</strong> ${contactData.timestamp ? new Date(contactData.timestamp.toDate()).toLocaleString() : 'Just now'}
          </p>
          <p style="margin: 5px 0; font-size: 14px; color: #666;">
            <strong>Source:</strong> Portfolio Website Contact Form
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #0A192F; color: white; border-radius: 8px;">
          <p style="margin: 0; font-size: 16px;">
            💼 <strong>Portfolio Contact System</strong>
          </p>
          <p style="margin: 5px 0; font-size: 14px; opacity: 0.8;">
            Powered by Firebase Cloud Functions & Nodemailer
          </p>
        </div>
      </div>
    `,
    // Plain text version for email clients that don't support HTML
    text: `
      New Portfolio Contact Submission
      
      Name: ${contactData.name}
      Email: ${contactData.email}
      Subject: ${contactData.subject}
      
      Message:
      ${contactData.message}
      
      Submitted: ${contactData.timestamp ? new Date(contactData.timestamp.toDate()).toLocaleString() : 'Just now'}
      Source: Portfolio Website Contact Form
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("✅ Contact notification email sent successfully");
    
    // Optional: Update the document to mark it as "email sent"
    const db = getFirestore();
    await db.collection('contactSubmissions').doc(event.params.documentId).update({
      emailSent: true,
      emailSentAt: new Date(),
    });
    
    return {success: true, message: "Email sent successfully"};
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    
    // Update document to mark email failed
    const db = getFirestore();
    await db.collection('contactSubmissions').doc(event.params.documentId).update({
      emailSent: false,
      emailError: error.message,
      emailAttemptedAt: new Date(),
    });
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
});

/**
 * Optional: Cloud Function for Testing Email Configuration
 * You can call this function to test if your email setup is working
 */
exports.testEmail = onCall(async (request) => {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: functions.config().gmail.user,
      pass: functions.config().gmail.password,
    },
  });

  const testMailOptions = {
    from: functions.config().gmail.user,
    to: functions.config().gmail.user,
    subject: "🧪 Portfolio Email Test",
    html: `
      <h2>Email Configuration Test</h2>
      <p>If you're reading this, your email setup is working correctly! 🎉</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(testMailOptions);
    return {success: true, message: "Test email sent successfully!"};
  } catch (error) {
    console.error("Test email failed:", error);
    throw new Error(`Test email failed: ${error.message}`);
  }
});
