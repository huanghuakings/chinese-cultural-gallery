import './MoonLanding.css';
import { useApolloMissions } from '../../hooks/useData';

export default function MoonLanding() {
  const { data: missions, isLoading } = useApolloMissions();

  if (isLoading) {
    return (
      <div className="ml-page">
        <div className="ml-section" style={{ textAlign: 'center', padding: '3rem', color: '#8a8278' }}>
          加载中...
        </div>
      </div>
    );
  }

  return (
    <div className="ml-page">
      <div className="ml-hero">
        <div className="ml-hero-stars"></div>
        <div className="ml-hero-content">
          <div className="ml-seal">阿波罗</div>
          <h1>月球登陆计划</h1>
          <p className="ml-subtitle">APOLLO LUNAR LANDING PROGRAM · 1969–1972</p>
          <blockquote>"这是一个人的一小步，却是人类的一大步。"</blockquote>
        </div>
      </div>

      <div className="ml-section" id="missions">
        <h2 className="ml-sec-title">阿波罗登月任务</h2>
        <p className="ml-sec-sub">七次成功登月 · 十二位登月者 · 一项不朽的成就</p>
        <div className="ml-timeline">
          {(missions || []).map((m, i) => (
            <div key={m.id} className="ml-timeline-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="ml-tl-year">{m.date}</div>
              <div className="ml-tl-dot" />
              <div className="ml-tl-card">
                <div className="ml-tl-header">
                  <h3>{m.id}</h3>
                  <span className="ml-tl-highlight">{m.highlight}</span>
                </div>
                <p className="ml-tl-desc">{m.desc}</p>
                <div className="ml-tl-crew">
                  <h4>航天员</h4>
                  {m.crew.map(c => <span key={c} className="ml-crew-tag">{c}</span>)}
                </div>
                <div className="ml-tl-quote">
                  <p>{m.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="ml-footer">
        <span className="ml-footer-b">阿波罗计划</span>
        <p>美国国家航空航天局 (NASA) 阿波罗计划，是人类首次载人登月工程。</p>
        <p style={{ marginTop: 8 }}>1969年至1972年间，阿波罗11、12、14、15、16、17共六次成功将人类送上月球。</p>
      </footer>
    </div>
  );
}
