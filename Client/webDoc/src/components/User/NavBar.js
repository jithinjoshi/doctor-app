import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectUser } from '../../Redux/User/userSlice'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const user = useSelector(selectUser);
  console.log(user,":::::");
  const dispatch = useDispatch()
 

  return (

    <header aria-label="Site Header" class="shadow-sm bg-indigo-300">
      <div
        class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4"
      >
        <div class="flex w-0 flex-1 lg:hidden">

        </div>

        <div class="flex items-center gap-4">
          <h1 className='text-black'>webDoc</h1>


        </div>


        <div class="hidden items-center gap-4 lg:flex">
          {
            user ?
              <Link
                onClick={() => dispatch(logout())}
                to='/'
                class="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-black-600"
              >
                Log out
              </Link>
              :
              <div className='hidden items-center gap-4 lg:flex'>
                <Link
                  to='/signin'
                  class="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-black-600"
                >
                  Log in
                </Link>

                <Link
                  to='/signup'
                  class="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black"
                >
                  Sign up
                </Link>
              </div>
          }
        </div>
      </div>

    </header>

  )
}

export default NavBar