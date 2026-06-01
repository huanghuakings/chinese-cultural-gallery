import './WebNovelHome.css';
import { Link } from 'react-router-dom';
import { useWebNovelCategories } from '../../hooks/useData';

export default function WebNovelHome() {
  const { data: categories, isLoading } = useWebNovelCategories();

  if (isLoading) {
    return (
      <div className="wn-page">
        <div className="wn-section" style={{ textAlign: 'center', padding: '3rem', color: '#8a8278' }}>
          加载中...
        </div>
      </div>
    );
  }

  return (
    <div className="wn-page">
      <section className="wn-hero">
        <div className="wn-bg-stars" />
        <div className="wn-content">
          <div className="wn-seal">网文</div>
          <h1>网文宇宙</h1>
          <p className="wn-sub">执笔千万字 · 构建诸天万界</p>
          <div className="wn-verse">
            <p>"一粒尘可填海，一根草斩尽日月星辰"</p>
            <p>"天不生我李淳罡，剑道万古如长夜"</p>
            <p>"三十年河东，三十年河西，莫欺少年穷"</p>
          </div>
        </div>
      </section>

      <section className="wn-section">
        <h2 className="wn-sec-title">作家宇宙</h2>
        <p className="wn-sec-sub">一位作者 · 一个世界 · 万千传奇</p>
        <div className="wn-grid">
          {(categories || []).map((c, i) => (
            <Link
              key={c.title}
              to={c.route}
              className="wn-card"
              style={{ animationDelay: `${i * 0.1}s`, borderTopColor: c.color, textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="wn-card-top">
                <span className="wn-emoji">{c.emoji}</span>
                <div className="wn-header">
                  <h3>{c.title}</h3>
                </div>
              </div>
              <p className="wn-intro">{c.desc}</p>
              {c.works && c.works.length > 0 && (
                <div className="wn-sub-links">
                  {c.works.map(w => (
                    <span key={w.label} className="wn-sub-link">{w.label}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <footer className="wn-footer">
        <p>网文宇宙 —— 从辰东的诸天万界到烽火的江湖庙堂，网络文学构建了中国独有的幻想世界。</p>
      </footer>
    </div>
  );
}
