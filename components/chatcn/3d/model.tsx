"use client";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  useGLTF,
  useAnimations,
  Html,
} from "@react-three/drei";
import React, { Suspense, ReactNode, useEffect } from "react";

export type EnvironmentPreset =
  | "city"
  | "night"
  | "sunset"
  | "forest"
  | "warehouse"
  | "studio"
  | "apartment";
export type LightingType = "soft" | "dramatic" | "studio";

export function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-600">Loading model…</p>
      </div>
    </Html>
  );
}

export interface ModelProps {
  children: ReactNode;
  width?: string;
  height?: string;
  fov?: number;
  cameraPosition?: [number, number, number];
  shadow?: boolean;
}

export function ModelContent({
  children,
  width = "100%",
  height = "100%",
  fov = 45,
  cameraPosition = [0, 0, 4],
  shadow = false,
}: ModelProps) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ fov, position: cameraPosition }} shadows={shadow}>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

export function ModelScene({
  bgColor = "#000000",
  env = "city",
}: {
  bgColor?: string;
  env?: EnvironmentPreset;
}) {
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <Environment preset={env} />
    </>
  );
}

export function ModelCamera({ }: {
  fov?: number;
  position?: [number, number, number];
}) {
  return null;
}

export function ModelLighting({
  type = "soft",
  shadow = false,
}: {
  type?: LightingType;
  shadow?: boolean;
}) {
  if (type === "soft") return <ambientLight intensity={0.4} />;
  if (type === "dramatic")
    return <directionalLight position={[2, 2, 5]} intensity={1.2} />;
  if (type === "studio")
    return (
      <>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          intensity={1.5}
          castShadow={shadow}
        />
      </>
    );
  return null;
}

export function Model({
  src,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  float = false,
}: {
  src: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  float?: boolean;
}) {
  const { scene, animations } = useGLTF(src);
  const { actions } = useAnimations(animations, scene);
  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);

  const content = (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );

  return float ? <Float>{content}</Float> : content;
}

export function ModelControls({
  autoRotate = false,
  rotationSpeed = 1,
  zoom = false,
  reverse = false,
  ...props
}: {
  autoRotate?: boolean;
  rotationSpeed?: number;
  zoom?: boolean;
  reverse?: boolean;
  [key: string]: unknown;
}) {
  return (
    <OrbitControls
      enableZoom={zoom}
      autoRotate={autoRotate}
      autoRotateSpeed={rotationSpeed}
      reverseOrbit={reverse}
      {...props}
    />
  );
}
