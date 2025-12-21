"use client";
import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Loader } from "@react-three/drei";
import {
  Mic01Icon,
  MicOff01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createNoise3D } from "simplex-noise";

interface AudioContextValue {
  running: boolean;
  analyser: AnalyserNode | null;
  data: Uint8Array;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};

interface AudioProviderProps {
  running: boolean;
  children: ReactNode;
}

export function AudioProvider({ running, children }: AudioProviderProps) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [data] = useState<Uint8Array>(new Uint8Array(256));
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!running) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.close();
        ctxRef.current = null;
      }
      setAnalyser(null);
      return;
    }

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const c = new AudioContext();
        const src = c.createMediaStreamSource(stream);
        const an = c.createAnalyser();
        an.fftSize = 512;
        an.smoothingTimeConstant = 0.8;
        src.connect(an);
        setAnalyser(an);
        ctxRef.current = c;
        streamRef.current = stream;
      } catch (e) {
        console.error("Microphone access denied", e);
      }
    };
    start();
  }, [running]);

  return (
    <AudioCtx.Provider value={{ running, analyser, data }}>
      {children}
    </AudioCtx.Provider>
  );
}

interface AudioVisualizerSphereProps {
  color?: string;
}

const noise3D = createNoise3D();

export function AudioVisualizerSphere({
  color = "#0a0a0a",
}: AudioVisualizerSphereProps) {
  const { running, analyser, data } = useAudio();
  const ref = useRef<THREE.Mesh>(null!);
  const baseDirs = useRef<THREE.Vector3[]>([]);
  const bassRef = useRef(0);
  const treRef = useRef(0);

  useEffect(() => {
    if (ref.current && baseDirs.current.length === 0) {
      const pos = (ref.current.geometry as THREE.SphereGeometry).attributes
        .position;
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(
          pos.getX(i),
          pos.getY(i),
          pos.getZ(i)
        ).normalize();
        baseDirs.current.push(v);
      }
    }
  }, []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh || baseDirs.current.length === 0) return;
    const geo = mesh.geometry as THREE.SphereGeometry;
    const pos = geo.attributes.position;
    const t = performance.now();

    if (!running || !analyser) {
      bassRef.current = THREE.MathUtils.lerp(bassRef.current, 0, 0.15);
      treRef.current = THREE.MathUtils.lerp(treRef.current, 0, 0.15);
    } else {
      analyser.getByteFrequencyData(data as unknown as Uint8Array<ArrayBuffer>);
      const half = data.length / 2;
      const lower = data.slice(0, half);
      const upper = data.slice(half);
      const bass = Math.max(...lower) / 256;
      const treble = upper.reduce((a, b) => a + b, 0) / (upper.length * 256);
      bassRef.current = THREE.MathUtils.lerp(bassRef.current, bass * 4, 0.08);
      treRef.current = THREE.MathUtils.lerp(treRef.current, treble * 1.2, 0.08);
    }

    for (let i = 0; i < pos.count; i++) {
      const dir = baseDirs.current[i];
      const blobNoise = noise3D(
        dir.x * 1.5 + t * 0.0002,
        dir.y * 1.5,
        dir.z * 1.5
      );
      const audioNoise = noise3D(
        dir.x + t * 0.001,
        dir.y + t * 0.001,
        dir.z + t * 0.001
      );
      const d =
        5 + blobNoise * 0.6 + bassRef.current + audioNoise * 7 * treRef.current;
      pos.setXYZ(i, dir.x * d, dir.y * d, dir.z * d);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={ref} position={[0, 10, 0]}>
      <sphereGeometry args={[5, 128, 128]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
        reflectivity={0.8}
      />
    </mesh>
  );
}

interface AudioVisualizerGridProps
  extends Partial<React.ComponentProps<typeof Grid>> {
  enabled?: boolean;
}

export function AudioVisualizerGrid({
  enabled = true,
  ...props
}: AudioVisualizerGridProps) {
  if (!enabled) return null;
  return (
    <Grid
      args={[200, 200]}
      cellSize={2}
      cellThickness={1}
      cellColor="#6f6f6f"
      sectionSize={8}
      sectionThickness={2}
      sectionColor="#ffffff"
      infiniteGrid={false}
      position={[0, 0.01, 0]}
      {...props}
    />
  );
}
export function AudioVisualizerFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.5, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#000000" metalness={0.5} />
    </mesh>
  );
}

interface ControlsProps {
  rec: boolean;
  toggle: () => void;
  cancel: () => void;
}

const Controls: React.FC<ControlsProps> = ({ rec, toggle, cancel }) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
    <div className="flex flex-row items-center justify-center gap-12">
      <button
        onClick={toggle}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          rec ? "bg-red-600 hover:bg-red-700" : "bg-white hover:bg-gray-100"
        }`}
      >
        {rec ? (
          <HugeiconsIcon icon={MicOff01Icon} className="w-6 h-6 text-white" />
        ) : (
          <HugeiconsIcon icon={Mic01Icon} className="w-6 h-6 text-black" />
        )}
      </button>

      <button
        onClick={cancel}
        disabled={!rec}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
          rec ? "bg-white hover:bg-gray-100" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <HugeiconsIcon icon={Cancel01Icon} className="w-6 h-6 text-black" />
      </button>
    </div>
  </div>
);

interface AudioVisualizerExperienceProps {
  background?: string;
  sphereColor?: string;
  showGrid?: boolean;
  orbitProps?: Partial<React.ComponentProps<typeof OrbitControls>>;
  envProps?: Partial<React.ComponentProps<typeof Environment>>;
  gridProps?: Partial<React.ComponentProps<typeof Grid>>;
}

export function AudioVisualizerExperience({
  background = "#000000",
  sphereColor = "#0a0a0a",
  showGrid = true,
  orbitProps = {},
  envProps = {},
  gridProps = {},
}: AudioVisualizerExperienceProps) {
  const [rec, setRec] = useState(false);

  return (
    <div
      className="relative w-full h-[30rem] overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <Canvas
        camera={{ position: [0, 15, 60], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <AudioProvider running={rec}>
          <AudioVisualizerSphere color={sphereColor} />
          <AudioVisualizerFloor />
          <AudioVisualizerGrid enabled={showGrid} {...gridProps} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 20, 10]} intensity={0.8} />
          <Environment {...envProps} />
        </AudioProvider>

        <OrbitControls {...orbitProps} />
      </Canvas>
      <Loader />
      <Controls
        rec={rec}
        toggle={() => setRec(!rec)}
        cancel={() => setRec(false)}
      />
    </div>
  );
}
