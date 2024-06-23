import React, { FC, useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { GrClearOption } from "react-icons/gr";
import { AiOutlineClear } from "react-icons/ai";

interface ClearToolTipProps {
  disabled?: boolean | number;
  clearHandler: Function;
}

const ClearToolTip: FC<ClearToolTipProps> = ({ disabled, clearHandler }) => {
  const [cleared, setCleared] = useState(false);
  useEffect(() => {
    if (!cleared) return;
    setTimeout(() => {
      setCleared(false);
    }, 3000);
  }, [cleared]);

  function copyHandler() {
    clearHandler();
    setCleared(true);
  }
  return (
    <div>
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-1" variant="outline" onClick={copyHandler} disabled={!!disabled}>
              {cleared ? (
                <>
                  <AiOutlineClear className="text-base text-blue-500" />
                </>
              ) : (
                <>
                  <GrClearOption />
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ClearToolTip;
