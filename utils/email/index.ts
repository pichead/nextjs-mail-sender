import * as nodemailer from 'nodemailer';

import { HTML } from '../html';

interface Message {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

const mailUser = process.env.EMAIL_USER
const mailPassword = process.env.EMAIL_PASSWORD

const sendMail = async (transporter: any, message: Message) => {
  const result = await transporter.sendMail(message);

  if (result) {
    return result;
  } else {
    return null;
  }
};


const sendMailAds = async (
  to: string,
  detail: string
) => {
  try {
    const subject = 'Ads'
    const text = 'Ads'

    const senderEmail = mailUser;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: mailUser,
        pass: mailPassword,
      },
    });

    const message = {
      from: `"promo" <${senderEmail}>`,
      to,
      subject,
      text,
      html: HTML.htmlPromo(detail),
    };

    return await sendMail(transporter, message);
  } catch (error) {
    console.log('Error at send mail ads');
    console.log(error);
    return null;
  }
};


export const MAIL = {
  sendAds: sendMailAds,
};
