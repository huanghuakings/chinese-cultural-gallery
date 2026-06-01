import './HonglouDream.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useHonglouCharacters } from '../../hooks/useData';

export default function HonglouDream() {
  const { data: characters, isLoading } = useHonglouCharacters();
  if (isLoading) return <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="hs-page" style={{ '--hs-accent': '#a03030', '--hs-accent-alpha': 'rgba(160,48,48,0.3)', '--hs-hero-glow': 'rgba(160,48,48,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">红楼群芳</div>
          <h1>红楼梦群芳谱</h1>
          <p className="hs-sub">千红一窟 · 万艳同杯 · 都归太虚幻境</p>
          <div className="hs-verse">
            <p>"满纸荒唐言，一把辛酸泪"</p>
            <p>"都云作者痴，谁解其中味"</p>
          </div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">金陵群芳</h2>
        <p className="hs-sec-sub">十二钗正册 · 丫鬟群芳 · 命运各异</p>
        <CardGrid>
          {(characters || []).map((c, i) => (
            <Card key={c.name} card={c} color={c.color} index={i} variant="honglou" />
          ))}
        </CardGrid>
      </section>
      <footer className="hs-footer"><p>红楼梦群芳谱 —— 金陵十二钗正册及大观园中诸位女子，千红一哭，万艳同悲。</p></footer>
    </div>
  );
}
