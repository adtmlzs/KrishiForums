import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Forum from './pages/Forum';
import ForumDetail from './pages/ForumDetail';
import AskQuestion from './pages/AskQuestion';
import Updates from './pages/Updates';
import Admin from './pages/Admin';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<ForumDetail />} />
            <Route path="/forum/ask" element={<AskQuestion />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
