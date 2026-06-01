import '../ui/Card.css';
import { CardGrid } from '../ui/Card';
import { Link } from 'react-router-dom';
import { useClassicsHome } from '../../hooks/useData';
import './ClassicsHome.css';

export default function ClassicsHome() {
  const { data: classics, isLoading } = useClassicsHome();

  if (isLoading) {
    return <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a8278' }}>加载中...</div>;
  }

  return (
    <div className="cl-page">
      <section className="cl-hero">
        <div className="cl-bg-stars" />
        <div className="cl-content">
          <div className="cl-seal">四大名著</div>
          <h1>华夏古典名著</h1>
          <p className="cl-sub">红楼 · 水浒 · 三国 · 西游</p>
          <div className="cl-verse">
            <p>"满纸荒唐言，一把辛酸泪"</p>
            <p>"滚滚长江东逝水，浪花淘尽英雄"</p>
          </div>
        </div>
      </section>

      <section className="cl-section">
        <h2 className="cl-sec-title">名著典藏</h2>
        <p className="cl-sec-sub">中国古典文学四大名著 · 千古传世经典</p>
        <CardGrid>
          {(classics || []).map((c, i) => (
            <Link key={c.id} to={c.route} className="cl-card" style={{ animationDelay: `${i * 0.1}s`, borderTopColor: c.color }}>
              <div className="cl-card-top">
                <span className="cl-emoji">{c.emoji}</span>
                <div className="cl-header">
                  <h3>{c.title}</h3>
                  <span className="cl-dynasty">{c.dynasty} · {c.author}</span>
                </div>
              </div>
              <p className="cl-intro">{c.desc}</p>
              <div className="cl-tags">
                {(c.highlights || []).map(h => <span key={h} className="cl-tag">{h}</span>)}
              </div>
            </Link>
          ))}
        </CardGrid>
      </section>

      <footer className="cl-footer">
        <span className="cl-footer-b">四大名著</span>
        <p>华夏文化画廊 · 中国古典文学瑰宝</p>
      </footer>
    </div>
  );
}
