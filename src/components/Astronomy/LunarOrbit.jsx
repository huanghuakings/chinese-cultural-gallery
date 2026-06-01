import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ==================== TEXTURE HELPERS ====================
function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  // Ocean
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 256);
  oceanGrad.addColorStop(0, '#1a5588'); oceanGrad.addColorStop(0.3, '#2277bb');
  oceanGrad.addColorStop(0.5, '#3388cc'); oceanGrad.addColorStop(0.7, '#2277bb');
  oceanGrad.addColorStop(1, '#1a5588');
  ctx.fillStyle = oceanGrad; ctx.fillRect(0, 0, 512, 256);
  // Continents
  const continents = [
    { x: 100, y: 60, rx: 60, ry: 40 }, { x: 180, y: 50, rx: 80, ry: 50 },
    { x: 380, y: 80, rx: 40, ry: 35 }, { x: 400, y: 160, rx: 20, ry: 30 },
    { x: 260, y: 200, rx: 30, ry: 20 }, { x: 450, y: 50, rx: 15, ry: 25 },
  ];
  continents.forEach(c => {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.rx, c.ry, Math.random() * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${80+Math.random()*60},${140+Math.random()*60},${60+Math.random()*40},0.7)`;
    ctx.fill();
  });
  // Clouds
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 12 + 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.1})`;
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createMoonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  // Base gray
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, 256, 128);
  // Craters
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 128;
    const r = Math.random() * 6 + 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.random()>0.5?60:100},${Math.random()>0.5?60:100},${Math.random()>0.5?60:100},0.3)`;
    ctx.fill();
    // Crater rim highlight
    ctx.beginPath(); ctx.arc(x - r*0.2, y - r*0.2, r * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(140,140,140,0.15)`;
    ctx.fill();
  }
  // Maria (dark patches)
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random()*256, Math.random()*128, Math.random()*25+10, Math.random()*15+5, Math.random()*0.5, 0, Math.PI*2);
    ctx.fillStyle = `rgba(60,60,70,${0.2+Math.random()*0.15})`;
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000008';
  ctx.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const r = Math.random() * 1.5 + 0.3;
    const b = 0.3 + Math.random() * 0.7;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    const hue = Math.random();
    if (hue < 0.1) ctx.fillStyle = `rgba(150,170,255,${b})`;
    else if (hue < 0.2) ctx.fillStyle = `rgba(255,220,180,${b})`;
    else ctx.fillStyle = `rgba(255,255,255,${b})`;
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// ==================== MAIN COMPONENT ====================
export default function LunarOrbit() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const moonGroupRef = useRef(null);
  const earthMeshRef = useRef(null);
  const moonMeshRef = useRef(null);
  const orbitLineRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animFrameRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(1);

  const [isPaused, setIsPaused] = useState(false);
  const [speedLabel, setSpeedLabel] = useState('1.0x');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 5, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 3);
    sunLight.position.set(10, 8, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);

    // Hemisphere light for subtle fill
    const hemiLight = new THREE.HemisphereLight(0x4466aa, 0x222211, 0.3);
    scene.add(hemiLight);

    // Starfield background (sphere)
    const starTex = createStarTexture();
    const starSphere = new THREE.Mesh(
      new THREE.SphereGeometry(200, 32, 32),
      new THREE.MeshBasicMaterial({ map: starTex, side: THREE.BackSide, depthWrite: false })
    );
    scene.add(starSphere);

    // Earth
    const earthGeo = new THREE.SphereGeometry(2, 64, 64);
    const earthTex = createEarthTexture();
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.6,
      metalness: 0.05,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);
    earthMeshRef.current = earth;

    // Earth atmosphere glow
    const atmosGeo = new THREE.SphereGeometry(2.08, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x4488ff) },
      },
      vertexShader: `varying vec3 vNormal; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mvPosition; vNormal=normalize(normalMatrix*normal); }`,
      fragmentShader: `varying vec3 vNormal; uniform vec3 uColor; void main(){ float intensity=pow(0.55-dot(vNormal,vec3(0.0,0.0,1.0)),3.0); gl_FragColor=vec4(uColor,intensity*0.4); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.FrontSide,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphere);

    // Orbit path (ellipse)
    const orbitPoints = [];
    const orbitA = 6;  // semi-major axis
    const orbitB = 4.5; // semi-minor axis (tilted view)
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(
        orbitA * Math.cos(theta),
        0,
        orbitB * Math.sin(theta)
      ));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.25,
      linewidth: 1,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = 0.3; // slight tilt
    scene.add(orbitLine);
    orbitLineRef.current = orbitLine;

    // Moon group (for orbit)
    const moonGroup = new THREE.Group();
    moonGroup.rotation.x = 0.3;
    scene.add(moonGroup);
    moonGroupRef.current = moonGroup;

    // Moon
    const moonGeo = new THREE.SphereGeometry(0.54, 48, 48);
    const moonTex = createMoonTexture();
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      roughness: 0.8,
      metalness: 0.0,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.x = 6;
    moon.castShadow = true;
    moon.receiveShadow = true;
    moonGroup.add(moon);
    moonMeshRef.current = moon;

    // Animation
    function animate(timestamp) {
      animFrameRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clockRef.current.getDelta(), 0.1);
      const t = timestamp * 0.001;

      controls.update();

      if (!pausedRef.current) {
        // Moon orbits
        moonGroup.rotation.y += 0.5 * speedRef.current * dt;
        // Earth slow rotation
        earth.rotation.y += 0.05 * speedRef.current * dt;
        // Atmosphere pulse
        atmosphere.material.uniforms.uTime.value = t;
      }

      renderer.render(scene, camera);
    }
    animate(0);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Keyboard
    const handleKey = (e) => {
      switch(e.key.toLowerCase()) {
        case ' ': e.preventDefault(); pausedRef.current = !pausedRef.current; setIsPaused(pausedRef.current); break;
        case 'r': speedRef.current = 1; setSpeedLabel('1.0x'); break;
        case 'f': controls.target.set(0,0,0); camera.position.set(8,5,12); controls.update(); break;
      }
    };
    window.addEventListener('keydown', handleKey);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKey);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const togglePause = useCallback(() => { pausedRef.current = !pausedRef.current; setIsPaused(pausedRef.current); }, []);
  const slowDown = useCallback(() => { speedRef.current = Math.max(0.1, speedRef.current * 0.5); setSpeedLabel(speedRef.current.toFixed(1) + 'x'); }, []);
  const speedUp = useCallback(() => { speedRef.current = Math.min(10, speedRef.current * 2); setSpeedLabel(speedRef.current.toFixed(1) + 'x'); }, []);
  const resetAll = useCallback(() => {
    speedRef.current = 1; setSpeedLabel('1.0x');
    if (controlsRef.current && cameraRef.current) { controlsRef.current.target.set(0,0,0); camera.position.set(8,5,12); controlsRef.current.update(); }
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#000008' }} />
      <div style={hudStyle}>
        <div style={{ fontSize: 20, color: 'rgba(200,210,255,0.85)', letterSpacing: 8, fontWeight: 300, textShadow: '0 0 25px rgba(100,150,255,0.4)' }}>
          🌙 月球绕地轨道
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', fontSize: 12, color: 'rgba(200,210,255,0.3)', letterSpacing: 3, zIndex: 10 }}>
        🖱 拖拽旋转 · 滚轮缩放 · 右键平移
      </div>
      <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={togglePause} style={btnStyle}>{isPaused ? '▶ 播放' : '⏸ 暂停'}</button>
        <button onClick={slowDown} style={btnStyle}>🐢 减速</button>
        <button onClick={speedUp} style={btnStyle}>🐇 加速</button>
        <button onClick={resetAll} style={btnStyle}>🔄 重置</button>
        <span style={{ color: 'rgba(200,220,255,0.45)', fontSize: 12, letterSpacing: 2, marginLeft: 6 }}>{speedLabel}</span>
      </div>
    </>
  );
}

const hudStyle = {
  position: 'fixed', zIndex: 10, pointerEvents: 'none', top: 24, left: '50%', transform: 'translateX(-50%)', textAlign: 'center',
};

const btnStyle = {
  background: 'rgba(100,150,255,0.08)',
  border: '1px solid rgba(100,150,255,0.18)',
  color: 'rgba(200,220,255,0.8)',
  padding: '8px 20px',
  borderRadius: 24,
  cursor: 'pointer',
  fontSize: 13,
  letterSpacing: 1,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s',
  fontFamily: 'inherit',
};
