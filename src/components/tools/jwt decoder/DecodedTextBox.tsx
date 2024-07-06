import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { FC, ChangeEventHandler, useState, useEffect } from "react";

interface DecodedTextBoxProps {
  value: string;
  type: string;
  className?: string;
  color?: string;
  disabled?: boolean;
  changeHandler: Function;
}

const DecodedTextBox: FC<DecodedTextBoxProps> = ({ type, value, className, color, disabled, changeHandler }) => {
  const [input, setInput] = useState<string>(value);
  useEffect(() => {
    setInput(value);
  }, [value]);
  const textHandler = (e: any) => {
    setInput(e.target.value);
    changeHandler(e);
  };
  return (
    <div className="flex flex-grow">
      <div
        className={cn(
          "transform rotate-180 text-center backdrop-blur-md bg-gray-100 dark:bg-white/5 rounded-r-md p-1 text-base font-medium tracking-wide",
          color,
        )}
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {type}
      </div>
      <Textarea
        disabled={disabled}
        className={cn("rounded-l-none focus-visible:ring-0 text-left disabled:opacity-90", className, color)}
        value={input}
        onChange={textHandler}
      />
    </div>
  );
};

export default DecodedTextBox;
