import React, { useEffect, useState,useRef} from 'react'
import logo from "../../assets/Logo/upscale logo -2.png"
import { Link, matchPath} from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaCartArrowDown } from "react-icons/fa";
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from "react-icons/bs";
import ProfileDropdown from '../core/Auth/profileDropDown'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"

import axios from 'axios'

const NavBar = () => {
  
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.card);
  const location = useLocation()
  
  const ref = useRef(null)
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [open,setOpen] = useState(true);

  const fetchSubLinks = async() => {
    setLoading(true)
     try{
      await axios.get(process.env.REACT_APP_BASE_URL+"/course/showAllCategories").then((response)=>{
        // console.log("printing subLinks result : ",response.data.data);
        setSubLinks(response.data.data);
       setLoading(false)

      }) 
     }
    catch(error){
       console.log("Could not fetch the category list")
       setLoading(false)
     } 
    
  }
   useEffect(() => {
    fetchSubLinks();
  }, [])

  // useEffect(() => {
  //    (async () => {
  //      setLoading(true)
  //      try {
  //        await axios.get(process.env.REACT_APP_BASE_URL+"/course/showAllCategories").then((response)=>{
  //          setSubLinks(response.data.data)
  //        })         
  //      } catch (error) {
  //        console.log("Could not fetch Categories.", error)
  //      }
  //      setLoading(false)
  //    })()
  //  },[])

  const matchRoute = (route) =>{
    return matchPath({path:route}, location.pathname)
  }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        
        {/* Image */}
        <Link to="/">
            <img src={logo} width={180} height={48} alt="imageloading" />
        </Link>

        {/* NavBar Link */}

        <nav className="">
          <ul className="flex md:gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              // ?.filter(
                              //   (subLink) => subLink?.courses?.length > 0
                              // )
                              ?.map((subLink, i) => (
                                
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25 hidden md:block"
                          : "text-richblack-25 hidden md:block"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>




        {/* login sign and dashborad */}
        <div className='flex gap-x-4 items-center'>
              {
                user && user?.accountType !== "Instrutor" && (
                  <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart className='text-2xl text-richblack-100' />
                    {
                      totalItems > 0 && (
                        <span>
                          {totalItems}
                        </span>
                      )
                    }
                  </Link>
                )
              }

              {
                token === null && (
                  <Link to="/login">
                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                    text-richblack-25 rounded-md'>
                      Log in
                    </button>
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                  text-richblack-25 rounded-md'>
                    <button>
                      Sign up
                    </button>
                  </Link>
                )
              }

              {
                token !== null && <ProfileDropdown/>
              }
              
        </div>
        

        <button className="relative mr-1 md:hidden" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 w-[120px] overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 "
          ref={ref}
        >

{NavbarLinks.map((link, index) => (
              <li key={index} className="list-none">
                {link.title === "Catalog" ? (
                  <>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25 py-2"
                          : "text-richblack-25 py-2"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          
        </div>
      )}
    </button>
      </div>
    </div>
  )
}

export default NavBar
