import sgMail from "@sendgrid/mail";

const sendgridAPIkey = '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';

sgMail.setApiKey(sendgridAPIkey);

export const sendEmail = (email, otp) => {
     sgMail.send({
         to: email,
         from: 'adityasinha6060@gmail.com',
         subject: 'OTP for verification',
         text: `OTP for verification is ${otp}`
     })
 };