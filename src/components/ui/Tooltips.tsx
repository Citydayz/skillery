import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export default function Tooltip({
  children,
  content,
  delay = 100,
}: {
  children: ReactNode;
  content: string;
  delay?: number;
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={delay}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            align="center"
            className="z-50 rounded bg-zinc-800 px-3 py-1.5 text-sm text-white shadow-md animate-fade-in data-[state=delayed-open]:animate-fade-in"
            sideOffset={8}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-zinc-800" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
