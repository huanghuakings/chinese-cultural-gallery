import { Link } from 'react-router-dom';
import { TileCard } from '../ui/Card';
import './HistoryHome.css';

const SECTIONS = [
  {
    title: '唐宋八大家',
    desc: '韩柳欧王三苏曾巩 · 文起八代之衰',
    route: '/tang-song',
    emoji: '📖',
    color: '#d4a853',
    gradient: 'linear-gradient(135deg, rgba(212,168,83,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(212,168,83,0.25)',
  },
  {
    title: '千古诗韵',
    desc: '屈原李白杜甫苏轼李清照 · 诗词三千年',
    route: '/poets',
    emoji: '🎵',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    title: '华夏巾帼',
    desc: '不让须眉的华夏女杰 · 万里赴戎机',
    route: '/heroines',
    emoji: '⚔️',
    color: '#a03030',
    gradient: 'linear-gradient(135deg, rgba(160,48,48,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(160,48,48,0.25)',
  },
  {
    title: '华夏贤后',
    desc: '历代皇后风云录 · 母仪天下',
    route: '/empresses',
    emoji: '👑',
    color: '#c9a84c',
    gradient: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(201,168,76,0.25)',
  },
  {
    title: '将相传奇',
    desc: '名将名臣 · 帝制风云两千年',
    route: '/generals',
    emoji: '🏛️',
    color: '#6b8db5',
    gradient: 'linear-gradient(135deg, rgba(107,141,181,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(107,141,181,0.25)',
  },
  {
    title: '红楼群芳',
    desc: '金陵十二钗 · 千红一哭万艳同悲',
    route: '/honglou',
    emoji: '🌸',
    color: '#a03030',
    gradient: 'linear-gradient(135deg, rgba(160,48,48,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(160,48,48,0.25)',
  },
  {
    title: '西游女杰',
    desc: '观音白骨精 · 西天路上万般情劫',
    route: '/xiyouji',
    emoji: '🐵',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(10,10,12,0.95))',
    border: 'rgba(139,92,246,0.25)',
  },
];

export default function HistoryHome() {
  return (
    <div className="hh-page">
      {/* Hero */}
      <section className="hh-hero">
        <div className="hh-hero-content">
          <div className="hh-seal">史</div>
          <h1>历史人物</h1>
          <p className="hh-sub">以人为鏡 · 可以明得失 · 以史为鏡 · 可以知兴替</p>
          <div className="hh-verse">
            <p>"究天人之际，通古今之变，成一家之言"</p>
            <p>—— 司马迁《报任安书》</p>
          </div>
        </div>
      </section>

      {/* 子页入口网格 */}
      <section className="hh-section">
        <h2 className="hh-sec-title">人物长廊</h2>
        <p className="hh-sec-sub">六位篇章 · 千年群英 · 尽在此间</p>
        <div className="hh-grid">
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

      <footer className="hh-footer">
        <p>历史人物 —— 从唐宋八大家到将相传奇，华夏五千年文明群英谱。</p>
      </footer>
    </div>
  );
}
