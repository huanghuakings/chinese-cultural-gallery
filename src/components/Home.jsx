import './Home.css';
import '../components/ui/Card.css';
import { TileCard } from '../components/ui/Card';
import { useHomeCategories } from '../hooks/useData';

export default function Home() {
  const { data: categories, isLoading } = useHomeCategories();

  if (isLoading) {
    return (
      <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="seal" style={{ width: 140, height: 140, fontSize: 28, letterSpacing: 8, margin: '0 auto 24px' }}>
            华夏文化画廊
          </div>
          <h1 className="home-title">华夏文化画廊</h1>
          <p style={{ color: '#8a8278', fontSize: '1.1rem', letterSpacing: 4 }}>
            集天文动画 · 历史人物 · 网文宇宙于一体的文化展示平台
          </p>
        </div>
      </section>

      {/* Category sections */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {(categories || []).map((cat, ci) => (
          <section key={cat.title} style={{ marginBottom: ci < categories.length - 1 ? '3.5rem' : 0 }}>
            <div style={{
              marginBottom: '1.5rem', paddingBottom: 16,
              borderBottom: `1px solid ${cat.border}`,
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>{cat.emoji}</span>
              <h2 style={{
                fontFamily: "'ZCOOL XiaoWei', serif", fontSize: '1.5rem',
                color: cat.color, margin: '0 0 6px', letterSpacing: 6,
              }}>{cat.title}</h2>
              <p style={{ color: '#6a6268', fontSize: '0.82rem', margin: 0, letterSpacing: 2 }}>{cat.desc}</p>
            </div>
            <div className="cp-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {cat.cards.map((card, i) => (
                <TileCard
                  key={card.title}
                  emoji={card.emoji}
                  title={card.title}
                  desc={card.desc}
                  to={card.route}
                  color={cat.color}
                  gradient={cat.gradient}
                  border={cat.border}
                  index={i}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center', padding: '2.5rem 2rem', color: '#5a5260',
        fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        华夏文化画廊 · 不知先生 · 西安
      </footer>
    </>
  );
}
