"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assetPath";

const RING_SIZE = "min(44vw, 500px)";
const TICK_COUNT = 120;
const SELECTION = 0xc4784a;
const MAX_TILT = (15 * Math.PI) / 180;
const FACE_YAW = Math.PI + Math.atan2(16.2, 14.3);
const SPIN_SPEED = 0.18;
const DRAG_SENSITIVITY = 0.0055;
const MAX_PITCH = (55 * Math.PI) / 180;
const RETURN_SPEED = 0.045;

type Tick = { x1: number; y1: number; x2: number; y2: number; major: boolean };

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function buildTicks(): Tick[] {
  const cx = 250;
  const cy = 250;
  const outer = 242;
  const ticks: Tick[] = [];
  for (let i = 0; i < TICK_COUNT; i++) {
    const a = (i / TICK_COUNT) * Math.PI * 2 - Math.PI / 2;
    const major = i % 10 === 0;
    const mid = !major && i % 5 === 0;
    const len = major ? 14 : mid ? 9 : 5;
    ticks.push({
      x1: round(cx + Math.cos(a) * (outer - len)),
      y1: round(cy + Math.sin(a) * (outer - len)),
      x2: round(cx + Math.cos(a) * outer),
      y2: round(cy + Math.sin(a) * outer),
      major,
    });
  }
  return ticks;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function wrapPi(angle: number) {
  const tau = Math.PI * 2;
  return ((((angle + Math.PI) % tau) + tau) % tau) - Math.PI;
}

export function HeroOrbit() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<Tick[]>([]);

  useEffect(() => {
    setTicks(buildTicks());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let model: any = null;
    let detachMove: (() => void) | null = null;

    const mouse = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const drag = {
      active: false,
      lastX: 0,
      lastY: 0,
      yaw: 0,
      pitch: 0,
      grabSpin: 0,
    };

    const boot = async () => {
      const THREE = await import("three");
      const { OBJLoader } = await import("three/addons/loaders/OBJLoader.js");
      if (disposed || !hostRef.current) return;

      const width = Math.max(1, Math.floor(host.clientWidth) || 360);
      const height = Math.max(1, Math.floor(host.clientHeight) || 360);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
      const camRig = new THREE.Group();
      camera.position.set(0, 4, 300);
      camera.lookAt(0, 0, 0);
      camRig.add(camera);
      scene.add(camRig);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: SELECTION,
      });

      const loader = new OBJLoader();
      const url = assetPath("/models/Windmill.obj");

      try {
        const object = await loader.loadAsync(url);
        if (disposed) return;

        object.traverse((child) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mesh = child as any;
          if (!mesh.isMesh || !mesh.geometry) return;
          const edges = new THREE.EdgesGeometry(mesh.geometry, 12);
          const lines = new THREE.LineSegments(edges, lineMaterial);
          lines.position.copy(mesh.position);
          lines.rotation.copy(mesh.rotation);
          lines.scale.copy(mesh.scale);
          mesh.parent.add(lines);
          mesh.visible = false;
        });

        // Roblox Studio exports sit far from the origin. Offset the mesh so
        // its visual center is at the pivot origin, then scale/rotate the
        // pivot (never the offset mesh) so spin stays in camera.
        object.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        if (!Number.isFinite(maxDim) || maxDim <= 0) {
          throw new Error("Windmill bounding box is empty");
        }

        const pivot = new THREE.Group();
        object.position.sub(center);
        pivot.add(object);
        pivot.rotation.y = FACE_YAW;
        // Fit inside the circular crop with margin. The canvas is square;
        // overflow:hidden + rounded-full clips anything past ~50% of visibleH.
        const visibleH =
          2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        pivot.scale.setScalar((visibleH * 0.72) / maxDim);
        scene.add(pivot);
        model = pivot;
      } catch (err) {
        console.error("Failed to load Windmill.obj", err);
      }

      const hero =
        host.closest("section") ?? document.documentElement;
      const onMove = (e: Event) => {
        if (drag.active) return;
        const me = e as MouseEvent;
        const rect = hero.getBoundingClientRect();
        const nx = ((me.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((me.clientY - rect.top) / rect.height) * 2 - 1;
        mouse.x = Math.max(-1, Math.min(1, nx));
        mouse.y = Math.max(-1, Math.min(1, ny));
      };
      hero.addEventListener("mousemove", onMove);

      const clock = new THREE.Clock();
      const liveSpin = () =>
        reduced ? 0 : clock.getElapsedTime() * SPIN_SPEED;

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        drag.active = true;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        drag.grabSpin = liveSpin();
        host.setPointerCapture(e.pointerId);
        host.style.cursor = "grabbing";
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!drag.active) return;
        const dx = e.clientX - drag.lastX;
        const dy = e.clientY - drag.lastY;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        drag.yaw = wrapPi(drag.yaw - dx * DRAG_SENSITIVITY);
        drag.pitch = Math.max(
          -MAX_PITCH,
          Math.min(MAX_PITCH, drag.pitch - dy * DRAG_SENSITIVITY),
        );
      };
      const onPointerUp = (e: PointerEvent) => {
        if (!drag.active) return;
        drag.active = false;
        // Keep the current pose, then ease yaw toward the live rest angle.
        drag.yaw = wrapPi(drag.grabSpin + drag.yaw - liveSpin());
        if (host.hasPointerCapture(e.pointerId)) {
          host.releasePointerCapture(e.pointerId);
        }
        host.style.cursor = "grab";
      };
      host.addEventListener("pointerdown", onPointerDown);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerup", onPointerUp);
      host.addEventListener("pointercancel", onPointerUp);

      const onResize = () => {
        if (!renderer || !hostRef.current) return;
        const w = Math.max(1, Math.floor(host.clientWidth) || 360);
        const h = Math.max(1, Math.floor(host.clientHeight) || 360);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      window.addEventListener("resize", onResize);

      renderer.setAnimationLoop(() => {
        if (disposed) return;

        const spin = liveSpin();

        if (!drag.active) {
          drag.yaw = lerp(drag.yaw, 0, RETURN_SPEED);
          drag.pitch = lerp(drag.pitch, 0, RETURN_SPEED);
          if (Math.abs(drag.yaw) < 0.0008) drag.yaw = 0;
          if (Math.abs(drag.pitch) < 0.0008) drag.pitch = 0;
        }

        if (model) {
          const rest = drag.active ? drag.grabSpin : spin;
          model.rotation.y = FACE_YAW + rest + drag.yaw;
          model.rotation.x = drag.pitch;
        }

        const targetX = drag.active || reduced ? 0 : mouse.y * MAX_TILT * -1;
        const targetY = drag.active || reduced ? 0 : mouse.x * MAX_TILT;
        tilt.x = lerp(tilt.x, targetX, 0.08);
        tilt.y = lerp(tilt.y, targetY, 0.08);
        camRig.rotation.x = tilt.x;
        camRig.rotation.y = tilt.y;

        renderer.render(scene, camera);
      });

      detachMove = () => {
        hero.removeEventListener("mousemove", onMove);
        host.removeEventListener("pointerdown", onPointerDown);
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerup", onPointerUp);
        host.removeEventListener("pointercancel", onPointerUp);
        window.removeEventListener("resize", onResize);
      };
    };

    void boot();

    return () => {
      disposed = true;
      detachMove?.();
      if (renderer) {
        renderer.setAnimationLoop(null);
        renderer.dispose();
        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer = null;
      }
      host.replaceChildren();
    };
  }, []);

  return (
    <div
      className="hero-orbit pointer-events-none relative hidden md:block"
      style={{
        width: RING_SIZE,
        height: RING_SIZE,
        minWidth: RING_SIZE,
        minHeight: RING_SIZE,
        aspectRatio: "1 / 1",
        contain: "strict",
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="250"
          cy="250"
          r="242"
          fill="none"
          stroke="rgba(37,42,51,0.8)"
          strokeWidth="1"
        />
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={
              t.major ? "rgba(221,216,207,0.35)" : "rgba(221,216,207,0.12)"
            }
            strokeWidth={t.major ? 1.5 : 1}
            strokeLinecap="round"
          />
        ))}
        <circle
          cx="250"
          cy="250"
          r="228"
          fill="none"
          stroke="rgba(196,120,74,0.15)"
          strokeWidth="1"
        />
      </svg>

      <div
        ref={hostRef}
        className="pointer-events-auto absolute z-10 cursor-grab overflow-hidden rounded-full"
        aria-label="Drag to rotate the lighthouse"
        role="img"
        style={{
          width: "88%",
          height: "88%",
          left: "6%",
          top: "6%",
          touchAction: "none",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
