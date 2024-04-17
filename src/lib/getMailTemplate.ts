import { EMAIL_VALIDATION, RESET_PASSWORD } from "@/utils/contants";

export type mailTemplateType = {
  subject: string;
  html: string;
  text: string;
  content: string;
  from: string;
};

const FROM_MAIL = "support@codemastero.com";

function getMailTemplate(type: string, token?: string): mailTemplateType {
  let redirectLink = process.env.ENV_URL;
  switch (type) {
    case EMAIL_VALIDATION:
      redirectLink = `${process.env.ENV_URL}/api/auth/verify?token=${token}`;
      return {
        from: FROM_MAIL,
        subject: "please verify your email",
        html: `<a href=${redirectLink} >Verify Email</a>`,
        text: "text: no idea what is this for",
        content: "content: no idea what does it mean",
      };
    case RESET_PASSWORD:
      redirectLink = `${process.env.ENV_URL}/resetPassword?token=${token}`;
      return {
        from: FROM_MAIL,
        subject: "please reset your password",
        html: `<a href=${redirectLink} >Reset Password</a>`,
        text: "no idea what is this for",
        content: "content: no idea what does it mean",
      };
    default:
      return {
        from: FROM_MAIL,
        subject: "Default Mail",
        html: `<a href=${redirectLink} >Reset Password</a>`,
        text: "no idea what is this for",
        content: "content: no idea what does it mean",
      };
  }
}

export default getMailTemplate;
