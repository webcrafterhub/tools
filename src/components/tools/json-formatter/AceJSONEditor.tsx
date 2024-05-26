import React, { FC } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/mode-json5";

interface AceJSONEditorProps {
  value: string;
  changeHandler: (value: string, event?: any) => void;
}

const menu = {
  id: "file",
  value: "File",
  popup: {
    menuitem: [
      { value: "New", onclick: "CreateNewDoc()" },
      { value: "Open", onclick: "OpenDoc()" },
      { value: "Close", onclick: "CloseDoc()" },
    ],
  },
};
const AceJSONEditor: FC<AceJSONEditorProps> = ({ value, changeHandler }) => {
  return (
    <>
      <AceEditor
        className="bg-transparent "
        mode="json5"
        theme="chaos"
        onChange={changeHandler}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          maxLines: Infinity,
        }}
      />
    </>
  );
};

export default AceJSONEditor;
