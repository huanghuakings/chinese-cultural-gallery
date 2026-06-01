import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './ArtsSubPage.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';

const PAGE_CONFIG = {
  qin: {
    title: '琴', subtitle: '古琴雅韵 · 千年清音',
    intro: '琴者，禁也，禁止淫邪，以正人心。古琴为中国最古老的弹拨乐器，位列"琴棋书画"之首，是文人雅士修身养性的必由之器。',
    seal: '🎵', accent: '#6b8db5',
  },
  qi: {
    title: '棋', subtitle: '黑白世界 · 方圆乾坤',
    intro: '棋者，弈也。围棋起源于中国，距今已有四千余年历史。黑白二色，方圆之间，蕴含天地玄机。从王积薪的"围棋十诀"到黄龙士的棋圣风范，围棋不仅是竞技，更是智慧的修行。',
    seal: '⚫', accent: '#8a8278',
  },
  shu: {
    title: '书', subtitle: '翰墨丹青 · 笔下乾坤',
    intro: '书者，抒也。书法是中国特有的艺术形式，从王羲之的"天下第一行书"到颜筋柳骨，从欧体到赵体，书法承载着中华文化的审美精神和人格理想。',
    seal: '✒️', accent: '#c9a84c',
  },
  hua: {
    title: '画', subtitle: '丹青妙笔 · 意境万千',
    intro: '画者，化也。中国绘画源远流长，从顾恺之的"传神写照"到吴道子的"吴带当风"，从文人画的水墨意境到齐白石的似与不似之间，中国画以独特的笔墨语言，描绘出中华民族的精神图谱。',
    seal: '🎨', accent: '#d43c2a',
  },
};

const loadMap = {
  qin: () => import('../../data/qin.json'),
  qi: () => import('../../data/qi.json'),
  shu: () => import('../../data/shu.json'),
  hua: () => import('../../data/hua.json'),
};

export default function ArtsSubPage() {
  const { type } = useParams();
  const config = PAGE_CONFIG[type] || PAGE_CONFIG.qin;
  const accent = config.accent;

  const { data: items, isLoading } = useQuery({
    queryKey: ['arts', type],
    queryFn: () => {
      const loader = loadMap[type];
      return loader ? loader().then(m => m.default) : Promise.resolve([]);
    },
  });

  if (isLoading) {
    return (
      <div className="hs-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>
        加载中...
      </div>
    );
  }

  return (
    <div className="hs-page" style={{ '--hs-accent': accent, '--hs-accent-alpha': `${accent}4D`, '--hs-hero-glow': `${accent}18` }}>
      <section className="hs-hero">
        <div className="hs-hero-content">
          <div className="hs-seal">{config.seal}</div>
          <h1>{config.title}</h1>
          <p className="hs-sub">{config.subtitle}</p>
          <div className="hs-verse">
            <p>"{config.intro}"</p>
          </div>
        </div>
      </section>
      <section className="hs-section">
        <h2 className="hs-sec-title">{config.title}坛宗师</h2>
        <p className="hs-sec-sub">{config.title} · {(items || []).length}位大家 · 千年传承</p>
        <CardGrid>
          {(items || []).map((item, i) => (
            <Card key={item.name} card={item} color={item.color} index={i} />
          ))}
        </CardGrid>
      </section>
      <footer className="hs-footer">
        <p>{config.title} —— {config.intro}</p>
      </footer>
    </div>
  );
}
