import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {PiSignOutThin} from 'react-icons/pi';
import {BiHomeAlt,BiLogoProductHunt} from 'react-icons/bi';
import {BsPeople} from 'react-icons/bs';
import {HiOutlineClipboardCopy} from 'react-icons/hi';
import {GrMultimedia} from 'react-icons/gr';





const SidebarData = [
  {
    icon: BiHomeAlt,
    heading: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: HiOutlineClipboardCopy,
    heading: 'Orders',
    path: '/dashboard/orders',
  },
  {
    icon: BiLogoProductHunt,
    heading: 'Products',
    path: '/dashboard/products',
  },
  {
    icon: GrMultimedia,
    heading: 'Media',
    path: '/dashboard/media',
  },
  {
    icon: BsPeople,
    heading: 'Users',
    path: '/dashboard/users',
  },
];
const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  // const [expanded, setExpanded] = useState(true);
   return (
    <div className='Sidebar'>
    <div className='logo'>
      
      <span>
        St<span>o</span>re
      </span>
    </div>

    {/* Menu */}
    <div className='menu'>
      {SidebarData.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.path}
            className={selected === index ? 'menuItem active' : 'menuItem'}
            onClick={() => setSelected(index)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </Link>
        );
      })}
      <Link to='/' className='menuItem'>
        <PiSignOutThin />
      </Link>
    </div>
  </div>
  )
}

export default Sidebar