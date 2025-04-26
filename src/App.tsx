import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import NotFound from './pages/NotFound'
import EditPost from './pages/EditPost'
import FullPost from './pages/FullPost'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='create' element={<CreatePost />} />
          <Route path='edit/:id' element={<EditPost />} />
          <Route path='post/:id' element={<FullPost />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
