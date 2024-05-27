"use client";
import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
import "react18-json-view/src/dark.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AceJSONEditor from "./AceJSONEditor";
import FileUpload from "./FileUpload";

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

  useEffect(() => {
    try {
      setJsonObj(JSON.parse(jsonStr));
    } catch (error) {}
  }, [jsonStr]);

  function removeTrailingCommas(jsonString: string) {
    // This regex finds trailing commas at the end of objects and arrays
    const cleanedJsonString = jsonString.replace(/,\s*([\]}])/g, "$1");
    return cleanedJsonString;
  }

  function AceChangeHandler(text: string, event: any) {
    try {
      const jsonStr = removeTrailingCommas(text);
      setJsonStr(JSON.stringify(JSON.parse(jsonStr), null, 2));
    } catch (error) {
      console.log("err", error);
      // pass, user is editing
    }
  }
  console.log("mm", jsonObj);
  return (
    <div className="container min-h-screen flex flex-col gap-4 justify-center">
      <FileUpload />
      <div className="editors flex flex-col lg:flex-row gap-2 min-h-[50vh] max-h-[70vh]">
        <Card className="flex-1 shadow-md shadow-blue-600 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-400 scrollbar-track-slate-300">
          <CardHeader>
            <CardTitle>JSON EDITOR</CardTitle>
            <CardDescription>Copy and aste your JSON here</CardDescription>
          </CardHeader>
          <CardContent>
            <AceJSONEditor value={jsonStr} changeHandler={AceChangeHandler} />
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button> */}
          </CardFooter>
        </Card>
        <Card className="flex-1 shadow-md shadow-green-600 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green-400 scrollbar-track-slate-300">
          <CardHeader>
            <CardTitle>JSON VIEWER</CardTitle>
            <CardDescription>Add / edit JSON structurally</CardDescription>
          </CardHeader>
          <CardContent>
            <JsonView src={jsonObj} />
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default JSONFormatter;
