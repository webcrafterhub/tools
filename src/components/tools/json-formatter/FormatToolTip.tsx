import React, { FC, useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../../ui/button";
import { GiStarFormation } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import { PiShootingStar } from "react-icons/pi";
import { PiShootingStarFill } from "react-icons/pi";

interface FormatToolTipProps {
  disabled?: boolean | number;
  format: Function;
}

const FormatToolTip: FC<FormatToolTipProps> = ({ disabled, format }) => {
  const [formatted, setformatted] = useState(false);
  useEffect(() => {
    if (!formatted) return;
    setTimeout(() => {
      setformatted(false);
    }, 3000);
  }, [formatted]);

  function formatHandler() {
    setformatted(true);
    format();
  }
  return (
    <div>
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex gap-1" variant="outline" onClick={formatHandler} disabled={!!disabled}>
              {formatted ? (
                <>
                  <PiShootingStarFill className="text-xl text-blue-500" />
                </>
              ) : (
                <>
                  <PiShootingStar className="text-lg" />
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Beautify in JSON format</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default FormatToolTip;
