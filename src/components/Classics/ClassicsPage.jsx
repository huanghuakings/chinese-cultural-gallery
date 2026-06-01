import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../ui/Card.css';
import { Card, CardGrid } from '../ui/Card';
import { useShuihuCharacters, useSanguoCharacters, useXiyoujiHeroines, useHonglouCharacters } from '../../hooks/useData';
import './ClassicsPage.css';

const BOOK_CONFIG = {
  xiyouji: { title: '西游记', emoji: '🐵', color: '#c9a84c', glowColor: 'rgba(201,168,76,0.15)', dynasty: '明', author: '吴承恩', desc: '九九八十一难，取经路上妖仙圣凡', sealBorder: '2px solid rgba(201,168,76,0.5)', verse: ['"心生种种魔生，心灭种种魔灭"', '"敢问路在何方，路在脚下"'] },
  honglou: { title: '红楼梦', emoji: '🌸', color: '#c0392b', glowColor: 'rgba(192,57,43,0.12)', dynasty: '清', author: '曹雪芹', desc: '千红一窟万艳同杯，金陵十二钗群芳', sealBorder: '2px solid rgba(192,57,43,0.4)', verse: ['"满纸荒唐言，一把辛酸泪"', '"都云作者痴，谁解其中味"'] },
  shuihu: { title: '水浒传', emoji: '⚔️', color: '#1e6091', glowColor: 'rgba(30,96,145,0.15)', dynasty: '明', author: '施耐庵', desc: '一百单八将，替天行道聚义梁山', sealBorder: '2px solid rgba(30,96,145,0.4)', verse: ['"他时若遂凌云志，敢笑黄巢不丈夫"', '"路见不平一声吼，该出手时就出手"'] },
  sanguo: { title: '三国演义', emoji: '🏯', color: '#b8860b', glowColor: 'rgba(184,134,11,0.12)', dynasty: '明', author: '罗贯中', desc: '滚滚长江东逝水，三国鼎立志士争锋', sealBorder: '2px solid rgba(184,134,11,0.4)', verse: ['"滚滚长江东逝水，浪花淘尽英雄"', '"既生瑜，何生亮"'] },
};

const FILTER_TABS = {
  xiyouji: [{ key: 'all', label: '✦ 全部' }, { key: '仙佛', label: '☸ 仙佛神圣' }, { key: '妖', label: '☠ 女妖精怪' }, { key: '凡', label: '♛ 凡间女子' }],
  honglou: [{ key: 'all', label: '✦ 全部' }, { key: '正册', label: '❀ 十二钗' }, { key: '副册', label: '◆ 副册' }, { key: '又副册', label: '◇ 又副册' }],
  shuihu: [{ key: 'all', label: '✦ 全部' }, { key: 'heavenly', label: '⭐ 天罡' }, { key: 'earthly', label: '🌟 地煞' }, { key: 'villains', label: '☠ 反派' }],
  sanguo: [{ key: 'all', label: '✦ 全部' }, { key: 'wei', label: '🐉 曹魏' }, { key: 'shu', label: '🌿 蜀汉' }, { key: 'wu', label: '🔥 东吴' }],
};

export default function ClassicsPage() {
  const { bookId } = useParams();
  const config = BOOK_CONFIG[bookId];
  const [filter, setFilter] = useState('all');

  const { data: xiyoujiData } = useXiyoujiHeroines();
  const { data: honglouData } = useHonglouCharacters();
  const { data: shuihuData } = useShuihuCharacters();
  const { data: sanguoData } = useSanguoCharacters();

  if (!config) return null;

  return (
    <div className="classics-page">
      <section className="classics-hero">
        <div className="classics-hero-glow" style={{ background: `radial-gradient(circle, ${config.glowColor}, transparent 70%)` }} />
        <Link to="/classics" className="back-link">← 返回四大名著</Link>
        <div className="classics-hero-content">
          <div className="classics-seal" style={{ border: config.sealBorder }}>{config.emoji}</div>
          <h1 style={{ color: config.color }}>{config.title}</h1>
          <p className="classics-meta">{config.dynasty} · {config.author}</p>
          <p className="classics-desc">{config.desc}</p>
          {config.verse && <div className="classics-verse">{config.verse.map((v, i) => <p key={i}>{v}</p>)}</div>}
        </div>
      </section>

      <div className="classics-body">
        <div className="filter-bar">
          {(FILTER_TABS[bookId] || []).map(t => (
            <button key={t.key} className={`filter-btn ${filter === t.key ? 'active' : ''}`} onClick={() => setFilter(t.key)}>{t.label}</button>
          ))}
        </div>

        {bookId === 'xiyouji' && <CardGrid>{(xiyoujiData || []).filter(c => filter === 'all' || c.category === filter).map((c, i) => <Card key={c.name} card={c} color={config.color} index={i} />)}</CardGrid>}
        {bookId === 'honglou' && <CardGrid>{(honglouData || []).filter(c => filter === 'all' || c.category === filter).map((c, i) => <Card key={c.name} card={c} color={c.color || config.color} index={i} variant="honglou" />)}</CardGrid>}
        {bookId === 'shuihu' && <CardGrid>
          {(shuihuData?.heavenly || []).filter(() => filter === 'all' || filter === 'heavenly').map((c, i) => <Card key={c.name} card={c} color={config.color} index={i} variant="shuihu" />)}
          {(shuihuData?.earthly || []).filter(() => filter === 'all' || filter === 'earthly').map((c, i) => <Card key={c.name} card={c} color={config.color} index={i} variant="shuihu" />)}
          {(shuihuData?.villains || []).filter(() => filter === 'all' || filter === 'villains').map((c, i) => <Card key={c.name} card={c} color="#8b0000" index={i} variant="shuihu" />)}
        </CardGrid>}
        {bookId === 'sanguo' && <CardGrid>
          {(sanguoData?.wei || []).filter(() => filter === 'all' || filter === 'wei').map((c, i) => <Card key={c.name} card={c} color="#4a4a8a" index={i} variant="sanguo" />)}
          {(sanguoData?.shu || []).filter(() => filter === 'all' || filter === 'shu').map((c, i) => <Card key={c.name} card={c} color="#c0392b" index={i} variant="sanguo" />)}
          {(sanguoData?.wu || []).filter(() => filter === 'all' || filter === 'wu').map((c, i) => <Card key={c.name} card={c} color="#2980b9" index={i} variant="sanguo" />)}
        </CardGrid>}
      </div>

      <footer className="classics-footer">{config.title} · {config.author}</footer>
    </div>
  );
}
