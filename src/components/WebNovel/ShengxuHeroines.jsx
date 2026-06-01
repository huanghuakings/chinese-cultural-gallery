import './ShengxuHeroines.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useShengxuHeroines } from '../../hooks/useData';

export default function ShengxuHeroines() {
  const { data: heroines, isLoading } = useShengxuHeroines();
  if (isLoading) return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="sxx-page">
      <section className="sxx-hero"><div className="sxx-bg-stars" /><div className="sxx-content">
        <div className="sxx-seal">圣墟</div><h1>圣墟·女主角群芳</h1>
        <p className="sxx-sub">在破败中崛起，在寂灭中复苏</p>
        <div className="sxx-verse"><p>"罐天帝楚风，搅动诸天风云"</p></div>
      </div></section>
      <section className="sxx-section">
        <h2 className="sxx-sec-title">圣墟女杰</h2><p className="sxx-sec-sub">罐天帝红颜 · 仙古遗梦 · 文明之火</p>
        <CardGrid>{(heroines || []).map((h, i) => <Card key={h.name} card={h} color={h.color} index={i} />)}</CardGrid>
      </section>
      <footer className="sxx-footer"><span className="sxx-footer-b">圣墟</span><p>《圣墟》—— 辰东著，2016-2021年连载。</p></footer>
    </div>
  );
}
