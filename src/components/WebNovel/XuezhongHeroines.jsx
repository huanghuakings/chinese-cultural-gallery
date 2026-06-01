import './XuezhongHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useXuezhongHeroines } from '../../hooks/useData';

export default function XuezhongHeroines() {
  const { data: heroines, isLoading } = useXuezhongHeroines();
  if (isLoading) return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="xzh-page">
      <section className="xzh-hero"><div className="xzh-hero-content">
        <div className="xzh-seal">雪中红颜</div><h1>雪中悍刀行 · 红颜录</h1>
        <p className="xzh-sub">江湖夜雨十年灯 · 红颜弹指老 · 刹那芳华</p>
        <div className="xzh-verse"><p>"天不生我李淳罡，剑道万古如长夜"</p></div>
      </div></section>
      <section className="xzh-section">
        <h2 className="xzh-sec-title">北凉红颜</h2><p className="xzh-sec-sub">十五位佳人 · 江湖庙堂 · 爱恨情仇</p>
        <CardGrid>{(heroines || []).map((h, i) => <Card key={h.name} card={h} color={h.color} index={i} />)}</CardGrid>
      </section>
      <footer className="xzh-footer"><span className="xzh-footer-b">雪中悍刀行</span><p>烽火戏诸侯 著</p></footer>
    </div>
  );
}
