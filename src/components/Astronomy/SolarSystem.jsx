import { useState, useEffect, useRef, useCallback } from 'react';
import './SolarSystem.css';
import { usePlanetData } from '../../hooks/useData';

export default function SolarSystem() {
  const { data: planetData, isLoading } = usePlanetData();
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * 2 - 0.5,
      y: Math.random() * 2 - 0.5,
      r: Math.random() * 1.8 + 0.3,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
    let frameCount = 0;
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frameCount++;
      for (const s of stars) {
        const bx = s.brightness + 0.3 * Math.sin(frameCount * s.twinkleSpeed + s.twinkleOffset);
        const alpha = Math.max(0.1, Math.min(1, bx));
        ctx.beginPath();
        ctx.arc((s.x + 0.5) * W, (s.y + 0.5) * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() < 0.3) {
        const el = document.createElement('div');
        el.className = 'shooting-star';
        el.style.left = Math.random() * 80 + 10 + '%';
        el.style.top = Math.random() * 40 + '%';
        el.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
      }
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleSpeed = useCallback((factor) => {
    setSpeed(prev => {
      const next = factor === -1 ? 1 : Math.max(0.1, Math.min(10, prev * factor));
      for (const p of planetData || []) {
        document.querySelectorAll(`.po-${p.cls}`).forEach(el => {
          el.style.animationDuration = (p.duration / next) + 's';
        });
      }
      document.querySelectorAll('.moon-orbit').forEach(el => {
        el.style.animationDuration = (2 / next) + 's';
      });
      return next;
    });
  }, [planetData]);

  const togglePause = () => {
    setPaused(p => !p);
  };

  if (isLoading || !planetData) {
    return (
      <div style={{ background: '#000010', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  return (
    <div className="solar-page" style={{ background: '#000010', overflow: 'hidden', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 18, letterSpacing: 4, zIndex: 100, textShadow: '0 0 20px rgba(255,200,0,0.3)' }}>
        ☀ 太阳系行星运行 ☽
      </div>
      <div className="solar-system" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vmin', height: '100vmin', zIndex: 1, ...(paused ? { className: 'paused' } : {}) }}>
        <div className="sun"></div>
        {planetData.map(p => (
          <div key={`orbit-${p.cls}`} className="orbit" style={{ width: p.orbit, height: p.orbit }} />
        ))}
        {planetData.map(p => (
          <div key={p.cls} className="planet-orbit" style={{
            width: p.orbit, height: p.orbit,
            animationName: `spin-${p.cls}`,
            animationDuration: `${p.duration / speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}>
            <div className="planet" style={{
              width: p.size, height: p.size, background: p.color,
              ...(p.cls === 'mercury' ? { background: p.color } : {}),
            }} />
            {p.hasRing && <div className="saturn-ring" />}
            {p.cls === 'earth' && (
              <div className="moon-orbit">
                <div className="moon" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={togglePause}>{paused ? '▶ 播放' : '⏸ 暂停'}</button>
        <button onClick={() => handleSpeed(0.5)}>🐢 减速</button>
        <button onClick={() => handleSpeed(2)}>🐇 加速</button>
        <button onClick={() => handleSpeed(-1)}>🔄 重置</button>
        <span className="speed-label">速度: {speed.toFixed(1)}x</span>
      </div>
    </div>
  );
}
