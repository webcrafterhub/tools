"use client";
import React, { useEffect, useState } from "react";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
import "react18-json-view/src/dark.css";
import LoadingGear from "@/assets/svg/loadingGear";
import { FiCheckCircle } from "react-icons/fi";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useDeviceType from "@/components/hooks/useDeviceType";
import CopyToolTip from "@/components/tools/json-formatter/CopyToolTip";
import Image from "next/image";
import AceJWTEditor from "./AceJWTEditor";
import { Base64 } from "js-base64";
import iconv from "iconv-lite";
import DecodingOptions from "./DecodingOptions";
import ClearToolTip from "@/components/ClearToolTip";
import { Textarea } from "@/components/ui/textarea";
import { decode, verify } from "jwt-js-decode";
import DecodedTextBox from "./DecodedTextBox";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { GiCancel } from "react-icons/gi";
import LockToolTip from "@/components/LockToolTip";
import jwt from "jwt-simple";
import FormError from "@/components/FormError";
interface Annotation {
  row?: number;
  column?: number;
  text: string;
  type?: string;
}
type decodedJWTType = {
  header?: Object;
  payload?: Object;
  signature?: String;
};
const defaultEncodingOptions = {
  characterSet: "utf-8",
};
const INITIAL_DATA = {
  secret: "Paste-your-secret-here",
  jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.aKdU9ahRQAtimM6QfM46QSlm-r1s3eNY4RO-eKFAYAY",
};
function JWTDecoder() {
  const [content, setContent] = useState<string>(INITIAL_DATA.jwt);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationError] = useState<string | undefined>("");
  const [decodedJWT, setDecodedJWT] = useState<decodedJWTType>({});
  const [signatureVerified, setSignatureVerified] = useState<boolean>(false);
  const [decodedDisabled, setDecodedDisabled] = useState<boolean>(true);
  const [secret, setSecret] = useState<string>(INITIAL_DATA.secret);
  const deviceType = useDeviceType();

  useEffect(() => {
    decodeJWT(content);
    handleSecretChange(secret);
  }, [content]);

  const handleHeaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newHeader = JSON.parse(e.target.value);
      updateJwtToken({
        ...decodedJWT,
        header: newHeader,
      });
      setValidationError("");
    } catch (err) {
      setValidationError("Invalid JSON in header");
    }
  };

  const handlePayloadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newPayload = JSON.parse(e.target.value);
      updateJwtToken({
        ...decodedJWT,
        payload: newPayload,
      });
      setValidationError("");
    } catch (err) {
      setValidationError("Invalid JSON in payload");
    }
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSecretChange(e.target.value);
  };

  const handleSecretChange = async (newSecreat: string) => {
    try {
      const verificationStatus = await verify(content, newSecreat);
      setSignatureVerified(verificationStatus);
    } catch (error) {
      setSignatureVerified(false);
    }
    setSecret(newSecreat);
  };

  const updateJwtToken = (decodedJWT: decodedJWTType) => {
    try {
      const token = jwt.encode(decodedJWT.payload, secret, "HS256", decodedJWT.header as any);
      setContent(token);
      setValidationError("");
    } catch (e) {
      setValidationError("Error while generating JWT");
    }
  };

  function validationHandler(errors: Annotation[]) {
    console.error(errors);
  }

  function AceChangeHandler(jwt: string) {
    try {
      setContent(jwt);
    } catch (error) {}
  }
  async function decodeJWT(jwt: string) {
    try {
      const jwtDecoded = decode(jwt);
      setValidationError("");
      setDecodedJWT(jwtDecoded);
    } catch (error) {
      //"JWT is editing"
      setValidationError("Invalid JWT token");
    }
  }
  return (
    <div className="container min-h-screen flex flex-col gap-4 justify-center">
      <FileUpload setContent={AceChangeHandler} loadingHandler={setLoading} />
      <div className="relative">
        <ResizablePanelGroup
          direction={deviceType === "mobile" ? "vertical" : "horizontal"}
          className="codebox md:min-h-[50vh] min-h-[100vh] md:max-h-[70vh] "
        >
          <ResizablePanel className="relative">
            <Card className="h-full shadow-inner shadow-blue-600 overflow-y-scroll scrollbar-none scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-400 scrollbar-track-slate-300">
              {loading && <LoadingGear />}
              {!loading && (
                <>
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <CardTitle>JWT EDITOR</CardTitle>
                      <CardDescription>Copy and paste your JWT data here</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <ClearToolTip clearHandler={() => AceChangeHandler("")} disabled={loading} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AceJWTEditor
                      value={content}
                      changeHandler={AceChangeHandler}
                      validationHandler={validationHandler}
                      placeholder="Paste or type your content here"
                      focus={true}
                    />
                  </CardContent>
                </>
              )}
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <Card className="h-full flex flex-col relative  shadow-inner shadow-green-600 ">
              {loading && <LoadingGear />}
              {!loading && (
                <>
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <CardTitle>DECODED DATA</CardTitle>
                      <CardDescription>View your JWT decoded data here</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <CopyToolTip data={content} disabled={loading || !!validationErrors} />
                      <LockToolTip locked={decodedDisabled} lockHandler={() => setDecodedDisabled((prev) => !prev)} />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green-400 scrollbar-track-slate-300">
                    <DecodedTextBox
                      type="Header"
                      value={JSON.stringify(decodedJWT.header, null, 2)}
                      color="text-pink-500"
                      disabled={decodedDisabled}
                      changeHandler={handleHeaderChange}
                    />
                    <DecodedTextBox
                      type="Payload"
                      value={JSON.stringify(decodedJWT.payload, null, 2)}
                      color="text-blue-500"
                      disabled={decodedDisabled}
                      changeHandler={handlePayloadChange}
                    />
                    <DecodedTextBox
                      type="Signature"
                      value={String(decodedJWT.signature || "")}
                      color="text-red-500"
                      disabled={decodedDisabled}
                      changeHandler={handleSignatureChange}
                    />
                  </CardContent>
                </>
              )}
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
        {validationErrors && (
          <FormError message={validationErrors} className="absolute bottom-0 w-full translate-y-full -m-1 z-50" />
        )}
      </div>
      <div className="mt-9 flex justify-between items-center backdrop-blur-md bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold capitalize" htmlFor="token">
            Verify JWT Signature
          </Label>
          <Input
            className=" bg-white dark:bg-gray-900 p-6 w-[25rem]"
            type="text"
            id="token"
            placeholder="Paste your key here"
            onChange={(e) => handleSecretChange(e.target.value)}
            value={secret}
          />
        </div>
        {signatureVerified ? (
          <div className="flex justify-center items-center gap-2 text-green-400 text-2xl font-bold">
            <FiCheckCircle />
            <span>Signature Verified</span>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2 text-red-400 text-2xl font-bold">
            <GiCancel />
            <span>Invalid Signature</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default JWTDecoder;
