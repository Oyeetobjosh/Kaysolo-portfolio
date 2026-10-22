import { useEffect, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createEarthTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  const random = seededRandom(31415);
  const base = context.createLinearGradient(0, 0, 1024, 512);
  base.addColorStop(0, "#846744");
  base.addColorStop(0.34, "#6c684b");
  base.addColorStop(0.68, "#9d7255");
  base.addColorStop(1, "#4e5941");
  context.fillStyle = base;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < 22; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 80 + random() * 170;
    const colors = ["rgba(216, 182, 133, 0.26)", "rgba(49, 58, 40, 0.24)", "rgba(180, 111, 76, 0.24)"];
    const stain = context.createRadialGradient(x, y, 0, x, y, radius);
    stain.addColorStop(0, colors[Math.floor(random() * colors.length)]);
    stain.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = stain;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  for (let index = 0; index < 34; index += 1) {
    const startY = random() * canvas.height;
    const phase = random() * Math.PI * 2;
    context.beginPath();
    context.moveTo(-20, startY);
    for (let x = 0; x <= canvas.width + 24; x += 32) {
      const y = startY + Math.sin(x * 0.012 + phase) * 17 + Math.cos(x * 0.023 + phase) * 8;
      context.lineTo(x, y);
    }
    context.strokeStyle = index % 2 === 0 ? "rgba(231, 204, 160, 0.3)" : "rgba(39, 48, 34, 0.3)";
    context.lineWidth = 1 + random() * 5;
    context.lineCap = "round";
    context.stroke();
  }

  for (let index = 0; index < 4200; index += 1) {
    const light = random() > 0.52;
    context.fillStyle = light ? "rgba(255, 239, 209, 0.16)" : "rgba(22, 28, 22, 0.13)";
    context.fillRect(random() * canvas.width, random() * canvas.height, 1 + random() * 2, 1 + random() * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  const glow = context.createRadialGradient(128, 128, 4, 128, 128, 126);
  glow.addColorStop(0, "rgba(190, 151, 103, 0.32)");
  glow.addColorStop(0.45, "rgba(145, 132, 86, 0.16)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

type OrbitTrack = {
  group: THREE.Group;
  ring: THREE.Mesh;
  baseRotation: [number, number, number];
  wobbleSpeed: number;
  wobblePhase: number;
  satellites: {
    mesh: THREE.Mesh;
    radius: number;
    speed: number;
    phase: number;
  }[];
};

export default function OrbCanvas({ onReady }: { onReady: () => void }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0xffffff, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.domElement.className = "interactive-orb-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0, 5.6);

    const root = new THREE.Group();
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xf4ead8, 0x52604a, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffe2bc, 3.5);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const mossLight = new THREE.PointLight(0x9b9e6e, 2.8, 9);
    mossLight.position.set(3, 0.8, 3);
    scene.add(mossLight);
    const clayLight = new THREE.PointLight(0xc77e5c, 2.1, 8);
    clayLight.position.set(-3, -1.5, 1.5);
    scene.add(clayLight);

    const glowTexture = createGlowTexture();
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false, opacity: 0.92 })
    );
    glow.position.set(0, 0, -1.6);
    glow.scale.set(4.1, 4.1, 1);
    root.add(glow);

    const earthTexture = createEarthTexture();
    const globeGeometry = new THREE.SphereGeometry(1.18, 64, 48);
    const basePositions = Float32Array.from(globeGeometry.attributes.position.array as ArrayLike<number>);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      map: earthTexture,
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.86,
      clearcoatRoughness: 0.24,
      reflectivity: 0.72,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    root.add(globe);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.27, 48, 40),
      new THREE.MeshBasicMaterial({
        color: 0xb48a61,
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    root.add(atmosphere);

    const orbitConfigs = [
      {
        radius: 1.86,
        tube: 0.01,
        color: 0x6f7957,
        opacity: 0.76,
        rotation: [1.16, 0.12, -0.18] as [number, number, number],
        wobbleSpeed: 0.46,
        wobblePhase: 0,
        moons: [
          { color: 0x6f7957, speed: 0.44, phase: 0.4, size: 0.08 },
          { color: 0xd2a86d, speed: 0.44, phase: 3.6, size: 0.044 },
        ],
      },
      {
        radius: 2.16,
        tube: 0.008,
        color: 0xb47d5a,
        opacity: 0.62,
        rotation: [1.06, -0.2, 0.34] as [number, number, number],
        wobbleSpeed: 0.37,
        wobblePhase: 1.9,
        moons: [{ color: 0xb7795a, speed: -0.33, phase: 2.1, size: 0.062 }],
      },
      {
        radius: 2.46,
        tube: 0.0065,
        color: 0xc89f68,
        opacity: 0.48,
        rotation: [1.24, 0.08, -0.08] as [number, number, number],
        wobbleSpeed: 0.3,
        wobblePhase: 3.7,
        moons: [{ color: 0xd2a86d, speed: 0.25, phase: 4.7, size: 0.052 }],
      },
    ];

    const orbitTracks: OrbitTrack[] = orbitConfigs.map((cfg) => {
      const group = new THREE.Group();
      group.rotation.set(cfg.rotation[0], cfg.rotation[1], cfg.rotation[2]);
      root.add(group);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.radius, cfg.tube, 10, 200),
        new THREE.MeshStandardMaterial({
          color: cfg.color,
          metalness: 0.46,
          roughness: 0.34,
          transparent: true,
          opacity: cfg.opacity,
        })
      );
      group.add(ring);

      const satellites = cfg.moons.map((moon) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(moon.size, 20, 16),
          new THREE.MeshPhysicalMaterial({
            color: moon.color,
            roughness: 0.22,
            metalness: 0.16,
            clearcoat: 0.9,
            emissive: moon.color,
            emissiveIntensity: 0.14,
          })
        );
        group.add(mesh);
        return { mesh, radius: cfg.radius, speed: moon.speed, phase: moon.phase };
      });

      return {
        group,
        ring,
        baseRotation: cfg.rotation,
        wobbleSpeed: cfg.wobbleSpeed,
        wobblePhase: cfg.wobblePhase,
        satellites,
      };
    });

    const updateTrackSatellites = (time: number) => {
      orbitTracks.forEach((track) => {
        track.satellites.forEach((satellite) => {
          const angle = time * satellite.speed + satellite.phase;
          satellite.mesh.position.set(
            Math.cos(angle) * satellite.radius,
            Math.sin(angle) * satellite.radius,
            0
          );
        });
      });
    };
    updateTrackSatellites(0);

    const random = seededRandom(9191);
    const pointCount = 150;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const vertical = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const radius = 1.45 + random() * 0.95;
      const spread = Math.sqrt(1 - vertical * vertical);
      pointPositions[index * 3] = Math.cos(angle) * spread * radius;
      pointPositions[index * 3 + 1] = vertical * radius * 0.56;
      pointPositions[index * 3 + 2] = Math.sin(angle) * spread * radius;
    }
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({ color: 0x85866b, size: 0.022, transparent: true, opacity: 0.56, depthWrite: false, sizeAttenuation: true })
    );
    root.add(points);

    let targetX = 0;
    let targetY = 0;
    let scrollTurn = 0;
    let frame = 0;
    let visible = true;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const width = Math.max(1, element.clientWidth);
      const height = Math.max(1, element.clientHeight);
      camera.aspect = width / height;
      const halfTan = Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const zForHeight = 1.68 / halfTan;
      const zForWidth = 2.66 / (camera.aspect * halfTan);
      camera.position.z = Math.max(zForHeight, zForWidth);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const renderFrame = (timestamp: number) => {
      const time = timestamp * 0.001;
      if (!reducedMotion) {
        root.rotation.x += (targetX + Math.sin(time * 0.42) * 0.045 - root.rotation.x) * 0.035;
        root.rotation.y += (targetY + Math.sin(time * 0.16) * 0.22 + scrollTurn - root.rotation.y) * 0.035;
        root.position.y = Math.sin(time * 0.78) * 0.045;
        globe.rotation.y = time * 0.14;

        orbitTracks.forEach((track) => {
          track.group.rotation.x = track.baseRotation[0] + Math.sin(time * track.wobbleSpeed + track.wobblePhase) * 0.045;
          track.group.rotation.z = track.baseRotation[2] + Math.cos(time * track.wobbleSpeed * 0.8 + track.wobblePhase) * 0.04;
        });

        points.rotation.y -= 0.0014;

        const positions = globeGeometry.attributes.position as THREE.BufferAttribute;
        for (let index = 0; index < positions.count; index += 1) {
          const x = basePositions[index * 3];
          const y = basePositions[index * 3 + 1];
          const z = basePositions[index * 3 + 2];
          const wave = Math.sin(x * 3.1 + time * 0.72) * Math.sin(y * 3.4 - time * 0.51) * Math.sin(z * 3 + time * 0.38);
          const scale = 1 + wave * 0.018;
          positions.setXYZ(index, x * scale, y * scale, z * scale);
        }
        positions.needsUpdate = true;
        globeGeometry.computeVertexNormals();
        updateTrackSatellites(time);
      }
      renderer.render(scene, camera);
    };

    const loop = (timestamp: number) => {
      frame = 0;
      if (!visible || reducedMotion) return;
      renderFrame(timestamp);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (visible && !reducedMotion && !frame) frame = window.requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.34;
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.62;
      start();
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const step = 0.14;
      if (event.key === "ArrowLeft") targetY -= step;
      else if (event.key === "ArrowRight") targetY += step;
      else if (event.key === "ArrowUp") targetX -= step;
      else if (event.key === "ArrowDown") targetX += step;
      else return;
      event.preventDefault();
      start();
    };
    const onScroll = () => {
      const bounds = element.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - bounds.top) / window.innerHeight));
      scrollTurn = progress * 0.18;
      start();
    };

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionPreference = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        stop();
        renderFrame(0);
      } else {
        start();
      }
    };
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });

    resize();
    renderFrame(0);
    onReady();
    intersection.observe(element);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);
    element.parentElement?.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    motionPreference.addEventListener("change", onMotionPreference);
    start();

    return () => {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      element.parentElement?.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      motionPreference.removeEventListener("change", onMotionPreference);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        }
      });
      earthTexture.dispose();
      glowTexture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={host} className="orb-canvas-host" aria-hidden="true" />;
}
