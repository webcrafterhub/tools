import React, { FC } from "react";
import AceEditor from "react-ace";
import { config } from "ace-builds";
import "ace-builds/src-noconflict/mode-text";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-chrome";
const jsonWorkerUrl = new URL("ace-builds/src-noconflict/worker-json", import.meta.url);
config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl.toString());
import { useTheme } from "next-themes";

interface AceJWTEditorProps {
  value?: string;
  changeHandler: (value: string, event?: any) => void;
  validationHandler: Function;
  readOnly?: boolean;
  placeholder?: string;
  focus?: boolean;
}

const AceJWTEditor: FC<AceJWTEditorProps> = ({
  value,
  changeHandler,
  validationHandler,
  readOnly = false,
  placeholder = "",
  focus = false,
}) => {
  const { theme } = useTheme();

  const onValidate = (annotations: any[]) => {
    const errorList = annotations.filter((annotation) => annotation.type === "error");
    if (!errorList.length) return;
    validationHandler(errorList);
  };

  return (
    <>
      <AceEditor
        focus={focus}
        height="100%"
        className="bg-transparent !w-full min-h-[40vh] "
        mode="text"
        theme={theme === "light" ? "chrome" : "solarized_dark"}
        onChange={changeHandler}
        name="base64encoder"
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        value={value}
        wrapEnabled={true}
        onValidate={onValidate}
        placeholder={placeholder}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          maxLines: 24,
        }}
        readOnly={readOnly}
        highlightActiveLine={false}
      />
    </>
  );
};

export default AceJWTEditor;
