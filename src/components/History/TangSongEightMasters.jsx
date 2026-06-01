import './TangSongEightMasters.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useTangSongMasters } from '../../hooks/useData';

export default function TangSongEightMasters() {
  const { data: masters, isLoading } = useTangSongMasters();
  if (isLoading) return <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="hs-page" style={{ '--hs-accent': '#d4a853', '--hs-accent-alpha': 'rgba(212,168,83,0.3)', '--hs-hero-glow': 'rgba(212,168,83,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">唐宋八大家</div>
          <h1>唐宋八大家</h1>
          <p className="hs-sub">文起八代之衰 · 天下文章莫大乎此</p>
          <div className="hs-verse"><p>"云山苍苍，江水泱泱"</p></div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">八位文学巨匠</h2>
        <p className="hs-sec-sub">两朝八杰 · 千古文章 · 万世师表</p>
        <CardGrid>{(masters || []).map((m, i) => <Card key={m.name} card={m} color={m.color1} index={i} />)}</CardGrid>
      </section>
      <footer className="hs-footer"><p>唐宋八大家：唐·韩愈、柳宗元 · 宋·欧阳修、王安石、苏轼、苏辙、苏洵、曾巩</p></footer>
    </div>
  );
}
