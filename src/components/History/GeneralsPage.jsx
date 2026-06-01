import './GeneralsPage.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { useGenerals, useMinisters } from '../../hooks/useData';

export default function GeneralsPage() {
  const { data: generals, isLoading: loadingG } = useGenerals();
  const { data: ministers, isLoading: loadingM } = useMinisters();

  if (loadingG || loadingM) {
    return (
      <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  return (
    <div className="hs-page" style={{ '--hs-accent': '#d4a853', '--hs-accent-alpha': 'rgba(212,168,83,0.3)', '--hs-hero-glow': 'rgba(212,168,83,0.1)' }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">将相</div>
          <h1>帝制风云 · 将相传奇</h1>
          <p className="hs-sub">两千二百年帝制 · 名将开疆拓土 · 名臣治国安邦</p>
          <div className="hs-verse">
            <p>"犯我强汉者，虽远必诛"</p>
            <p>"先天下之忧而忧，后天下之乐而乐"</p>
            <p>"封狼居胥，饮马瀚海"</p>
          </div>
        </div>
      </section>

      <section className="hs-section" id="generals">
        <h2 className="hs-sec-title">千古名将</h2>
        <p className="hs-sec-sub">白起 · 韩信 · 卫青 · 霍去病 · 李靖 · 岳飞 · 戚继光 · 郑成功 · ……</p>
        <CardGrid>
          {(generals || []).map((g, i) => (
            <Card key={g.name} card={g} color={g.color} index={i} />
          ))}
        </CardGrid>
      </section>

      <section className="hs-section" id="ministers">
        <h2 className="hs-sec-title">治世名臣</h2>
        <p className="hs-sec-sub">周公 · 管仲 · 萧何 · 魏征 · 范仲淹 · 王安石 · 张居正 · 海瑞 · ……</p>
        <CardGrid>
          {(ministers || []).map((m, i) => (
            <Card key={m.name} card={m} color={m.color} index={i} />
          ))}
        </CardGrid>
      </section>

      <footer className="hs-footer">
        <p>帝制风云 · 将相传奇 —— 从周公制礼到张之洞兴学，两千二百年中国帝制时代的英雄群像。</p>
      </footer>
    </div>
  );
}
