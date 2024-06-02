import React, { FC, useState } from "react";
import { saveAs } from "file-saver";
import { Parser } from "@json2csv/plainjs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsFiletypeJson, BsFiletypeTxt } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFiletypeCsv } from "react-icons/bs";

interface JsonFileDownloadProps {
  jsonObj: Record<string, any> | Array<Record<string, any>>;
}

const JsonFileDownload: FC<JsonFileDownloadProps> = ({ jsonObj }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: string) => {
    setDownloading(true);
    try {
      switch (format) {
        case "json":
          await downloadJson();
          break;
        case "csv":
          await downloadCsv();
          break;
        case "txt":
          await downloadTxt();
          break;
        default:
          break;
      }
    } finally {
      setDownloading(false);
    }
  };

  const downloadJson = async () => {
    const blob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: "application/json" });
    saveAs(blob, "jsonData.json");
  };

  const downloadCsv = async () => {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(jsonObj);
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "jsonData.csv");
  };

  const downloadTxt = async () => {
    const text = JSON.stringify(jsonObj, null, 2);
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, "jsonData.txt");
  };

  return (
    <div className="text-gray-600 dark:text-gray-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex gap-2" variant="outline">
            <TbFileDownload className="text-xl" />
            <span>Download</span>
            <MdKeyboardArrowDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ">
          <DropdownMenuLabel>Download As</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2">
              <BsFiletypeJson className="text-lg" />
              <button onClick={() => handleDownload("json")}>JSON (.json)</button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <BsFiletypeCsv className="text-lg" />
              <button onClick={() => handleDownload("csv")}>CSV (.csv)</button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2">
              <BsFiletypeTxt className="text-lg" />
              <button onClick={() => handleDownload("txt")}>TEXT (.txt)</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default JsonFileDownload;
