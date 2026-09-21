import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface HintProps{
  label:string,
  children:ReactNode
  asChild?:boolean,
  side?:"top" | "bottom" | "left" | "right",
  align?:"start" | "center" | "end"
}

const Hint = ({
  label,
  children,
  asChild,
  side,
  align
}:HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent className=" text-black bg-white rounded-sm px-4 py-1" side={side} align={align}>
          <p className=" font-semibold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint