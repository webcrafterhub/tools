import Image from "next/image";
import React, { FC } from "react";
import UploadIcon from "@/assets/svg/uploadIcon";

interface FileUploadProps {}

const FileUpload: FC<FileUploadProps> = ({}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-28 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900"
      >
        <div className="flex flex-col items-center justify-center gap-1 md:gap-4">
          <UploadIcon className="w-8 h-8  text-gray-500 dark:text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">JSON, TXT, or DOC (MAX. 1MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default FileUpload;
