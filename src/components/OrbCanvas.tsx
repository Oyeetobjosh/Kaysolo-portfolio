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

type Satellite = {
  mesh: THREE.Mesh;
  radius: number;
  speed: number;
  phase: number;
  lean: number;
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
    camera.position.set(0, 0, 5.25);

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
      new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false, opacity: 0.95 })
    );
    glow.position.set(0, 0, -1.6);
    glow.scale.set(4.5, 4.5, 1);
    root.add(glow);

    const earthTexture = createEarthTexture();
    const globeGeometry = new THREE.SphereGeometry(1.13, 64, 48);
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
      new THREE.SphereGeometry(1.22, 48, 40),
      new THREE.MeshBasicMaterial({
        color: 0xb48a61,
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    root.add(atmosphere);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.009, 8, 180),
      new THREE.MeshStandardMaterial({ color: 0x6f7957, metalness: 0.48, roughness: 0.32, transparent: true, opacity: 0.72 })
    );
    outerRing.rotation.set(1.05, 0.2, 0.12);
    root.add(outerRing);

    const crossingRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.81, 0.006, 8, 180),
      new THREE.MeshStandardMaterial({ color: 0xb47d5a, metalness: 0.42, roughness: 0.38, transparent: true, opacity: 0.52 })
    );
    crossingRing.rotation.set(0.58, 1.08, 0.75);
    root.add(crossingRing);

    const satelliteSpecs = [
      { color: 0x6f7957, radius: 1.77, speed: 0.42, phase: 0.4, lean: 0.7, size: 0.075 },
      { color: 0xb7795a, radius: 1.95, speed: -0.31, phase: 2.2, lean: 1.04, size: 0.052 },
      { color: 0xd2a86d, radius: 1.68, speed: 0.24, phase: 4.5, lean: 0.43, size: 0.043 },
    ];
    const satellites: Satellite[] = satelliteSpecs.map((spec) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(spec.size, 20, 16),
        new THREE.MeshPhysicalMaterial({
          color: spec.color,
          roughness: 0.22,
          metalness: 0.16,
          clearcoat: 0.9,
          emissive: spec.color,
          emissiveIntensity: 0.12,
        })
      );
      root.add(mesh);
      return { mesh, radius: spec.radius, speed: spec.speed, phase: spec.phase, lean: spec.lean };
    });

    const setSatellitePosition = (satellite: Satellite, time: number) => {
      const angle = time * satellite.speed + satellite.phase;
      satellite.mesh.position.set(
        Math.cos(angle) * satellite.radius,
        Math.sin(angle) * satellite.radius * Math.sin(satellite.lean) * 0.56,
        Math.sin(angle) * satellite.radius * Math.cos(satellite.lean)
      );
    };
    satellites.forEach((satellite) => setSatellitePosition(satellite, 0));

    const random = seededRandom(9191);
    const pointCount = 130;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const vertical = random() * 2 - 1;
      const angle = random() * Math.PI * 2;
      const radius = 1.95 + random() * 0.58;
      const spread = Math.sqrt(1 - vertical * vertical);
      pointPositions[index * 3] = Math.cos(angle) * spread * radius;
      pointPositions[index * 3 + 1] = vertical * radius;
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
      camera.position.z = width < 360 ? 5.7 : 5.25;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const renderFrame = (timestamp: number) => {
      const time = timestamp * 0.001;
      if (!reducedMotion) {
        root.rotation.x += (targetX + Math.sin(time * 0.42) * 0.055 - root.rotation.x) * 0.035;
        root.rotation.y += (targetY + Math.sin(time * 0.14) * 0.24 + scrollTurn - root.rotation.y) * 0.035;
        root.position.y = Math.sin(time * 0.78) * 0.055;
        outerRing.rotation.z += 0.0018;
        crossingRing.rotation.x -= 0.0011;
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
        satellites.forEach((satellite) => setSatellitePosition(satellite, time));
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
      targetX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.54;
      targetY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.86;
      start();
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const step = 0.18;
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
      scrollTurn = progress * 0.2;
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
