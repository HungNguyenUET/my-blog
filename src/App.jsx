import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className='max-w-3xl mx-auto p-4'>
        <nav className='mb-6'>
          <Link to="/" className="mr-4 text-blue-600 font-bold">Home</Link>
          <Link to="/about" className="text-blue-600 font-bold">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/posts/:id" element={<PostDetail />}></Route>
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
