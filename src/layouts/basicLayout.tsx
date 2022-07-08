import { Routes, Route } from 'react-router-dom'
import styles from './basicLayout.less'
import Header from './components/header'

import Home from '@/pages/home'

export default function BasicLayout() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  )
}
