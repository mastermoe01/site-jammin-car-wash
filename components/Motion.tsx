"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

const ease = [0.2, 0.9, 0.25, 1] as const;

// Position-only rise; never starts invisible, so content can't get stuck hidden.
export function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Roll-in: slides in from the left like a car entering the tunnel.
export function RollIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ x: -40 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Scroll-linked horizontal drift for the tunnel band photos.
export function Pan({ children, className = "", distance = 80 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { x }}>{children}</motion.div>
    </div>
  );
}

// The LPR lane: a progress line that fills as the steps scroll past.
export function LaneProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-0 right-0 top-[1.15rem] hidden h-[3px] bg-ink/10 md:block">
        <motion.div className="h-full origin-left bg-jam" style={reduce ? { scaleX: 1 } : { scaleX: scrollYProgress }} />
      </div>
      {children}
    </div>
  );
}
