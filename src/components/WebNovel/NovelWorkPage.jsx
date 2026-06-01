import { Link, useParams } from 'react-router-dom';
import './NovelWorkPage.css';
import { useAuthorData, useWorkHeroines } from '../../hooks/useData';

export default function NovelWorkPage() {
  const { authorId, workId } = useParams();
  const { data: author, isLoading: loadingAuthor } = useAuthorData(authorId);
  const { data: heroines, isLoading: loadingHeroines } = useWorkHeroines(authorId, workId);

  if (loadingAuthor || !author) {
    return (
      <div className="nw-page">
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8278', fontSize: '1.1rem' }}>
          加载中...
        </div>
      </div>
    );
  }

  const work = author.works.find(w => w.id === workId);
  if (!work) {
    return (
      <div className="nw-page">
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#8a8278' }}>
          作品不存在
        </div>
      </div>
    );
  }

  const accentColor = work.color || author.color || '#c9a84c';
  const isLoading = loadingAuthor || loadingHeroines;

  return (
    <div className="nw-page">
      {/* 导航 */}
      <nav className="nw-nav">
        <Link to={`/webnovel/author/${authorId}`} className="nw-nav-back">← {author.name}</Link>
        <div className="nw-nav-brand">{work.title}</div>
      </nav>

      {/* Hero */}
      <section className="nw-hero" style={{ background: `linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(18,15,26,0.9) 100%), radial-gradient(ellipse at center, ${accentColor}18 0%, transparent 70%)` }}>
        <div className="nw-hero-content">
          <div className="nw-seal" style={{ borderColor: accentColor, color: accentColor }}>
            {work.emoji}
          </div>
          <h1>{work.title}</h1>
          <p className="nw-sub">{work.year} · {author.name} 著</p>
          <div className="nw-verse">
            <p>"{work.quote}"</p>
          </div>
        </div>
      </section>

      {/* 作品简介 */}
      <section className="nw-section nw-intro-section">
        <div className="nw-desc-card" style={{ borderTopColor: accentColor }}>
          <p className="nw-desc-text">{work.desc}</p>
        </div>
      </section>

      {/* 男主角 */}
      <section className="nw-section">
        <h2 className="nw-sec-title">主角</h2>
        <p className="nw-sec-sub">{work.title} · 核心人物</p>
        <div className="nw-hero-card" style={{ borderColor: accentColor }}>
          <div className="nw-hero-av" style={{ borderColor: accentColor }}>
            {work.hero.name[0]}
          </div>
          <div className="nw-hero-info">
            <h3>{work.hero.name}</h3>
            <span className="nw-hero-title" style={{ color: accentColor }}>{work.hero.title}</span>
            <p>{work.hero.desc}</p>
          </div>
        </div>
      </section>

      {/* 女主角群芳 */}
      {heroines && heroines.length > 0 && (
        <section className="nw-section">
          <h2 className="nw-sec-title">群芳谱</h2>
          <p className="nw-sec-sub">{work.title} · {heroines.length}位佳人</p>
          <div className="nw-grid">
            {heroines.map((h, i) => (
              <div
                key={h.name}
                className="nw-card"
                style={{ animationDelay: `${i * 0.04}s`, borderTopColor: h.color || accentColor }}
              >
                <div className="nw-card-top">
                  {h.emoji && <span className="nw-emoji">{h.emoji}</span>}
                  <div className="nw-header">
                    <h3>{h.name}</h3>
                    {h.title && <span className="nw-role">{h.title}</span>}
                    {h.role && <span className="nw-role">{h.role}</span>}
                  </div>
                </div>
                {h.tags && h.tags.length > 0 && (
                  <div className="nw-tags">
                    {h.tags.map(t => <span key={t} className="nw-tag">{t}</span>)}
                  </div>
                )}
                {h.intro && <p className="nw-intro">{h.intro}</p>}
                {h.bio && <p className="nw-bio">{h.bio}</p>}
                {h.quote && <div className="nw-quote">「{h.quote}」</div>}
                {h.death && (
                  <div className="nw-detail-item">
                    <span className="nw-label">结局</span>
                    <span>{h.death}</span>
                  </div>
                )}
                {h.influence && !h.death && (
                  <div className="nw-detail-item">
                    <span className="nw-label">影响</span>
                    <span>{h.influence}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 女主角标签列表（无详细数据时展示） */}
      {(!heroines || heroines.length === 0) && work.heroines && work.heroines.length > 0 && (
        <section className="nw-section">
          <h2 className="nw-sec-title">女主角</h2>
          <p className="nw-sec-sub">{work.title} · 群芳争艳</p>
          <div className="nw-heroines-cloud">
            {work.heroines.map(h => (
              <span key={h} className="nw-heroine-badge" style={{ borderColor: accentColor }}>
                {h}
              </span>
            ))}
          </div>
        </section>
      )}

      <footer className="nw-footer">
        <span className="nw-footer-brand" style={{ color: accentColor }}>{work.title}</span>
        <p>{work.year} · {author.name} 著</p>
      </footer>
    </div>
  );
}
