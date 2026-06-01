import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SolarSystem from './components/Astronomy/SolarSystem'
import SolarSystem3D from './components/Astronomy/SolarSystem3D'
import AstronomyHome from './components/Astronomy/AstronomyHome'
import LunarOrbit from './components/Astronomy/LunarOrbit'
import MoonLanding from './components/Astronomy/MoonLanding'
import TangSongEightMasters from './components/History/TangSongEightMasters'
import ChineseHeroines from './components/History/ChineseHeroines'
import ChineseEmpresses from './components/History/ChineseEmpresses'
import HonglouDream from './components/History/HonglouDream'
import XiyoujiHeroines from './components/History/XiyoujiHeroines'
import GeneralsPage from './components/History/GeneralsPage'
import PoetsPage from './components/History/PoetsPage'
import HistoryHome from './components/History/HistoryHome'
import WebNovelHome from './components/WebNovel/WebNovelHome'
import ChendongUniverse from './components/WebNovel/ChendongUniverse'
import AuthorWorkPage from './components/WebNovel/AuthorWorkPage'
import NovelWorkPage from './components/WebNovel/NovelWorkPage'
import PerfectWorldHeroines from './components/WebNovel/PerfectWorldHeroines'
import ShengxuHeroines from './components/WebNovel/ShengxuHeroines'
import ZhetianHeroines from './components/WebNovel/ZhetianHeroines'
import XuezhongHeroines from './components/WebNovel/XuezhongHeroines'
import MoreNovels from './components/WebNovel/MoreNovels'
import AuthorsHome from './components/Authors/AuthorsHome'
import AuthorDetailPage from './components/Authors/AuthorDetailPage'
import ChineseActresses from './components/Actresses/ChineseActresses'
import ClassicsHome from './components/Classics/ClassicsHome'
import ClassicsPage from './components/Classics/ClassicsPage'
import ArtsHome from './components/Arts/ArtsHome'
import ArtsSubPage from './components/Arts/ArtsSubPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 天文动画 */}
        <Route path="/astronomy" element={<AstronomyHome />} />
        <Route path="/solar-system" element={<SolarSystem />} />
        <Route path="/solar-system-3d" element={<SolarSystem3D />} />
        <Route path="/lunar-orbit" element={<LunarOrbit />} />
        <Route path="/moon-landing" element={<MoonLanding />} />

        {/* 历史人物 */}
        <Route path="/history" element={<HistoryHome />} />
        <Route path="/tang-song" element={<TangSongEightMasters />} />
        <Route path="/heroines" element={<ChineseHeroines />} />
        <Route path="/empresses" element={<ChineseEmpresses />} />
        <Route path="/honglou" element={<HonglouDream />} />
        <Route path="/xiyouji" element={<XiyoujiHeroines />} />
        <Route path="/generals" element={<GeneralsPage />} />
        <Route path="/poets" element={<PoetsPage />} />

        {/* 网文宇宙 */}
        <Route path="/webnovel" element={<WebNovelHome />} />
        {/* 旧路由兼容（辰东宇宙总览） */}
        <Route path="/webnovel/chendong" element={<ChendongUniverse />} />
        {/* 新路由：作者页 */}
        <Route path="/webnovel/author/:authorId" element={<AuthorWorkPage />} />
        {/* 新路由：作品子页 */}
        <Route path="/webnovel/author/:authorId/:workId" element={<NovelWorkPage />} />
        {/* 旧路由兼容（辰东子页） */}
        <Route path="/webnovel/perfect-world" element={<PerfectWorldHeroines />} />
        <Route path="/webnovel/shengxu" element={<ShengxuHeroines />} />
        <Route path="/webnovel/zhetian" element={<ZhetianHeroines />} />
        <Route path="/webnovel/xuezhong" element={<XuezhongHeroines />} />
        <Route path="/webnovel/more" element={<MoreNovels />} />

        {/* 作者 */}
        <Route path="/authors" element={<AuthorsHome />} />
        <Route path="/authors/:authorId" element={<AuthorDetailPage />} />

        {/* 影视 */}
        <Route path="/actresses" element={<ChineseActresses />} />

        {/* 四大名著 */}
        <Route path="/classics" element={<ClassicsHome />} />
        <Route path="/classics/:bookId" element={<ClassicsPage />} />

        {/* 琴棋书画 */}
        <Route path="/arts" element={<ArtsHome />} />
        <Route path="/arts/:type" element={<ArtsSubPage />} />
      </Routes>
    </>
  )
}

export default App
