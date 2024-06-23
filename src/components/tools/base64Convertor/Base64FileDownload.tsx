import React, { FC, useState } from "react";
import { saveAs } from "file-saver";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BsFiletypeTxt } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Base64FileDownloadProps {
  content: string;
}

const Base64FileDownload: FC<Base64FileDownloadProps> = ({ content }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: string) => {
    setDownloading(true);
    try {
      switch (format) {
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

  const downloadTxt = async () => {
    const blob = new Blob([content], { type: "text/plain" });
    saveAs(blob, "data.txt");
  };

  return (
    <div className="text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-900">
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
              <BsFiletypeTxt className="text-lg" />
              <button onClick={() => handleDownload("txt")}>TEXT (.txt)</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Base64FileDownload;
