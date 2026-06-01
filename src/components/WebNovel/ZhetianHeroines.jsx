import './ZhetianHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useZhetianHeroines } from '../../hooks/useData';

export default function ZhetianHeroines() {
  const { data: heroines, isLoading } = useZhetianHeroines();
  if (isLoading) return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="zth-page">
      <section className="zth-hero"><div className="zth-bg-stars" /><div className="zth-content">
        <div className="zth-seal">遮天</div><h1>遮天·女主角群芳</h1>
        <p className="zth-sub">登天路，踏歌行，弹指遮天</p>
        <div className="zth-verse"><p>"不为成仙，只为在红尘中等你归来"</p></div>
      </div></section>
      <section className="zth-section">
        <h2 className="zth-sec-title">遮天女杰</h2><p className="zth-sec-sub">万道神体 · 荒古圣体 · 红尘仙路</p>
        <CardGrid>{(heroines || []).map((h, i) => <Card key={h.name} card={h} color={h.color} index={i} />)}</CardGrid>
      </section>
      <footer className="zth-footer"><span className="zth-footer-b">遮天</span><p>《遮天》—— 辰东著，2010-2013年连载。</p></footer>
    </div>
  );
}
