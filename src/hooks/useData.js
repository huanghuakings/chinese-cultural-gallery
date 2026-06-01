import { useQuery } from '@tanstack/react-query'

// 模拟异步数据加载（未来可替换为真实 API 调用）
const loadData = async (data) => {
  // 模拟极小延迟，确保 loading 状态可被感知（可选）
  return data
}

// 天文
export function useAstronomyItems() {
  return useQuery({ queryKey: ['astronomyItems'], queryFn: () => import('../data/astronomy.json').then(m => loadData(m.default)) })
}

export function usePlanetData() {
  return useQuery({ queryKey: ['planetData'], queryFn: () => import('../data/planets.json').then(m => loadData(m.default)) })
}

export function useApolloMissions() {
  return useQuery({ queryKey: ['apolloMissions'], queryFn: () => import('../data/apollo-missions.json').then(m => loadData(m.default)) })
}

// 历史人物
export function useHeroines() {
  return useQuery({ queryKey: ['heroines'], queryFn: () => import('../data/heroines.json').then(m => loadData(m.default)) })
}

export function useEmpresses() {
  return useQuery({ queryKey: ['empresses'], queryFn: () => import('../data/empresses.json').then(m => loadData(m.default)) })
}

export function useTangSongMasters() {
  return useQuery({ queryKey: ['tangSongMasters'], queryFn: () => import('../data/tang-song-masters.json').then(m => loadData(m.default)) })
}

export function useHonglouCharacters() {
  return useQuery({ queryKey: ['honglouCharacters'], queryFn: () => import('../data/honglou-characters.json').then(m => loadData(m.default)) })
}

export function useXiyoujiHeroines() {
  return useQuery({ queryKey: ['xiyoujiHeroines'], queryFn: () => import('../data/xiyouji-heroines.json').then(m => loadData(m.default)) })
}

export function useGenerals() {
  return useQuery({ queryKey: ['generals'], queryFn: () => import('../data/generals.json').then(m => loadData(m.default)) })
}

export function useMinisters() {
  return useQuery({ queryKey: ['ministers'], queryFn: () => import('../data/ministers.json').then(m => loadData(m.default)) })
}

export function usePoets() {
  return useQuery({ queryKey: ['poets'], queryFn: () => import('../data/poets.json').then(m => loadData(m.default)) })
}

// 网文 — 作者数据
export function useChendongData() {
  return useQuery({ queryKey: ['chendongData'], queryFn: () => import('../data/chendong-universe.json').then(m => loadData(m.default)) })
}

export function useAuthorData(authorId) {
  const authorMap = {
    'chendong': () => import('../data/author-chendong.json'),
    'fenghuo': () => import('../data/author-fenghuo.json'),
    'tangsan': () => import('../data/author-tangsan.json'),
    'tancan': () => import('../data/author-tancan.json'),
    'maoni': () => import('../data/author-maoni.json'),
  }
  const loader = authorMap[authorId] || authorMap['chendong']
  return useQuery({ queryKey: ['authorData', authorId], queryFn: () => loader().then(m => loadData(m.default)), enabled: !!authorId })
}

// 网文 — 作品角色数据（workId -> heroines JSON）
export function useWorkHeroines(authorId, workId) {
  const workMap = {
    'chendong': {
      'perfect-world': () => import('../data/perfect-world-heroines.json'),
      'shengxu': () => import('../data/shengxu-heroines.json'),
      'zhetian': () => import('../data/zhetian-heroines.json'),
    },
    'fenghuo': {
      'xuezhong': () => import('../data/xuezhong-heroines.json'),
    },
  }
  const authorWorks = workMap[authorId]
  const loader = authorWorks ? authorWorks[workId] : null
  return useQuery({
    queryKey: ['workHeroines', authorId, workId],
    queryFn: () => loader ? loader().then(m => loadData(m.default)) : Promise.resolve(null),
    enabled: !!authorId && !!workId && !!loader,
  })
}

// 网文 — 兼容旧路由的 hooks
export function usePerfectWorldHeroines() {
  return useQuery({ queryKey: ['perfectWorldHeroines'], queryFn: () => import('../data/perfect-world-heroines.json').then(m => loadData(m.default)) })
}

export function useShengxuHeroines() {
  return useQuery({ queryKey: ['shengxuHeroines'], queryFn: () => import('../data/shengxu-heroines.json').then(m => loadData(m.default)) })
}

export function useZhetianHeroines() {
  return useQuery({ queryKey: ['zhetianHeroines'], queryFn: () => import('../data/zhetian-heroines.json').then(m => loadData(m.default)) })
}

export function useXuezhongHeroines() {
  return useQuery({ queryKey: ['xuezhongHeroines'], queryFn: () => import('../data/xuezhong-heroines.json').then(m => loadData(m.default)) })
}

export function useWebNovelCategories() {
  return useQuery({ queryKey: ['webNovelCategories'], queryFn: () => import('../data/webnovel-categories.json').then(m => loadData(m.default)) })
}

export function useMoreNovels() {
  return useQuery({ queryKey: ['moreNovels'], queryFn: () => import('../data/more-novels.json').then(m => loadData(m.default)) })
}

export function useChendongMeta() {
  return useQuery({ queryKey: ['chendongMeta'], queryFn: () => import('../data/chendong-meta.json').then(m => loadData(m.default)) })
}

// 作家
export function useAuthors() {
  return useQuery({ queryKey: ['authors'], queryFn: () => import('../data/authors.json').then(m => loadData(m.default)) })
}

export function useAuthorDetail(authorId) {
  const map = {
    'luxun': () => import('../data/authors-individual/author-luxun.json'),
    'maodun': () => import('../data/authors-individual/author-maodun.json'),
    'bajin': () => import('../data/authors-individual/author-bajin.json'),
    'laoshe': () => import('../data/authors-individual/author-laoshe.json'),
    'shencongwen': () => import('../data/authors-individual/author-shencongwen.json'),
    'qianzhongshu': () => import('../data/authors-individual/author-qianzhongshu.json'),
    'zhangailing': () => import('../data/authors-individual/author-zhangailing.json'),
    'yudafu': () => import('../data/authors-individual/author-yudafu.json'),
    'caoyu': () => import('../data/authors-individual/author-caoyu.json'),
    'zhuiziqing': () => import('../data/authors-individual/author-zhuiziqing.json'),
    'xiaohong': () => import('../data/authors-individual/author-xiaohong.json'),
    'bingxin': () => import('../data/authors-individual/author-bingxin.json'),
    'chendong': () => import('../data/authors-individual/author-chendong.json'),
    'tangsanshao': () => import('../data/authors-individual/author-tangsanshao.json'),
    'tancan': () => import('../data/authors-individual/author-tancan.json'),
    'maoni': () => import('../data/authors-individual/author-maoni.json'),
    'fenghuo': () => import('../data/authors-individual/author-fenghuo.json'),
    'guman': () => import('../data/authors-individual/author-guman.json'),
    'nanpaisanshu': () => import('../data/authors-individual/author-nanpaisanshu.json'),
    'tianxiabachang': () => import('../data/authors-individual/author-tianxiabachang.json'),
    'jiangnan': () => import('../data/authors-individual/author-jiangnan.json'),
    'ergen': () => import('../data/authors-individual/author-ergen.json'),
  };
  const loader = map[authorId];
  return useQuery({
    queryKey: ['authorDetail', authorId],
    queryFn: () => loader ? loader().then(m => loadData(m.default)) : Promise.resolve(null),
    enabled: !!authorId && !!loader,
  });
}

// 影视
export function useActresses() {
  return useQuery({ queryKey: ['actresses'], queryFn: () => import('../data/actresses.json').then(m => loadData(m.default)) })
}

export function useMilestoneMovies() {
  return useQuery({ queryKey: ['milestoneMovies'], queryFn: () => import('../data/milestone-movies.json').then(m => loadData(m.default)) })
}

// 首页
export function useHomeCategories() {
  return useQuery({ queryKey: ['homeCategories'], queryFn: () => import('../data/home-categories.json').then(m => loadData(m.default)) })
}

// 导航
export function useNavItems() {
  return useQuery({ queryKey: ['navItems'], queryFn: () => import('../data/nav-items.json').then(m => loadData(m.default)) })
}

// 四大名著
export function useClassicsHome() {
  return useQuery({ queryKey: ['classicsHome'], queryFn: () => import('../data/classics-home.json').then(m => loadData(m.default)) })
}

export function useShuihuCharacters() {
  return useQuery({ queryKey: ['shuihuCharacters'], queryFn: () => import('../data/shuihu-characters.json').then(m => loadData(m.default)) })
}

export function useSanguoCharacters() {
  return useQuery({ queryKey: ['sanguoCharacters'], queryFn: () => import('../data/sanguo-characters.json').then(m => loadData(m.default)) })
}
