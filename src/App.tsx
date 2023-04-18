import React from 'react'
import { useRoutes } from 'react-router-dom'
import Sidebar from './components/sidebar/indes'
import { routes } from './router'
import 'antd/dist/reset.css'

function App() {
  return (
    <div className="App">
      <div className="content">{useRoutes(routes)}</div>
    </div>
  )
}

export default App
