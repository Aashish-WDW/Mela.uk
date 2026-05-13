"use client";

import { useEffect, useState } from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesTextProps {
  /**
   * @default "Sparkles"
   * @type string
   * @description The text to be displayed
   */
  text: string;

  /**
   * @default "h1"
   * @type string
   * @description The element type to be used
   */
  as?: React.ElementType;

  /**
   * @default ""
   * @type string
   * @description The class name to be applied to the text
   */
  className?: string;

  /**
   * @default "{first: '#A07E55', second: '#D9B26A'}"
   * @type {first: string; second: string}
   * @description The colors of the sparkles
   */
  colors?: {
    first: string;
    second: string;
  };

  /**
   * @default 10
   * @type number
   * @description The number of sparkles to be displayed
   */
  sparklesCount?: number;
}

interface SparkleProps {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

const Sparkle = ({ id, x, y, color, delay, scale, lifespan }: SparkleProps) => (
  <motion.svg
    key={id}
    className="pointer-events-none absolute z-0"
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, scale, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: lifespan,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <path
      d="M10.5 0C10.5 5.79899 15.201 10.5 21 10.5C15.201 10.5 10.5 15.201 10.5 21C10.5 15.201 5.79899 10.5 0 10.5C5.79899 10.5 10.5 5.79899 10.5 0Z"
      fill={color}
    />
  </motion.svg>
);

export default function SparklesText({
  text,
  as: Component = "h1",
  className,
  colors = { first: "#3b82f6", second: "#60a5fa" },
  sparklesCount = 10,
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: sparklesCount }, (_, i) => ({
        id: `${i}-${Math.random()}`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        color: Math.random() > 0.5 ? colors.first : colors.second,
        delay: Math.random() * 2,
        scale: Math.random() * 0.7 + 0.3,
        lifespan: Math.random() * 2 + 1,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <Component
      className={cn("relative inline-block pb-2", className)}
    >
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{text}</span>
    </Component>
  );
}
