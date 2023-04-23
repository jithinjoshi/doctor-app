import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import control from '../../assets/control.png'
import Chart_fill from '../../assets/Chart_fill.png'
import Chat from '../../assets/Chat.png'
import User from '../../assets/User.png'
import Calendar from '../../assets/Calendar.png'
import Search from '../../assets/Search.png'
import Folder from '../../assets/Folder.png'
import Setting from '../../assets/Setting.png'
import { Link } from 'react-router-dom'


const SideBar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Home", src: Chart_fill },
      { title: "Chats", src: Chat },
      { title: "Doctors", src: User, gap: true, link:'/doctors' },
      { title: "Schedule ", src: Calendar },
      { title: "Search", src: Search },
      { title: "Health Reports ", src: Folder, gap: true },
      { title: "Settings", src: Setting },
    ];
  
  return (
    <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-indigo-300    h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Designer
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => {
                return(
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={Menu.src} alt={Menu.src} />
                <Link className={`${!open && "hidden"} origin-left duration-200`} to={Menu.link}>
                  {Menu.title}
                </Link>
              </li>
            )
            })}
          </ul>
        </div>
  )
}

export default SideBar