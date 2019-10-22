const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const moment = require('moment');

admin.initializeApp();

const db = admin.firestore();
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

function sendEmail(email, city) {
  const mailOptions = {
    from: `Ellipsis Demo <noreply@firebase.com>`,
    to: email
  };

  mailOptions.subject = `Your city has been changed!`;
  mailOptions.text = `Hello, your city has been changed to "${city}" at ${moment().format(
    'LLLL'
  )}`;
  return mailTransport.sendMail(mailOptions);
}

exports.onSignup = functions.auth.user().onCreate(user => {
  return db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    email: user.email,
    city: ''
  });
});

// watching user node than the last log in order to get user info quicker
exports.onChangeCity = functions.firestore
  .document('/users/{uid}')
  .onUpdate(change => {
    const after = change.after.data();
    const before = change.before.data();

    if (
      after &&
      after.city &&
      after.email &&
      before &&
      before.city !== after.city
    ) {
      return sendEmail(after.email, after.city);
    }
  });
