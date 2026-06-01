import './PoetsPage.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { usePoets } from '../../hooks/useData';

export default function PoetsPage() {
  const { data: poets, isLoading } = usePoets();
  if (isLoading) {
    return (
      <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  // 按朝代排序
  const dynastyOrder = ['战国·楚', '东晋', '唐', '五代·南唐', '北宋', '南宋', '宋'];
  const sorted = [...(poets || [])].sort((a, b) => {
    const ai = dynastyOrder.indexOf(a.dynasty);
    const bi = dynastyOrder.indexOf(b.dynasty);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <div className="hs-page" style={{ '--hs-accent': '#8b5cf6', '--hs-accent-alpha': 'rgba(139,92,246,0.3)', '--hs-hero-glow': 'rgba(139,92,246,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">诗词</div>
          <h1>千古诗韵 · 词人风流</h1>
          <p className="hs-sub">从楚辞到宋词 · 十六位诗词宗师 · 千古绝唱</p>
          <div className="hs-verse">
            <p>"诗者，志之所之也，在心为志，发言为诗"</p>
            <p>"词之为体，宜修至美，能言诗之所不能言"</p>
          </div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">诗词宗师</h2>
        <p className="hs-sec-sub">屈原 · 李白 · 杜甫 · 苏轼 · 辛弃疾 · 李清照 · ……</p>
        <CardGrid>
          {sorted.map((p, i) => (
            <Card key={p.name} card={p} color={p.color} index={i} />
          ))}
        </CardGrid>
      </section>
      <footer className="hs-footer">
        <p>千古诗韵 · 词人风流 —— 从屈原的离骚到李煜的虞美人，华夏诗词三千年。</p>
      </footer>
    </div>
  );
}
