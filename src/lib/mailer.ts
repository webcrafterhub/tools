"use server";
import sgMail from "@sendgrid/mail";
import getMailTemplate, { mailTemplateType } from "./getMailTemplate";

const sendGridMailer = (to: string, mailTemplate: mailTemplateType): Promise<any> => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

  const msg = {
    to: to,
    from: mailTemplate?.from,
    subject: mailTemplate?.subject,
    text: mailTemplate?.text,
    html: mailTemplate?.html,
    content: [],
  };
  return sgMail.send(msg);
};

async function mailer(to: string, type: string, token?: string) {
  const mailTemplate = getMailTemplate(type, token);
  console.log("mailer", mailTemplate);
  sendGridMailer(to, mailTemplate);
}

export default mailer;
