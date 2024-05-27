import React, { FC, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/ext-language_tools";
import { useTheme } from "next-themes";

interface AceJSONEditorProps {
  value: string;
  changeHandler: (value: string, event?: any) => void;
}

const AceJSONEditor: FC<AceJSONEditorProps> = ({ value, changeHandler }) => {
  const { theme } = useTheme();
  const [annotations, setAnnotations] = useState<any>([]);

  return (
    <>
      <AceEditor
        className="bg-transparent !w-full min-h-[40vh] "
        mode="json5"
        theme={theme === "dark" ? "solarized_dark" : "chrome"}
        onChange={changeHandler}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          maxLines: Infinity,
        }}
      />
    </>
  );
};

export default AceJSONEditor;
