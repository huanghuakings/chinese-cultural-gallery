import './ChineseHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useHeroines } from '../../hooks/useData';

export default function ChineseHeroines() {
  const { data: heroines, isLoading } = useHeroines();
  if (isLoading) return <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="hs-page" style={{ '--hs-accent': '#a03030', '--hs-accent-alpha': 'rgba(160,48,48,0.3)', '--hs-hero-glow': 'rgba(160,48,48,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">华夏巾帼</div>
          <h1>华夏巾帼</h1>
          <p className="hs-sub">谁说女子不如男 · 万里山河有女儿</p>
          <div className="hs-verse">
            <p>"万里赴戎机，关山度若飞"</p>
            <p>"生当作人杰，死亦为鬼雄"</p>
          </div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">巾帼英杰</h2>
        <p className="hs-sec-sub">忠勇才情 · 万世流芳</p>
        <CardGrid>{(heroines || []).map((h, i) => <Card key={h.name} card={h} color={h.color} index={i} />)}</CardGrid>
      </section>
      <footer className="hs-footer"><p>华夏巾帼 —— 从花木兰到武则天，无数女子以忠勇才情书写了中华民族的另一半史诗。</p></footer>
    </div>
  );
}
