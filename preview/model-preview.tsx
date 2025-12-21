"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  Model,
  ModelScene,
  ModelCamera,
  ModelLighting,
  ModelControls,
  ModelContent,
} from "@/components/chatcn/3d/model";

const ModelPreview = () => {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "#0a0a0a" : "#ffffff";

  return (
    <ModelContent height="70vh" width="100%">
      <Model
        src="/3d/abstract.glb"
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={1}
        float={false}
      />
      <ModelScene bgColor={bgColor} env="city" />
      <ModelCamera fov={50} position={[0, 0, 5]} />
      <ModelLighting type="studio" shadow />
      <ModelControls
        autoRotate
        rotationSpeed={1}
        zoom={false}
        reverse={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 8}
      />
    </ModelContent>
  );
};

export default ModelPreview;
