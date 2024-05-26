"use client";
import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
// If dark mode is needed, import `dark.css`.
import "react18-json-view/src/dark.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AceJSONEditor from "./tools/json-formatter/AceJSONEditor";

const JSON_DUMMY_DATA = {
  menu: {
    id: "file",
    value: "File",
    popup: {
      menuitem: [
        { value: "New", onclick: "CreateNewDoc()" },
        { value: "Open", onclick: "OpenDoc()" },
        { value: "Close", onclick: "CloseDoc()" },
      ],
    },
  },
  menu2: {
    id: "file",
    value: "File",
    popup: {
      menuitem: [
        { value: "New", onclick: "CreateNewDoc()" },
        { value: "Open", onclick: "OpenDoc()" },
        { value: "Close", onclick: "CloseDoc()" },
      ],
    },
  },
  menu3: {
    id: "file",
    value: "File",
    popup: {
      menuitem: [
        { value: "New", onclick: "CreateNewDoc()" },
        { value: "Open", onclick: "OpenDoc()" },
        { value: "Close", onclick: "CloseDoc()" },
      ],
    },
  },
  menu4: {
    id: "file",
    value: "File",
    popup: {
      menuitem: [
        { value: "New", onclick: "CreateNewDoc()" },
        { value: "Open", onclick: "OpenDoc()" },
        { value: "Close", onclick: "CloseDoc()" },
      ],
    },
  },
  menu5: {
    id: "file",
    value: "File",
    popup: {
      menuitem: [
        { value: "New", onclick: "CreateNewDoc()" },
        { value: "Open", onclick: "OpenDoc()" },
        { value: "Close", onclick: "CloseDoc()" },
      ],
    },
  },
};

function JSONFormatter() {
  const [jsonObj, setJsonObj] = useState<object>(JSON_DUMMY_DATA);
  const [jsonStr, setJsonStr] = useState("");

  // useEffect(() => {
  //   try {
  //     setJsonStr(JSON.stringify(jsonObj, null, 2));
  //   } catch (error) {}
  // }, [jsonObj]);

  function AceChangeHandler(text: string, event: any) {
    try {
      setJsonStr(JSON.stringify(JSON.parse(text), null, 2));
      setJsonObj(JSON.parse(text));
    } catch (error) {
      // pass, user is editing
    }
  }

  // text && JSON.stringify(JSON.parse(text), null, 2)
  return (
    <div className="container">
      lore
      <div className="editors flex flex-col lg:flex-row gap-2 h-[90vh]">
        <Card className="flex-1 shadow-md shadow-blue-600 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-blue-400 scrollbar-track-slate-300">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <AceJSONEditor value={jsonStr} changeHandler={AceChangeHandler} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
        <Card className="flex-1 shadow-md shadow-green-600 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-green-400 scrollbar-track-slate-300">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <JsonView src={jsonObj} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default JSONFormatter;
