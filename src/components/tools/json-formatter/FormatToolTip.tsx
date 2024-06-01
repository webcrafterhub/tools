import React, { FC, useEffect, useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../../ui/button";
import { GiStarFormation } from "react-icons/gi";
import { MdDone } from "react-icons/md";
import { cn } from "@/lib/utils";

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
            <Button className="flex gap-1 " variant="outline" onClick={formatHandler} disabled={!!disabled}>
              <GiStarFormation className={cn("text-lg text-blue-400", { "text-yellow-500": formatted })} />
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
