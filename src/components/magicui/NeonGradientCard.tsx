"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NeonGradientCardProps {
  /**
   * @default ""
   * @type string
   * @description The class name to be applied to the card
   */
  className?: string;

  /**
   * @default ""
   * @type string
   * @description The class name to be applied to the gradient
   */
  gradientClassName?: string;

  /**
   * @default "{first: '#3b82f6', second: '#60a5fa'}"
   * @type {first: string; second: string}
   * @description The colors of the gradient
   */
  colors?: {
    first: string;
    second: string;
  };

  /**
   * @default 20
   * @type number
   * @description The border size of the card
   */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description The border radius of the card
   */
  borderRadius?: number;

  /**
   * @default 10
   * @type number
   * @description The glow opacity of the card
   */
  glowOpacity?: number;

  /**
   * @default 5
   * @type number
   * @description The animation duration of the gradient
   */
  duration?: number;

  children?: React.ReactNode;
}

export default function NeonGradientCard({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  glowOpacity = 0.4,
  duration = 5,
  colors = { first: "#3b82f6", second: "#60a5fa" },
  ...props
}: NeonGradientCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--glow-opacity": glowOpacity,
          "--duration": `${duration}s`,
          "--color-1": colors.first,
          "--color-2": colors.second,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative z-10 w-full rounded-[var(--border-radius)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-[var(--border-radius)] border-[var(--border-size)] border-transparent bg-background",
          "after:absolute after:inset-[-2px] after:z-[-1] after:rounded-[var(--border-radius)] after:bg-[linear-gradient(0deg,var(--color-1),var(--color-2),var(--color-1))] after:bg-[length:100%_200%] after:opacity-[var(--glow-opacity)] after:blur-[20px] after:animate-neon-gradient",
          "before:absolute before:inset-[-1px] before:z-[-1] before:rounded-[var(--border-radius)] before:bg-[linear-gradient(0deg,var(--color-1),var(--color-2),var(--color-1))] before:bg-[length:100%_200%] before:animate-neon-gradient",
        )}
      >
        {children}
      </div>
    </div>
  );
}
