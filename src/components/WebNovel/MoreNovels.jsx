import { Link } from 'react-router-dom';
import './MoreNovels.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { useMoreNovels } from '../../hooks/useData';

export default function MoreNovels() {
  const { data: novels, isLoading } = useMoreNovels();
  if (isLoading) return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="mn-page">
      <section className="mn-hero"><div className="mn-bg-stars" /><div className="mn-content">
        <div className="mn-seal">📚</div><h1>更多网文</h1>
        <p className="mn-sub">经典作品 · 千万读者 · 不朽传奇</p>
      </div></section>
      <section className="mn-section">
        <h2 className="mn-sec-title">经典名作</h2>
        <p className="mn-sec-sub">从斗罗大陆到庆余年，网文黄金时代的璀璨群星</p>
        <CardGrid>{(novels || []).map((n, i) => <Card key={n.name} card={n} color={n.color} index={i} />)}</CardGrid>
      </section>
      <footer className="mn-footer"><Link to="/webnovel" className="mn-back">← 返回网文宇宙</Link></footer>
    </div>
  );
}
