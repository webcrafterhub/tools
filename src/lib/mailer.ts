"use server";
import sgMail from "@sendgrid/mail";
import novuMailer from "./novuMailer";

async function mailer(to: string, type: string, token?: string) {
  novuMailer(to, type, token);
}

export default mailer;
