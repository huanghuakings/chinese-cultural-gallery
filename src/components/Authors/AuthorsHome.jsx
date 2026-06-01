import './AuthorsHome.css';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { useAuthors } from '../../hooks/useData';

const AUTHOR_ID_MAP = {
  '鲁迅': 'luxun', '茅盾': 'maodun', '巴金': 'bajin', '老舍': 'laoshe',
  '沈从文': 'shencongwen', '钱钟书': 'qianzhongshu', '张爱玲': 'zhangailing',
  '郁达夫': 'yudafu', '曹禺': 'caoyu', '朱自清': 'zhuiziqing',
  '萧红': 'xiaohong', '冰心': 'bingxin',
  '辰东': 'chendong', '唐家三少': 'tangsanshao', '天蚕土豆': 'tancan',
  '猫腻': 'maoni', '烽火戏诸侯': 'fenghuo', '顾漫': 'guman',
  '南派三叔': 'nanpaisanshu', '天下霸唱': 'tianxiabachang',
  '江南': 'jiangnan', '耳根': 'ergen',
};

export default function AuthorsHome() {
  const { data: authors, isLoading } = useAuthors();
  if (isLoading) return <div className="ah-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#8a8278' }}>加载中...</div>;

  const modernAuthors = (authors || []).slice(0, 12);
  const webAuthors = (authors || []).slice(12);

  return (
    <div className="ah-page">
      <section className="ah-hero">
        <div className="ah-hero-content">
          <div className="ah-seal">✒️</div>
          <h1>作家谱</h1>
          <p className="ah-sub">近现代大家 · 网络名家 · 千古文章</p>
          <div className="ah-verse">
            <p>"文章是案头之山水，山水是地上之文章"</p>
          </div>
        </div>
      </section>

      <section className="ah-section">
        <h2 className="ah-sec-title">近现代文学</h2>
        <p className="ah-sec-sub">五四以来 · 十二位大家 · 开一代文风</p>
        <CardGrid>
          {modernAuthors.map((a, i) => {
            const id = AUTHOR_ID_MAP[a.name];
            const card = id ? { ...a, to: `/authors/${id}` } : a;
            return <Card key={a.name} card={card} color={a.color} index={i} />;
          })}
        </CardGrid>
      </section>

      <section className="ah-section">
        <h2 className="ah-sec-title">网络文学</h2>
        <p className="ah-sec-sub">白金作家 · 亿万读者 · 网文黄金时代</p>
        <CardGrid>
          {webAuthors.map((a, i) => {
            const id = AUTHOR_ID_MAP[a.name];
            const card = id ? { ...a, to: `/authors/${id}` } : a;
            return <Card key={a.name} card={card} color={a.color} index={i} />;
          })}
        </CardGrid>
      </section>

      <footer className="ah-footer">
        <p>作家谱 —— 从鲁迅的呐喊到辰东的遮天，书写中华民族的精神世界。</p>
      </footer>
    </div>
  );
}
