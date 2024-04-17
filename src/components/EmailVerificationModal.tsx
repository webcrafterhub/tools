import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ButtonDark from "./ButtonDark";
import mailIcon from "@/assets/img/emailIcon.webp";
import Image from "next/image";

interface EmailVerificationModalProps {
  open: boolean;
  dialogHandler: () => void;
  email?: string;
}

const EmailVerificationModal: FC<EmailVerificationModalProps> = ({ open, dialogHandler, email }) => {
  return (
    <Dialog open={open} onOpenChange={dialogHandler}>
      <DialogContent>
        <DialogHeader>
          <Image src={mailIcon} alt="Mail icon" />
          <DialogTitle className="text-2xl text-center">Verify your email address</DialogTitle>
          <DialogDescription className="text-center">
            A verification email has been sent to your email{" "}
            <span className="text__gradient_primary font-semibold ">{email}.</span> Please check your email and click
            the link provided in the email to complete your account registration.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4"></div>

        <p className="mt-2 text-xs text-center opacity-50">
          If you do not receive the email within the next 5 minutes, use the button below to resend verification email.
        </p>
        <DialogFooter>
          <ButtonDark title="Resend Verification Email" loading={false} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationModal;
