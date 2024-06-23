"use client";
import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
import "react18-json-view/src/dark.css";
import LoadingGear from "@/assets/svg/loadingGear";
import jsonErrorImg from "@/assets/svg/jsonError.svg";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "./FileUpload";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useDeviceType from "@/components/hooks/useDeviceType";
import CopyToolTip from "@/components/tools/json-formatter/CopyToolTip";
import Image from "next/image";
import Base64FileDownload from "./Base64FileDownload";
import AceBase64Editor from "./AceBase64Editor";
import { Base64 } from "js-base64";
import EncodingOptions from "./EncodingOptions";
import iconv from "iconv-lite";
import ClearToolTip from "@/components/ClearToolTip";
interface Annotation {
  row?: number;
  column?: number;
  text: string;
  type?: string;
}

const defaultEncodingOptions = {
  characterSet: "utf-8",
  urlSafeEncoding: true,
  skipPadding: false,
};
function Base64Encoder() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationError] = useState<Annotation[]>([]);
  const [encodedStr, setEncodedStr] = useState<string>("");
  const deviceType = useDeviceType();
  const [encodingOptions, setEncodingOptions] = useState(defaultEncodingOptions);

  useEffect(() => {
    encodeToBase64(content);
  }, [encodingOptions]);

  function validationHandler(errors: Annotation[]) {
    setValidationError(errors);
  }

  function AceChangeHandler(text: string) {
    try {
      setContent(text);
      encodeToBase64(text);
    } catch (error) {}
  }
  function encodeToBase64(text: string) {
    try {
      const encodedBuffer = iconv.encode(text, encodingOptions.characterSet);
      const base64Encoded = Base64.fromUint8Array(
        new Uint8Array(encodedBuffer),
        encodingOptions.skipPadding || encodingOptions.urlSafeEncoding,
      );
      setEncodedStr(base64Encoded);
    } catch (error) {
      setValidationError((prev) => [...prev, { text: "something went wrong" }]);
    }
  }
  return (
    <div className="container min-h-screen flex flex-col gap-4 justify-center">
      <FileUpload setContent={AceChangeHandler} loadingHandler={setLoading} />
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
                    <CardTitle>TEXT EDITOR</CardTitle>
                    <CardDescription>Copy and paste your content here</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <ClearToolTip
                      clearHandler={() => AceChangeHandler("")}
                      disabled={loading || validationErrors.length}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <AceBase64Editor
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
                    <CardTitle>BASE64 ENCODED</CardTitle>
                    <CardDescription>View your Base64 encoded data here</CardDescription>
                  </div>
                  <CopyToolTip data={encodedStr} disabled={loading || validationErrors.length} />
                </CardHeader>
                {validationErrors.length ? (
                  <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col gap-4  justify-center items-center">
                      <Image width={150} height={150} src={jsonErrorImg} alt="json-error" />
                      <span className="font-semibold text-center text-gray-600 dark:text-gray-300">
                        The Data provided is invalid. Please review and correct it.
                      </span>
                    </div>
                  </div>
                ) : (
                  <CardContent className="h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green-400 scrollbar-track-slate-300">
                    <AceBase64Editor
                      value={encodedStr}
                      changeHandler={AceChangeHandler}
                      validationHandler={validationHandler}
                      readOnly={true}
                    />
                    <div className="absolute right-0 bottom-0 p-4 z-50">
                      <Base64FileDownload content={encodedStr} />
                    </div>
                  </CardContent>
                )}
              </>
            )}
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
      <EncodingOptions setEncodingOptions={setEncodingOptions} />
    </div>
  );
}

export default Base64Encoder;
