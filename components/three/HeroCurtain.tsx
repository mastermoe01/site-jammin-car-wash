"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

function Fallback() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <Image
        src="/photos/lutz-tunnel-lights.webp"
        alt="A car under the soft-touch cloth and lights in the Jammin tunnel"
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

const CurtainScene = dynamic(() => import("./CurtainScene"), { ssr: false, loading: () => <Fallback /> });

const subscribe = () => () => {};
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroCurtain() {
  const reduced = useReducedMotion() ?? false;
  const webgl = useSyncExternalStore(subscribe, hasWebGL, () => true);
  if (!webgl) return <Fallback />;
  return (
    <div className="absolute inset-0">
      <CurtainScene reduced={reduced} />
    </div>
  );
}
