import { Link } from 'react-router-dom';
import { TileCard } from '../ui/Card';
import './ArtsHome.css';

const SECTIONS = [
  {
    title: '琴',
    desc: '嵇康 · 伯牙 · 蔡邕 · 高山流水遇知音',
    route: '/arts/qin',
    emoji: '🎵',
    color: '#6b8db5',
    gradient: 'linear-gradient(135deg, rgba(107,141,181,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(107,141,181,0.25)',
  },
  {
    title: '棋',
    desc: '黄龙士 · 范西屏 · 王积薪 · 围棋十诀',
    route: '/arts/qi',
    emoji: '⚫',
    color: '#8a8278',
    gradient: 'linear-gradient(135deg, rgba(136,130,120,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(136,130,120,0.25)',
  },
  {
    title: '书',
    desc: '王羲之 · 颜真卿 · 柳公权 · 赵孟頫',
    route: '/arts/shu',
    emoji: '✒️',
    color: '#c9a84c',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(201,168,76,0.25)',
  },
  {
    title: '画',
    desc: '顾恺之 · 吴道子 · 齐白石 · 徐悲鸿',
    route: '/arts/hua',
    emoji: '🎨',
    color: '#d43c2a',
    gradient: 'linear-gradient(135deg, rgba(212,60,42,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(212,60,42,0.25)',
  },
];

export default function ArtsHome() {
  return (
    <div className="ah-page">
      <section className="ah-hero">
        <div className="ah-hero-content">
          <div className="ah-seal">艺</div>
          <h1>琴棋书画</h1>
          <p className="ah-sub">四艺雅集 · 千年文脉 · 君子之艺</p>
          <div className="ah-verse">
            <p>"琴棋书画诗酒花，当年件件不离它"</p>
            <p>"四般闲事，不宜累家"</p>
          </div>
        </div>
      </section>

      <section className="ah-section">
        <h2 className="ah-sec-title">四艺雅集</h2>
        <p className="ah-sec-sub">琴 · 棋 · 书 · 画 · 文人四艺</p>
        <div className="ah-grid">
          {SECTIONS.map((s, i) => (
            <TileCard
              key={s.route}
              emoji={s.emoji}
              title={s.title}
              desc={s.desc}
              to={s.route}
              color={s.color}
              gradient={s.gradient}
              border={s.border}
              index={i}
            />
          ))}
        </div>
      </section>

      <footer className="ah-footer">
        <p>琴棋书画 —— 从嵇康的广陵散到齐白石的虾，千年文人的精神家园。</p>
      </footer>
    </div>
  );
}
