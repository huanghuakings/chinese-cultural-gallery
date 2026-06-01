import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AuthorDetailPage.css';
import { useAuthorDetail } from '../../hooks/useData';

export default function AuthorDetailPage() {
  const { authorId } = useParams();
  const { data: author, isLoading } = useAuthorDetail(authorId);
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('div');
      s.className = 'ad-star';
      const size = 1 + Math.random() * 2;
      s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()* 3}s;`;
      bg.appendChild(s);
    }
  }, []);

  if (isLoading || !author) {
    return (
      <div className="ad-page">
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8278' }}>加载中...</div>
      </div>
    );
  }

  const accent = author.color || '#5a7a6a';
  const lifeSpan = author.deathYear
    ? `${author.birthYear} — ${author.deathYear}`
    : `${author.birthYear} — 至今`;

  // 按年份排序作品
  const sortedWorks = [...(author.works || [])].sort((a, b) => a.year - b.year);

  return (
    <div className="ad-page">
      <div className="ad-bg" ref={bgRef} />

      {/* 导航 */}
      <nav className="ad-nav">
        <Link to="/authors" className="ad-nav-back">← 作家谱</Link>
        <div className="ad-nav-brand">{author.name}</div>
      </nav>

      {/* Hero */}
      <section className="ad-hero" style={{ background: `linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(18,15,26,0.9) 100%), radial-gradient(ellipse at center, ${accent}18 0%, transparent 70%)` }}>
        <div className="ad-hero-content">
          <div className="ad-seal" style={{ borderColor: accent, color: accent }}>
            {author.emoji}
          </div>
          <h1>{author.name}</h1>
          <p className="ad-sub">{author.title}</p>
          <div className="ad-life">{lifeSpan}</div>
          <div className="ad-verse">
            <p>"{author.quote}"</p>
          </div>
        </div>
      </section>

      {/* 作者简介 */}
      <section className="ad-section ad-intro-section">
        <div className="ad-bio-card" style={{ borderTopColor: accent }}>
          <div className="ad-bio-header">
            <span className="ad-bio-emoji">{author.emoji}</span>
            <div>
              <h2>{author.name}</h2>
              {author.realName && author.realName !== author.name && (
                <span className="ad-real-name">本名：{author.realName}</span>
              )}
              <span className="ad-life-badge">{lifeSpan}</span>
            </div>
          </div>
          <p className="ad-bio-text">{author.bio}</p>
          <div className="ad-meta-row">
            <div className="ad-meta-item">
              <span className="ad-meta-label">作品</span>
              <span className="ad-meta-value">{sortedWorks.length} 部</span>
            </div>
            <div className="ad-meta-item">
              <span className="ad-meta-label">创作时期</span>
              <span className="ad-meta-value">{sortedWorks[0]?.year} — {sortedWorks[sortedWorks.length-1]?.year}</span>
            </div>
            <div className="ad-meta-item">
              <span className="ad-meta-label">影响力</span>
              <span className="ad-meta-value">{author.influence}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 作品时间线 */}
      <section className="ad-section">
        <h2 className="ad-sec-title">作品年表</h2>
        <p className="ad-sec-sub">{author.name} · {sortedWorks.length}部作品 · 创作轨迹</p>
        <div className="ad-timeline">
          {sortedWorks.map((w, i) => (
            <div className="ad-tl-item" key={`${w.year}-${w.title}`} style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="ad-tl-year" style={{ color: accent }}>{w.year}</div>
              <div className="ad-tl-marker" style={{ background: accent, boxShadow: `0 0 8px ${accent}66` }} />
              <div className="ad-tl-content">
                <div className="ad-tl-header">
                  <h3>{w.title}</h3>
                  <span className="ad-tl-type">{w.type}</span>
                </div>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="ad-footer">
        <span className="ad-footer-brand" style={{ color: accent }}>{author.name}</span>
        <p>{lifeSpan} · {sortedWorks.length}部作品 · {author.influence}</p>
      </footer>
    </div>
  );
}
