import './XiyoujiHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useXiyoujiHeroines } from '../../hooks/useData';

export default function XiyoujiHeroines() {
  const { data: heroines, isLoading } = useXiyoujiHeroines();
  if (isLoading) return <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="hs-page" style={{ '--hs-accent': '#8b5cf6', '--hs-accent-alpha': 'rgba(139,92,246,0.3)', '--hs-hero-glow': 'rgba(139,92,246,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">西游女杰</div>
          <h1>西游记女杰谱</h1>
          <p className="hs-sub">西天路上 · 女儿百态 · 万般情劫</p>
          <div className="hs-verse">
            <p>"千处祈求千处应，苦海常作度人舟"</p>
            <p>"踏平坎坷成大道，斗罢艰险又出发"</p>
          </div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">西天女杰</h2>
        <p className="hs-sec-sub">正果女神 · 洞府妖仙 · 劫难女儿</p>
        <CardGrid>
          {(heroines || []).map((h, i) => (
            <Card key={h.name} card={h} color={h.color} index={i} />
          ))}
        </CardGrid>
      </section>
      <footer className="hs-footer"><p>西游记女杰谱 —— 从观音菩萨到白骨精，西天路上的女儿们演绎了万千情劫。</p></footer>
    </div>
  );
}
