import './index.less'
import { FC } from 'react'

import User from '../User/index'
import SideNav from '../SideNav/index'

const Sidebar: FC = () => {
  return (
    <aside className="app-sidebar">
      <User />
      <SideNav />
    </aside>
  )
}

export default Sidebar;