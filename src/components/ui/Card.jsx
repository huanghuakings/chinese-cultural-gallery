/**
 * ============================================
 *  公共卡片组件 — 全站统一
 * ============================================
 *
 * 使用方式：
 *   import { Card, CardGrid, TileCard } from '../components/ui/Card'
 *
 *  Card Props:
 *    card     — 角色数据对象（必填）
 *    color    — 主题色
 *    delay    — 动画延迟
 *    index    — 卡片序号（用于自动计算 animationDelay）
 *    variant  — 变体: 'default' | 'honglou' | 'shuihu' | 'sanguo'
 *    onClick  — 点击回调（不传则自动展开/收起详情）
 *
 *  数据字段兼容：
 *    name / emoji / title / role / dynasty / nickname / faction
 *    intro / bio / desc / quote
 *    fate / death / works(数组或字符串) / influence / tags / gem / rank / star / category
 *    color（角色自带颜色）
 * ============================================
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ui/Card.css';

/* === 卡片网格 === */
export function CardGrid({ children, className = '', minWidth = 320, gap = 1.5 }) {
  return (
    <div
      className={`cp-grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
        gap: `${gap}rem`,
      }}
    >
      {children}
    </div>
  );
}

/* === 入口卡片 (Tile) === */
export function TileCard({ emoji, title, desc, to, href, color, gradient, border, index }) {
  const animDelay = index !== undefined ? index * 0.08 : 0;
  const Tag = to ? Link : href ? 'a' : 'div';
  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <Tag
      {...linkProps}
      className="cp-tile"
      style={{
        animationDelay: `${animDelay}s`,
        background: gradient || 'linear-gradient(135deg, rgba(20,18,28,0.95), rgba(10,10,12,0.95))',
        borderColor: border || 'rgba(255,255,255,0.06)',
      }}
    >
      <span className="cp-tile-emoji">{emoji}</span>
      <h3 style={{ color: color || '#f5efe0' }}>{title}</h3>
      {desc && <p>{desc}</p>}
    </Tag>
  );
}

/* === 单个角色卡片 === */
export function Card({
  card,
  color = '#d4a853',
  delay = 0,
  index,
  variant = 'default',
  onClick,
}) {
  const [expanded, setExpanded] = useState(false);
  const animDelay = delay || (index !== undefined ? index * 0.04 : 0);

  const {
    name, emoji, title, role, dynasty, nickname, faction,
    intro, bio, desc, quote, to,
    fate, death, works, influence, tags = [], gem, rank, star, category,
    color: cardColor,
  } = card;

  const finalColor = cardColor || color;

  const toggleExpand = () => {
    if (onClick) return onClick(card);
    setExpanded(prev => !prev);
  };

  const CardInner = (
    <>
      <div className="cp-card-top">
        {emoji && <span className="cp-emoji">{emoji}</span>}
        <div className="cp-header">
          <h3>{name}</h3>
          {role && <span className="cp-role">{role}</span>}
          {dynasty && <span className="cp-dynasty">{dynasty}</span>}
          {nickname && <span className="cp-nickname">{nickname}</span>}
          {faction && <span className="cp-faction">{faction}</span>}
        </div>
        {variant === 'shuihu' && rank && <span className="cp-rank">#{rank}</span>}
        {variant === 'shuihu' && star && <span className="cp-star">{star}</span>}
      </div>
      {title && <div className="cp-title">{title}</div>}
      {variant === 'honglou' && gem && <div className="cp-gem">灵犀：{gem}</div>}
      {(tags.length > 0 || category) && (
        <div className="cp-tags">
          {tags.map(t => <span key={t} className="cp-tag">{t}</span>)}
          {category && <span className="cp-tag">{category}</span>}
        </div>
      )}
      {intro && <p className="cp-intro">{intro}</p>}
      {(bio || desc) && <p className="cp-bio">{bio || desc}</p>}
      {quote && <div className="cp-quote">「{quote}」</div>}
      {expanded && (fate || death || works || influence) && (
        <div className="cp-expanded">
          {fate && <div className="cp-detail-item"><span className="cp-label">结局</span><span>{fate}</span></div>}
          {death && !fate && <div className="cp-detail-item"><span className="cp-label">状态</span><span>{death}</span></div>}
          {Array.isArray(works) && <div className="cp-detail-item"><span className="cp-label">相关</span><span>{works.join(' · ')}</span></div>}
          {typeof works === 'string' && <div className="cp-detail-item"><span className="cp-label">代表作</span><span>{works}</span></div>}
          {influence && <div className="cp-detail-item"><span className="cp-label">影响</span><span>{influence}</span></div>}
        </div>
      )}
      <div className="cp-hint">{to ? '点击查看详情' : '点击展开详情'}</div>
    </>
  );

  const cardStyle = { animationDelay: `${animDelay}s`, borderTopColor: finalColor };

  if (to) {
    return (
      <Link to={to} className="cp-card" style={cardStyle} onClick={(e) => e.stopPropagation()}>
        {CardInner}
      </Link>
    );
  }

  return (
    <div className="cp-card" style={cardStyle} onClick={toggleExpand}>
      {CardInner}
    </div>
  );
}
