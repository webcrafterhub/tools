import React, { FC, useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../../ui/button";
import { FaRegCopy } from "react-icons/fa6";
import { MdDone } from "react-icons/md";

interface CopyToolTipProps {
  disabled?: boolean | number;
  data: string;
}

const CopyToolTip: FC<CopyToolTipProps> = ({ disabled, data }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);

  function copyHandler() {
    navigator.clipboard.writeText(data);
    setCopied(true);
  }
  return (
    <div>
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-1" variant="outline" onClick={copyHandler} disabled={!!disabled}>
              {copied ? (
                <>
                  <MdDone className="text-base text-blue-500" />
                  <span className="text-blue-500">Copied</span>
                </>
              ) : (
                <>
                  <FaRegCopy />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CopyToolTip;
