import React, { FC } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

interface LockToolTipProps {
  disabled?: boolean | number;
  locked: boolean;
  lockHandler: Function;
}

const LockToolTip: FC<LockToolTipProps> = ({ locked, disabled, lockHandler }) => {
  function handler() {
    lockHandler();
  }

  return (
    <div>
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-1" variant="outline" onClick={handler} disabled={!!disabled}>
              {locked ? (
                <>
                  <HiOutlineLockClosed className="text-md" />
                </>
              ) : (
                <>
                  <HiOutlineLockOpen className="text-md text-blue-500" />
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Your Decoded Data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LockToolTip;
