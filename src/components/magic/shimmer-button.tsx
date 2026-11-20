/**
 * Shimmer Button, from Magic UI (dillionverma, MIT) via 21st.dev.
 * Adapted: project `cx`, green background by default, 12px radius to match
 * the page's button shape. The light travelling the edge stops under
 * reduced motion (see index.css).
 */
import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cx } from "../ui";

export interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children?: ReactNode;
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#bff0d9",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "12px",
      background = "var(--color-brand)",
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      style={{
        "--spread": "90deg",
        "--shimmer-color": shimmerColor,
        "--radius": borderRadius,
        "--speed": shimmerDuration,
        "--cut": shimmerSize,
        "--bg": background,
      } as CSSProperties}
      className={cx(
        "group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-7 font-medium text-white [background:var(--bg)] [border-radius:var(--radius)]",
        "shadow-[0_8px_20px_-10px_rgb(26_107_90/0.8)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
        className,
      )}
      {...props}
    >
      {/* spark container */}
      <div className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
        <div className="shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      <span className="relative z-10 inline-flex items-center">{children}</span>
      {/* highlight */}
      <div className="absolute inset-0 size-full rounded-[inherit] shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
      {/* backdrop */}
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
    </button>
  ),
);
ShimmerButton.displayName = "ShimmerButton";
