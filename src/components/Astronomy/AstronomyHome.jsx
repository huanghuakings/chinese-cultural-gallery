import './AstronomyHome.css';
import '../ui/Card.css';
import { TileCard } from '../ui/Card';
import { useAstronomyItems } from '../../hooks/useData';

export default function AstronomyHome() {
  const { data: items, isLoading } = useAstronomyItems();
  if (isLoading) return <div className="ah-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="ah-page">
      <section className="ah-hero">
        <div className="ah-seal">天文动画</div>
        <h1>天文动画</h1>
        <p className="ah-sub">太阳系 · 3D 星空 · 绕月轨道 · 阿波罗登月</p>
      </section>
      <section className="ah-section">
        <div className="cp-grid">
          {(items || []).map((item, i) => (
            <TileCard key={item.title} emoji={item.emoji} title={item.title} desc={item.desc} href={item.route} color="#6496ff" border="rgba(100,150,255,0.2)" index={i} />
          ))}
        </div>
      </section>
      <footer className="ah-footer">华夏文化画廊 · 天文动画</footer>
    </div>
  );
}
