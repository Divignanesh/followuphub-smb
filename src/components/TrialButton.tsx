import type { ReactNode } from "react";
import { ShimmerButton } from "./magic/shimmer-button";
import { cx, openTrial } from "./ui";

/** The page's primary "Start free trial", on Magic UI's Shimmer Button. Opens the trial form. */
export function TrialButton({ founder, size = "lg", className, children = "Start free trial" }: { founder?: boolean; size?: "md" | "lg"; className?: string; children?: ReactNode }) {
  return (
    <ShimmerButton
      onClick={() => openTrial(founder)}
      className={cx(size === "lg" ? "h-[52px] text-[16px]" : "h-11 px-5 text-[15px]", className)}
    >
      {children}
    </ShimmerButton>
  );
}
