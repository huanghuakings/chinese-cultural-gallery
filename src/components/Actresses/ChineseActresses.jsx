import './ChineseActresses.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { useActresses, useMilestoneMovies } from '../../hooks/useData';

export default function ChineseActresses() {
  const { data: actresses, isLoading: loadingA } = useActresses();
  const { data: movies, isLoading: loadingM } = useMilestoneMovies();

  if (loadingA || loadingM) {
    return (
      <div className="ca-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  return (
    <div className="ca-page">
      <section className="ca-hero">
        <div className="ca-hero-content">
          <div className="ca-seal">🎬</div>
          <h1>影视星榜</h1>
          <p className="ca-sub">星光璀璨 · 银幕传奇 · 光影百年</p>
          <div className="ca-verse">
            <p>"电影是梦，是神话，是童话"</p>
            <p>—— 费德里科·费里尼</p>
          </div>
        </div>
      </section>

      {/* 女演员 */}
      <section className="ca-section" id="actresses">
        <h2 className="ca-sec-title">华娱女星</h2>
        <p className="ca-sec-sub">刘亦菲 · 赵丽颖 · 杨幂 · 白鹿 · 赵露思 · ……</p>
        <CardGrid>
          {(actresses || []).map((a, i) => (
            <Card key={a.name} card={a} color={a.color} index={i} />
          ))}
        </CardGrid>
      </section>

      {/* 里程碑影片 */}
      <section className="ca-section" id="movies">
        <h2 className="ca-sec-title">里程碑影片</h2>
        <p className="ca-sec-sub">国产经典 · 百部经典 · 光影百年</p>
        <CardGrid>
          {(movies || []).map((m, i) => (
            <Card key={m.name} card={m} color={m.color} index={i} />
          ))}
        </CardGrid>
      </section>

      <footer className="ca-footer">
        <p>影视星榜 —— 从霸王别姬到流浪地球，从刘亦菲到赵露思，光影交织的华夏故事。</p>
      </footer>
    </div>
  );
}
