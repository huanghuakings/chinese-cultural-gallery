import './PerfectWorldHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { usePerfectWorldHeroines } from '../../hooks/useData';

export default function PerfectWorldHeroines() {
  const { data: heroines, isLoading } = usePerfectWorldHeroines();
  if (isLoading) return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="pwh-page">
      <section className="pwh-hero"><div className="pwh-bg-stars" /><div className="pwh-content">
        <div className="pwh-seal">完美世界</div>
        <h1>完美世界·女主角群芳</h1>
        <p className="pwh-sub">谁在称无敌，哪个敢言不败？</p>
        <div className="pwh-verse"><p>"独断万古，终平定黑暗动乱"</p></div>
      </div></section>
      <section className="pwh-section">
        <h2 className="pwh-sec-title">完美世界女杰</h2>
        <p className="pwh-sec-sub">荒天帝红颜 · 仙古遗梦 · 独断万古</p>
        <CardGrid>{(heroines || []).map((h, i) => <Card key={h.name} card={h} color={h.color} index={i} />)}</CardGrid>
      </section>
      <footer className="pwh-footer"><span className="pwh-footer-b">完美世界</span><p>《完美世界》—— 辰东著，2013-2016年连载。</p></footer>
    </div>
  );
}
