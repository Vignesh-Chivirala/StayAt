import React from 'react'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="md:w-64 w-20 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 
      h-full text-base text-white flex flex-col py-6 shadow-lg transition-all duration-300">
      
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center py-3 px-5 md:px-8 gap-4 rounded-xl mx-3 my-1 
            transition-all duration-300 ${
              isActive
                ? "bg-white/20 backdrop-blur-md text-white shadow-md"
                : "hover:bg-white/10 text-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 opacity-90" src={item.icon} alt={item.name} />
          <p className="md:block hidden font-medium tracking-wide">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
