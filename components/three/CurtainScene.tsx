"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// The soft-touch curtain (design brief): long cloth strips hanging from a rail like the
// tunnel's mitter curtain. A vertex shader sways them, parts them around the pointer, and
// sweeps them aside as the hero scrolls away. Colors are the brand's sampled hexes.
const COLORS = ["#ea1824", "#6ccff0", "#0577b5", "#ea1824", "#004290", "#6cccf0"];

const vertex = /* glsl */ `
  attribute float aX;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPart;
  varying vec3 vColor;
  varying float vShade;
  varying float vY;
  varying float vU;
  varying float vEdge;
  void main() {
    vec3 p = position;
    float hang = 1.0 - uv.y;             // 0 at the rail, 1 at the hem
    float sway = sin(uTime * 0.9 + aPhase + hang * 2.4) * 0.22 * hang;
    float flutter = sin(uTime * 2.3 + aPhase * 3.0 + hang * 9.0) * 0.05 * hang;
    float x = aX + p.x;
    float worldY = p.y;
    // part around the pointer (world units)
    vec2 d = vec2(x, worldY) - uPointer;
    float push = exp(-dot(d, d) * 0.9) * 0.9 * hang;
    float side = sign(x - uPointer.x + 0.0001);
    // sweep aside from the center as the hero scrolls out
    float sweep = uPart * sign(aX + 0.0001) * (0.6 + abs(aX) * 0.6) * hang * 2.2;
    x += sway + side * push + sweep;
    float z = cos(uTime * 0.7 + aPhase + hang * 3.1) * 0.35 * hang + flutter * 4.0 + push * 0.6;
    vec4 mv = modelViewMatrix * vec4(x, worldY, z, 1.0);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vShade = 0.72 + 0.28 * sin(uTime * 0.9 + aPhase + hang * 2.4 + 1.2);
    vY = uv.y;
    vU = uv.x;
    vEdge = 1.0 - smoothstep(1.7, 2.75, abs(aX));
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vColor;
  varying float vShade;
  varying float vY;
  varying float vU;
  varying float vEdge;
  void main() {
    // a travelling band of light, like the arch lights passing over the cloth
    float band = smoothstep(0.18, 0.0, abs(fract(vY * 0.6 - uTime * 0.12) - 0.5));
    float round_ = 0.62 + 0.38 * sin(vU * 3.14159);   // cloth reads as a soft rounded strip
    vec3 col = vColor * vShade * round_ + band * 0.2 * round_;
    // soft fade at the hem and toward the outer strips
    float alpha = smoothstep(0.0, 0.18, vY) * mix(0.35, 1.0, vEdge);
    gl_FragColor = vec4(col, alpha);
  }
`;

function Strips({ count, animate }: { count: number; animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2(0, 99));

  const geometry = useMemo(() => {
    const base = new THREE.PlaneGeometry(0.15, 7.2, 4, 48);
    base.translate(0, -0.2, 0);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.setAttribute("position", base.getAttribute("position"));
    g.setAttribute("uv", base.getAttribute("uv"));
    const xs = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const span = 5.4;
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      xs[i] = -span / 2 + (span * (i + 0.5)) / count;
      phases[i] = i * 0.61 + Math.sin(i * 12.9898) * 0.8;
      c.set(COLORS[i % COLORS.length]);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("aX", new THREE.InstancedBufferAttribute(xs, 1));
    g.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phases, 1));
    g.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
    g.instanceCount = count;
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({ uTime: { value: 2.0 }, uPointer: { value: new THREE.Vector2(0, 99) }, uPart: { value: 0 } }),
    []
  );

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    if (animate) u.uTime.value += Math.min(delta, 0.05);
    // pointer in world units on the z=0 plane
    const target = new THREE.Vector2((state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2);
    if (state.pointer.x === 0 && state.pointer.y === 0) target.set(0, 99);
    pointer.current.lerp(target, 0.08);
    u.uPointer.value.copy(pointer.current);
    const part = typeof window === "undefined" ? 0 : Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    u.uPart.value += (part - u.uPart.value) * 0.12;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function CurtainScene({ reduced }: { reduced: boolean }) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, small ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 8.6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <group rotation={[0, -0.22, 0]} position={[0.1, 0.0, 0]}>
        <Strips count={small ? 20 : 30} animate={!reduced} />
        {/* the rail the curtain hangs from */}
        <mesh position={[0, 3.42, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.07, 5.8, 6, 16]} />
          <meshBasicMaterial color="#0b1b3a" />
        </mesh>
      </group>
    </Canvas>
  );
}
