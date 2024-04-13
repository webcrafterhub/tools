import { SOMETHING_WENT_WRONG } from "./contants";

export const INVALID_USERNAME_PASSWORD_ERROR = { type: "error", data: "User email or password is incorrect" };
export const SOMETHING_WENT_WRONG_ERROR = { type: "error", data: SOMETHING_WENT_WRONG };
export const EMAIL_ALREADY_EXISTS_ERROR = { type: "error", data: "Email already exists" };
