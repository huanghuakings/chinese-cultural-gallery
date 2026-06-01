import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ChendongUniverse.css';
import { useChendongData, useChendongMeta } from '../../hooks/useData';

export default function ChendongUniverse() {
  const { data: works, isLoading: loadingWorks } = useChendongData();
  const { data: meta, isLoading: loadingMeta } = useChendongMeta();

  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = 1 + Math.random() * 2;
      s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;`;
      bg.appendChild(s);
    }
  }, []);

  if (loadingWorks || loadingMeta || !works || !meta) {
    return (
      <div className="chendong-universe">
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8278', fontSize: '1.1rem' }}>
          加载中...
        </div>
      </div>
    );
  }

  const { timeline, starColors } = meta;

  return (
    <div className="chendong-universe">
      <div id="bg" ref={bgRef} />

      <nav className="chd-nav">
        <div className="chd-nav-brand">辰东宇宙</div>
        <div className="chd-nav-links">
          <a href="#chd-works">作品宇宙</a>
          <a href="#chd-timeline">创作纪元</a>
        </div>
      </nav>

      <section className="chd-hero">
        <h1>辰东宇宙</h1>
        <p className="chd-subtitle">DARK EPOCH OF CHEN DONG</p>
        <div className="chd-verse">
          <p>"登天路，踏歌行，弹指遮天"</p>
          <p>"一粒尘可填海，一根草斩尽日月星辰"</p>
          <p>"待到阴阳逆乱时，以我魔血染青天"</p>
        </div>
      </section>

      <section className="chd-content" id="chd-works">
        <h2 className="chd-sec-title">作品宇宙</h2>
        <p className="chd-sec-sub">八荒六合 · 诸天万界 · 众生皆在道中</p>
        <div className="chd-works-grid">
          {works.map((w, i) => (
            <div className="chd-work-card" data-w={w.title} key={w.title} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="chd-top-bar" style={{ background: starColors[w.title] || '#c9a84c' }} />
              <div className="chd-book-header">
                <span className="chd-book-title">{w.emoji} {w.title}</span>
                <span className="chd-book-year">{w.year}</span>
              </div>
              <div className="chd-char-block">
                <h4>男主角</h4>
                <div className="chd-protag">
                  <div className="chd-av">{w.hero.name[0]}</div>
                  <div className="chd-info">
                    <h5>{w.hero.name}</h5>
                    <div className="chd-t">{w.hero.title}</div>
                    <p>{w.hero.desc}</p>
                  </div>
                </div>
              </div>
              <div className="chd-char-block">
                <h4>女主角</h4>
                <div className="chd-tags">
                  {w.heroines.map(h => <span className="chd-tag" key={h}>{h}</span>)}
                </div>
              </div>
              <div className="chd-quote-box">
                <p>{w.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="chd-content" id="chd-timeline">
        <h2 className="chd-sec-title">创作纪元</h2>
        <p className="chd-sec-sub">二十年笔耕不辍 · 八部作品铸就传奇</p>
        <div className="chd-timeline">
          {timeline.map((item, i) => (
            <div className="chd-tl-item" key={item.y} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="chd-tl-year">{item.y}</div>
              <div className="chd-tl-content">
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="chd-footer">
        <span className="chd-footer-b">辰东宇宙</span>
        <p>辰东，本名杨振东，起点中文网白金作家，中国作家协会会员</p>
        <p style={{ marginTop: '8px' }}>《不死不灭》《神墓》《长生界》《遮天》《完美世界》《圣墟》《深空彼岸》《夜无疆》</p>
      </footer>
    </div>
  );
}
