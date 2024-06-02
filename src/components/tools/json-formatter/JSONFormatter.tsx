"use client";
import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
import "react18-json-view/src/dark.css";
import LoadingGear from "@/assets/svg/loadingGear";
import jsonErrorImg from "@/assets/svg/jsonError.svg";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AceJSONEditor from "./AceJSONEditor";
import FileUpload from "./FileUpload";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import useDeviceType from "@/components/hooks/useDeviceType";
import CopyToolTip from "@/components/tools/json-formatter/CopyToolTip";
import Image from "next/image";
import FormatToolTip from "./FormatToolTip";
import JsonFileDownload from "./JsonFileDownload";

interface Annotation {
  row: number;
  column: number;
  text: string;
  type: string;
}

const JSON_DUMMY_DATA = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
  },
  roles: ["user", "admin"],
};

function JSONFormatter() {
  const [jsonObj, setJsonObj] = useState<object>(JSON_DUMMY_DATA);
  const [jsonStr, setJsonStr] = useState(JSON.stringify(JSON_DUMMY_DATA, null, 2));
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationError] = useState<Annotation[]>([]);
  const deviceType = useDeviceType();

  useEffect(() => {
    try {
      setJsonObj(JSON.parse(jsonStr));
    } catch (error) {
      setJsonObj({});
    }
  }, [jsonStr]);

  function cleanJson(jsonString: string) {
    try {
      // Try parsing the JSON to ensure it's valid
      JSON.parse(jsonString);
      return jsonString;
    } catch (e) {
      // Remove quotes around the entire JSON object
      let cleanedJsonString = jsonString.replace(/^"([\s\S]*)"$/, "$1");

      // If parsing fails, attempt to clean the JSON string

      // Remove any trailing commas inside objects or arrays
      cleanedJsonString = jsonString.replace(/,\s*([\]}])/g, "$1");

      // Fix common JSON typos: missing quotes around keys
      cleanedJsonString = cleanedJsonString.replace(/([{,]\s*)([a-zA-Z_][\w\s]*)(\s*:)/g, '$1"$2"$3');

      return cleanedJsonString;
    }
  }

  function validationHandler(errors: Annotation[]) {
    setValidationError(errors);
  }

  function AceInitialLoadHandler(text: string, event?: any) {
    try {
      const cleanedJson = cleanJson(text);
      const parsedJson = JSON.parse(cleanedJson);
      const formattedJsonStr = JSON.stringify(parsedJson, null, 2);

      setJsonStr(formattedJsonStr);
    } catch (error) {
      // pass, user is editing
      setJsonStr(text);
    }
  }
  function AceChangeHandler(text: string, event: any) {
    try {
      setJsonStr(text);
    } catch (error) {
      // pass, user is editing
      setJsonStr(text);
    }
  }

  return (
    <div className="container min-h-screen flex flex-col gap-4 justify-center">
      <FileUpload setJsonStr={AceInitialLoadHandler} loadingHandler={setLoading} />
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
                    <CardTitle>JSON EDITOR</CardTitle>
                    <CardDescription>Copy and paste your JSON here</CardDescription>
                  </div>
                  <FormatToolTip
                    format={() => AceInitialLoadHandler(jsonStr)}
                    disabled={loading || validationErrors.length}
                  />
                </CardHeader>
                <CardContent>
                  <AceJSONEditor
                    value={jsonStr}
                    changeHandler={AceChangeHandler}
                    validationHandler={validationHandler}
                  />
                  <div className="absolute right-0 bottom-0 p-4 z-50">
                    <JsonFileDownload jsonObj={jsonObj} />
                  </div>
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
                    <CardTitle>JSON VIEWER</CardTitle>
                    <CardDescription>View JSON in structured format</CardDescription>
                  </div>
                  <CopyToolTip data={jsonStr} disabled={loading || validationErrors.length} />
                </CardHeader>
                {validationErrors.length ? (
                  <div className="flex justify-center items-center flex-1">
                    <div className="flex flex-col gap-4  justify-center items-center">
                      <Image width={150} height={150} src={jsonErrorImg} alt="json-error" />
                      <span className="font-semibold text-center text-gray-600 dark:text-gray-300">
                        The JSON provided is invalid. Please review and correct it.
                      </span>
                      <ul>
                        {validationErrors.map((error) => (
                          <li className="text-center text-red-400">{`Error at line ${error.row + 1}, column ${
                            error.column + 1
                          }: ${error.text}`}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <CardContent className="h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green-400 scrollbar-track-slate-300">
                    <JsonView src={jsonObj} />
                  </CardContent>
                )}
              </>
            )}
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default JSONFormatter;
