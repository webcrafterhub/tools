import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import UploadIcon from "@/assets/svg/uploadIcon";
import { useDropzone } from "react-dropzone";
import { toast } from "@/components/ui/use-toast";

interface FileUploadProps {
  setJsonStr: Function;
  loadingHandler: Function;
}

const FileUpload: FC<FileUploadProps> = ({ setJsonStr, loadingHandler }) => {
  const [uploadError, setUploadError] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadingHandler(loading);
  }, [loading]);

  useEffect(() => {
    if (!uploadError) return;
    toast({
      title: "Error",
      description: uploadError,
      variant: "destructive",
    });
    setUploadError("");
  }, [uploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles);
      }
    },
  });

  function handleFileChange(files: Array<File> | any) {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 50 * 1024 * 1024) {
        setUploadError("File is too large. Maximum size is 5MB.");
      } else if (
        !file.type.includes("json") &&
        !file.type.includes("plain") &&
        !file.type.includes("msword") &&
        !file.type.includes("vnd.openxmlformats-officedocument.wordprocessingml.document")
      ) {
        setUploadError("Invalid file type. Only JSON, TXT, or DOC files are allowed.");
      } else {
        checkFileContainValidJSON(file);
      }
    }
  }

  function checkFileContainValidJSON(file: File) {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const JsonData = e.target?.result as string;
        setJsonStr(JsonData);
        setUploadError("");
      } catch (error) {
        setUploadError("Invalid JSON content. Please upload a file with valid JSON format.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  }
  return (
    <>
      <div className="flex items-center justify-center w-full " {...getRootProps()} aria-disabled={loading}>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center relative w-full h-28 md:h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-900"
        >
          <div className="flex flex-col items-center justify-center gap-1 md:gap-4">
            <UploadIcon className="w-8 h-8  text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">JSON, TXT, or DOC (MAX. 50MB)</p>
          </div>
          <input
            {...getInputProps()}
            onChange={(e) => handleFileChange(e.target)}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
          {isDragActive && (
            <div className=" absolute rounded-lg top-0 left-0 w-full h-full flex justify-center items-center gap-2 backdrop-blur-lg backdrop-filter">
              <UploadIcon className="w-8 h-8  text-gray-500 dark:text-gray-400" />
              <span className="text-lg font-bold text-slate-500">Drop Your File Here</span>
            </div>
          )}
        </label>
      </div>
    </>
  );
};

export default FileUpload;
