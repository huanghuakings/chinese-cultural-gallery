import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ==================== PLANET DATA ====================
const PLANET_DATA = [
  { name: '水星', nameCN: 'Mercury', color: 0xb5b5b5, size: 0.38, orbit: 8,  speed: 4.15, ring: false, tilt: 0.03 },
  { name: '金星', nameCN: 'Venus',   color: 0xe8c080, size: 0.95, orbit: 12, speed: 1.62, ring: false, tilt: 2.64 },
  { name: '地球', nameCN: 'Earth',   color: 0x4488cc, size: 1.0,  orbit: 16, speed: 1.0,  ring: false, tilt: 0.41, hasMoon: true },
  { name: '火星', nameCN: 'Mars',    color: 0xcc4422, size: 0.53, orbit: 21, speed: 0.53, ring: false, tilt: 0.44 },
  { name: '木星', nameCN: 'Jupiter', color: 0xd4a060, size: 3.5,  orbit: 30, speed: 0.084, ring: false, tilt: 0.05, hasBands: true },
  { name: '土星', nameCN: 'Saturn',  color: 0xe8d0a0, size: 2.9,  orbit: 39, speed: 0.034, ring: true,  tilt: 0.47 },
  { name: '天王星', nameCN: 'Uranus', color: 0x90c8e0, size: 2.0,  orbit: 49, speed: 0.012, ring: false, tilt: 1.71 },
  { name: '海王星', nameCN: 'Neptune',color: 0x4060d0, size: 1.9,  orbit: 57, speed: 0.006, ring: false, tilt: 0.49 },
];

// ==================== TEXTURE HELPERS ====================
function createPlanetTexture(baseColor, hasBands = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#' + baseColor.toString(16).padStart(6, '0');
  ctx.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 256, y = Math.random() * 128, r = Math.random() * 8 + 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},${Math.random()>0.5?255:0},0.08)`;
    ctx.fill();
  }
  if (hasBands) {
    for (let y = 0; y < 128; y += 8 + Math.random() * 8) {
      ctx.fillStyle = `rgba(${Math.random()>0.5?255:180},${120+Math.random()*80},${Math.random()*60},${0.05+Math.random()*0.15})`;
      ctx.fillRect(0, y, 256, 6 + Math.random() * 4);
    }
  }
  return new THREE.CanvasTexture(canvas);
}

function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 256);
  oceanGrad.addColorStop(0, '#1a5588'); oceanGrad.addColorStop(0.3, '#2277bb');
  oceanGrad.addColorStop(0.5, '#3388cc'); oceanGrad.addColorStop(0.7, '#2277bb');
  oceanGrad.addColorStop(1, '#1a5588');
  ctx.fillStyle = oceanGrad; ctx.fillRect(0, 0, 512, 256);
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
    ctx.beginPath();
    ctx.ellipse(c.x + (Math.random()-0.5)*30, c.y + (Math.random()-0.5)*20, c.rx*0.6, c.ry*0.6, 0, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${60+Math.random()*60},${120+Math.random()*50},${40+Math.random()*40},0.5)`;
    ctx.fill();
  });
  for (let i = 0; i < 100; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 15 + 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.12})`;
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createSunTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#fff8c0'); grad.addColorStop(0.2, '#ffcc00');
  grad.addColorStop(0.4, '#ff9900'); grad.addColorStop(0.6, '#ff6600');
  grad.addColorStop(0.8, '#ff4400'); grad.addColorStop(1, '#cc2200');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 20 + 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${180+Math.random()*75},${Math.random()*50},${0.15+Math.random()*0.2})`;
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// ==================== MAIN COMPONENT ====================
export default function SolarSystem3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const planetsRef = useRef([]);
  const sunRef = useRef(null);
  const sunMatRef = useRef(null);
  const sunLightRef = useRef(null);
  const starsRef = useRef(null);
  const glowMeshesRef = useRef([]);
  const clockRef = useRef(new THREE.Clock());
  const animFrameRef = useRef(0);
  const pausedRef = useRef(false);
  const speedRef = useRef(1);
  const baseSpeeds = PLANET_DATA.map(d => d.speed);

  const [isPaused, setIsPaused] = useState(false);
  const [speedLabel, setSpeedLabel] = useState('1.0x');

  // Initialize scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 60, 100);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 8;
    controls.maxDistance = 300;
    controls.target.set(0, 0, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.15;
    controls.update();
    controlsRef.current = controls;

    // Lighting
    const sunLight = new THREE.PointLight(0xfffde0, 80, 200, 0.5);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    const ambientLight = new THREE.AmbientLight(0x111122, 0.4);
    scene.add(ambientLight);

    // Starfield
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 4000;
    const starPositions = new Float32Array(starCount * 3);
    const starColorsArr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 200 + Math.random() * 400;
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
      const ct = Math.random();
      if (ct < 0.1) { starColorsArr[i*3]=0.7; starColorsArr[i*3+1]=0.8; starColorsArr[i*3+2]=1.0; }
      else if (ct < 0.2) { starColorsArr[i*3]=1.0; starColorsArr[i*3+1]=0.85; starColorsArr[i*3+2]=0.6; }
      else { const b = 0.7 + Math.random() * 0.3; starColorsArr[i*3]=b; starColorsArr[i*3+1]=b; starColorsArr[i*3+2]=b; }
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColorsArr, 3));
    const starsMat = new THREE.PointsMaterial({ size: 0.4, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);
    starsRef.current = stars;

    // Sun
    const sunTex = createSunTexture();
    const sunMat = new THREE.MeshStandardMaterial({ map: sunTex, emissive: new THREE.Color('#ff8800'), emissiveIntensity: 2.5, roughness: 0.6 });
    sunMatRef.current = sunMat;
    const sunGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);
    sunRef.current = sun;

    // Sun glow
    const glowMeshes = [];
    for (let i = 0; i < 3; i++) {
      const glowGeo = new THREE.SphereGeometry(3.5 + i * 1.2, 32, 32);
      const glowMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color().setHSL(0.12, 1, 0.5 + i * 0.15) } },
        vertexShader: `varying vec3 vNormal; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mvPosition; vNormal=normalize(normalMatrix*normal); }`,
        fragmentShader: `varying vec3 vNormal; uniform float uTime; uniform vec3 uColor; void main(){ float intensity=pow(0.65-dot(vNormal,vec3(0.0,0.0,1.0)),3.0); gl_FragColor=vec4(uColor,intensity*0.25); }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glow);
      glowMeshes.push(glow);
    }
    glowMeshesRef.current = glowMeshes;

    // Orbit rings & planets
    const planets = [];
    PLANET_DATA.forEach((data, index) => {
      // Orbit ring
      const orbitGeo = new THREE.TorusGeometry(data.orbit, 0.03, 8, 128);
      const orbitMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, depthWrite: false });
      const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
      orbitMesh.rotation.x = Math.PI / 2;
      scene.add(orbitMesh);

      // Planet group
      const group = new THREE.Group();
      scene.add(group);

      const texture = data.name === '地球' ? createEarthTexture() : createPlanetTexture(data.color, data.hasBands);
      const planetMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7, metalness: 0.05 });
      const planetGeo = new THREE.SphereGeometry(data.size, 48, 48);
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.position.x = data.orbit;
      planetMesh.castShadow = true;
      planetMesh.receiveShadow = true;
      planetMesh.name = data.name;
      group.add(planetMesh);
      group.rotation.z = data.tilt;

      // Saturn ring
      let ringMesh = null;
      if (data.ring) {
        const ringGeo = new THREE.TorusGeometry(data.size * 1.5, data.size * 0.25, 32, 80);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4b070, roughness: 0.5, metalness: 0.1, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.47;
        planetMesh.add(ringMesh);
      }

      // Moon
      let moonOrbit = null, moonMesh = null;
      if (data.hasMoon) {
        moonOrbit = new THREE.Group();
        planetMesh.add(moonOrbit);
        const mGeo = new THREE.SphereGeometry(0.27, 24, 24);
        const mMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.8 });
        moonMesh = new THREE.Mesh(mGeo, mMat);
        moonMesh.position.x = 2.2;
        moonOrbit.add(moonMesh);
      }

      planets.push({ group, mesh: planetMesh, speed: data.speed, moonOrbit, moonMesh });
    });
    planetsRef.current = planets;

    // Animation loop
    function animate(timestamp) {
      animFrameRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clockRef.current.getDelta(), 0.1);
      const t = timestamp * 0.001;
      controls.update();

      if (!pausedRef.current) {
        planets.forEach((p, i) => {
          p.group.rotation.y += baseSpeeds[i] * speedRef.current * dt * 2;
        });
        const earthPlanet = planets[2];
        if (earthPlanet.moonOrbit) {
          earthPlanet.moonOrbit.rotation.y += 2.5 * speedRef.current * dt;
        }
        sun.rotation.y += 0.1 * dt;
        const pulse = 1 + Math.sin(t * 1.5) * 0.15;
        if (sunMatRef.current) sunMatRef.current.emissiveIntensity = 2.5 * pulse;
        if (sunLightRef.current) sunLightRef.current.intensity = 80 * pulse;
      }

      glowMeshesRef.current.forEach(g => { g.material.uniforms.uTime.value = t; });
      stars.rotation.y += 0.01 * dt;
      stars.rotation.x += 0.003 * dt;
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

    // Click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tooltip = document.createElement('div');
    tooltip.style.cssText = 'position:fixed;pointer-events:none;z-index:20;color:#fff;font-size:13px;letter-spacing:2px;text-shadow:0 0 10px rgba(0,0,0,0.8);opacity:0;transition:opacity 0.2s;transform:translate(-50%,-50%);white-space:nowrap;';
    document.body.appendChild(tooltip);

    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const planetMeshes = planets.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(planetMeshes);
      if (intersects.length > 0) {
        const name = intersects[0].object.name;
        const data = PLANET_DATA.find(d => d.name === name);
        if (data) {
          tooltip.textContent = data.name + (data.nameCN ? ` (${data.nameCN})` : '');
          tooltip.style.left = event.clientX + 'px';
          tooltip.style.top = (event.clientY - 30) + 'px';
          tooltip.style.opacity = '1';
          setTimeout(() => { tooltip.style.opacity = '0'; }, 1500);
          const pos = intersects[0].object.getWorldPosition(new THREE.Vector3());
          controls.target.copy(pos);
        }
      }
    };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
      renderer.domElement.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
    };
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // Keyboard
    const handleKey = (e) => {
      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          pausedRef.current = !pausedRef.current;
          setIsPaused(pausedRef.current);
          break;
        case 'r':
          speedRef.current = 1;
          setSpeedLabel('1.0x');
          break;
        case 'f':
          controls.target.set(0, 0, 0);
          camera.position.set(0, 60, 100);
          controls.update();
          break;
      }
    };
    window.addEventListener('keydown', handleKey);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKey);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Control handlers
  const togglePause = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
  }, []);

  const slowDown = useCallback(() => {
    speedRef.current = Math.max(0.1, speedRef.current * 0.5);
    setSpeedLabel(speedRef.current.toFixed(1) + 'x');
  }, []);

  const speedUp = useCallback(() => {
    speedRef.current = Math.min(10, speedRef.current * 2);
    setSpeedLabel(speedRef.current.toFixed(1) + 'x');
  }, []);

  const resetSpeed = useCallback(() => {
    speedRef.current = 1;
    setSpeedLabel('1.0x');
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      cameraRef.current.position.set(0, 60, 100);
      controlsRef.current.update();
    }
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#000008' }} />
      <div style={{ position: 'fixed', zIndex: 10, pointerEvents: 'none', top: 24, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)', letterSpacing: 8, fontWeight: 300, textShadow: '0 0 30px rgba(180,160,100,0.4)' }}>
          ☀ 太 阳 系
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: 3, zIndex: 10 }}>
        🖱 拖拽旋转 · 滚轮缩放 · 右键平移 · 点击行星查看
      </div>
      <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={togglePause} style={btnStyle}>{isPaused ? '▶ 播放' : '⏸ 暂停'}</button>
        <button onClick={slowDown} style={btnStyle}>🐢 减速</button>
        <button onClick={speedUp} style={btnStyle}>🐇 加速</button>
        <button onClick={resetSpeed} style={btnStyle}>🔄 重置</button>
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: 2, marginLeft: 6 }}>{speedLabel}</span>
      </div>
    </>
  );
}

const btnStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.75)',
  padding: '8px 20px',
  borderRadius: 24,
  cursor: 'pointer',
  fontSize: 13,
  letterSpacing: 1,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s',
  fontFamily: 'inherit',
};
