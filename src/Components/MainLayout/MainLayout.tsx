import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

import "./_MainLayout.scss"

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
