import React, { FC, useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
interface EncodingOptionsProps {
  setEncodingOptions: Function;
}

const defaultOptions = {
  characterSet: "utf-8",
  urlSafeEncoding: true,
  skipPadding: false,
};

const EncodingOptions: FC<EncodingOptionsProps> = ({ setEncodingOptions }) => {
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    setEncodingOptions(options);
  }, [options]);

  const characterSetHandler = (type: string) => {
    setOptions((prev) => {
      return { ...prev, ["characterSet"]: type };
    });
  };
  const urlSafeEncodingHandler = () => {
    setOptions((prev) => {
      return { ...prev, ["urlSafeEncoding"]: !prev["urlSafeEncoding"] };
    });
  };
  const skipPaddingHandler = () => {
    setOptions((prev) => {
      return { ...prev, ["skipPadding"]: !prev["skipPadding"] };
    });
  };
  return (
    <div className="flex gap-4 backdrop-blur-md bg-gray-100 dark:bg-white/5 p-3 rounded-lg">
      <Select
        onValueChange={characterSetHandler}
        value={options.characterSet}
        defaultValue={defaultOptions.characterSet}
      >
        <SelectTrigger className="w-[200px] bg-white/40 dark:bg-gray-900">
          <SelectValue>
            <span className="uppercase">{options.characterSet}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="h-[400px]">
          <SelectGroup>
            <SelectLabel> Choose source character set</SelectLabel>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Most Popular</SelectLabel>
            <SelectItem value="utf-8">UTF-8</SelectItem>
            <SelectItem value="iso-8859-1">ISO-8859-1 (Latin-1)</SelectItem>
            <SelectItem value="us-ascii">US-ASCII</SelectItem>
            <SelectItem value="utf-16">UTF-16</SelectItem>
            <SelectItem value="windows-1252">Windows-1252</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Others</SelectLabel>
            <SelectItem value="shift_jis">Shift JIS</SelectItem>
            <SelectItem value="gb2312">GB2312</SelectItem>
            <SelectItem value="gbk">GBK</SelectItem>
            <SelectItem value="big5">Big5</SelectItem>
            <SelectItem value="euc-kr">EUC-KR</SelectItem>
            <SelectItem value="iso-2022-jp">ISO-2022-JP</SelectItem>
            <SelectItem value="euc-jp">EUC-JP</SelectItem>
            <SelectItem value="iso-8859-5">ISO-8859-5 (Cyrillic)</SelectItem>
            <SelectItem value="iso-8859-2">ISO-8859-2 (Latin-2, Central European)</SelectItem>
            <SelectItem value="iso-8859-15">ISO-8859-15 (Latin-9)</SelectItem>
            <SelectItem value="koi8-r">KOI8-R (Russian)</SelectItem>
            <SelectItem value="macintosh">MacRoman</SelectItem>
            <SelectItem value="windows-1251">Windows-1251 (Cyrillic)</SelectItem>
            <SelectItem value="windows-1250">Windows-1250 (Central European)</SelectItem>
            <SelectItem value="windows-1253">Windows-1253 (Greek)</SelectItem>
            <SelectItem value="windows-1254">Windows-1254 (Turkish)</SelectItem>
            <SelectItem value="windows-1257">Windows-1257 (Baltic)</SelectItem>
            <SelectItem value="utf-32">UTF-32</SelectItem>
            <SelectItem value="iso-8859-9">ISO-8859-9 (Turkish)</SelectItem>
            <SelectItem value="iso-8859-7">ISO-8859-7 (Greek)</SelectItem>
            <SelectItem value="iso-8859-6">ISO-8859-6 (Arabic)</SelectItem>
            <SelectItem value="iso-8859-8">ISO-8859-8 (Hebrew)</SelectItem>
            <SelectItem value="tis-620">TIS-620 (Thai)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex items-center space-x-2">
        <Checkbox id="urlsafe" checked={options.urlSafeEncoding} onClick={urlSafeEncodingHandler} />
        <label
          htmlFor="urlsafe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
        >
          URL safe encoding
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="urlsafe" checked={options.skipPadding} onClick={skipPaddingHandler} />
        <label
          htmlFor="urlsafe"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
        >
          Skip padding
        </label>
      </div>
    </div>
  );
};

export default EncodingOptions;
