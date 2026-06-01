import './ChineseEmpresses.css';
import '../../components/ui/Card.css';
import { Card, CardGrid } from '../../components/ui/Card';
import { useEmpresses } from '../../hooks/useData';

export default function ChineseEmpresses() {
  const { data: empresses, isLoading } = useEmpresses();
  if (isLoading) return <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;
  return (
    <div className="hs-page" style={{ '--hs-accent': '#d4a853', '--hs-accent-alpha': 'rgba(212,168,83,0.3)', '--hs-hero-glow': 'rgba(212,168,83,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">华夏贤后</div>
          <h1>华夏贤后</h1>
          <p className="hs-sub">后宫有贤 · 天下有光</p>
          <div className="hs-verse"><p>"母仪天下，垂范后世"</p></div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">历代贤后</h2>
        <p className="hs-sec-sub">凤仪天下 · 母仪万方</p>
        <CardGrid>{(empresses || []).map((e, i) => <Card key={e.name} card={e} color={e.color1} index={i} />)}</CardGrid>
      </section>
      <footer className="hs-footer"><p>华夏贤后 —— 从吕雉到孝庄，她们以智慧与德行书写了中华帝国另一半的史诗。</p></footer>
    </div>
  );
}
