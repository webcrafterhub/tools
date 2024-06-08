import React, { FC } from "react";
import AceEditor from "react-ace";
import { config } from "ace-builds";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-chrome";
const jsonWorkerUrl = new URL("ace-builds/src-noconflict/worker-json", import.meta.url);
config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl.toString());
import { useTheme } from "next-themes";

interface AceJSONEditorProps {
  value: string;
  changeHandler: (value: string, event?: any) => void;
  validationHandler: Function;
}

const AceJSONEditor: FC<AceJSONEditorProps> = ({ value, changeHandler, validationHandler }) => {
  const { theme } = useTheme();

  const onValidate = (annotations: any[]) => {
    const errorList = annotations.filter((annotation) => annotation.type === "error");
    validationHandler(errorList);
  };

  return (
    <>
      <AceEditor
        height="100%"
        className="bg-transparent !w-full min-h-[40vh] "
        mode="json"
        theme={theme === "dark" ? "solarized_dark" : "chrome"}
        onChange={changeHandler}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={value}
        wrapEnabled={true}
        onValidate={onValidate}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          maxLines: 24,
        }}
      />
    </>
  );
};

export default AceJSONEditor;
