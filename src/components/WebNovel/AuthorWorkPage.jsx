import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AuthorWorkPage.css';
import { useAuthorData } from '../../hooks/useData';

export default function AuthorWorkPage() {
  const { authorId } = useParams();
  const { data: author, isLoading } = useAuthorData(authorId);
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('div');
      s.className = 'aw-star';
      const size = 1 + Math.random() * 2;
      s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 3}s;`;
      bg.appendChild(s);
    }
  }, []);

  if (isLoading || !author) {
    return (
      <div className="aw-page">
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8278', fontSize: '1.1rem' }}>
          加载中...
        </div>
      </div>
    );
  }

  const accentColor = author.color || '#c9a84c';

  return (
    <div className="aw-page">
      <div className="aw-bg" ref={bgRef} />

      {/* 导航 */}
      <nav className="aw-nav">
        <Link to="/webnovel" className="aw-nav-back">← 网文宇宙</Link>
        <div className="aw-nav-brand">{author.name}</div>
      </nav>

      {/* Hero */}
      <section className="aw-hero">
        <div className="aw-hero-content">
          <div className="aw-seal" style={{ borderColor: accentColor, color: accentColor }}>
            {author.emoji}
          </div>
          <h1>{author.name}</h1>
          <p className="aw-sub">{author.title}</p>
          <div className="aw-verse">
            <p>"{author.quote}"</p>
          </div>
        </div>
      </section>

      {/* 作者简介 */}
      <section className="aw-section aw-intro-section">
        <div className="aw-bio-card" style={{ borderTopColor: accentColor }}>
          <div className="aw-bio-header">
            <span className="aw-bio-emoji">{author.emoji}</span>
            <div>
              <h2>{author.name}</h2>
              {author.realName && <span className="aw-real-name">本名：{author.realName}</span>}
            </div>
          </div>
          <p className="aw-bio-text">{author.bio}</p>
          <div className="aw-meta-row">
            <div className="aw-meta-item">
              <span className="aw-meta-label">代表作</span>
              <span className="aw-meta-value">{author.works.length} 部</span>
            </div>
            <div className="aw-meta-item">
              <span className="aw-meta-label">影响力</span>
              <span className="aw-meta-value">{author.influence}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 作品列表 */}
      <section className="aw-section">
        <h2 className="aw-sec-title">作品宇宙</h2>
        <p className="aw-sec-sub">{author.name} · {author.works.length}部作品 · 万千世界</p>
        <div className="aw-works-grid">
          {author.works.map((w, i) => (
            <Link
              to={`/webnovel/author/${authorId}/${w.id}`}
              key={w.id}
              className="aw-work-card"
              style={{ animationDelay: `${i * 0.06}s`, borderTopColor: w.color || accentColor, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="aw-work-top" style={{ background: w.color || accentColor }} />
              <div className="aw-work-header">
                <span className="aw-work-title">{w.emoji} {w.title}</span>
                <span className="aw-work-year">{w.year}</span>
              </div>
              <p className="aw-work-desc">{w.desc}</p>
              <div className="aw-work-hero-block">
                <div className="aw-work-hero-av" style={{ borderColor: w.color || accentColor }}>
                  {w.hero.name[0]}
                </div>
                <div className="aw-work-hero-info">
                  <h4>{w.hero.name}</h4>
                  <span className="aw-work-hero-title">{w.hero.title}</span>
                  <p>{w.hero.desc}</p>
                </div>
              </div>
              <div className="aw-work-heroines">
                <span className="aw-work-heroines-label">女主角</span>
                <div className="aw-work-tags">
                  {w.heroines.map(h => (
                    <span key={h} className="aw-work-tag">{h}</span>
                  ))}
                </div>
              </div>
              <div className="aw-work-quote">
                <p>"{w.quote}"</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 创作时间线（仅辰东等有 timeline 的作者） */}
      {author.timeline && author.timeline.length > 0 && (
        <section className="aw-section">
          <h2 className="aw-sec-title">创作纪元</h2>
          <p className="aw-sec-sub">二十年笔耕不辍 · 铸就传奇</p>
          <div className="aw-timeline">
            {author.timeline.map((item, i) => (
              <div className="aw-tl-item" key={item.y} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="aw-tl-year" style={{ color: accentColor }}>{item.y}</div>
                <div className="aw-tl-content">
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="aw-footer">
        <span className="aw-footer-brand" style={{ color: accentColor }}>{author.name}</span>
        <p>{author.name} · {author.works.length}部作品 · 万千世界由此而生</p>
      </footer>
    </div>
  );
}
