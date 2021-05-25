import './index.less';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import MyIcon from '../../Icons'

const LinkItem: FC<{ name: string; to: string; icon: React.ReactElement }> = ({
  name,
  to,
  icon,
}) => {
  return (
    <li>
      <NavLink
        exact
        activeClassName="link-item-active"
        className="link-item"
        to={to}
      >
        {icon}
        <span className="link-item-text">{name}</span>
      </NavLink>
    </li>
  );
};

const SideNav: FC = () => {
  return (
    <div className="app-side-nav">
      <ul>
        <LinkItem to="/" name="发现音乐" icon={<MyIcon type="icon-xuanzhongshangcheng" />} />
        <LinkItem to="fm" name="私人FM" icon={<MyIcon type="icon-fm" />} />
      </ul>
    </div>
  );
};

export default SideNav;
