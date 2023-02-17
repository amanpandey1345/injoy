import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const Header = () => {


    const router = useRouter()

    const styles ="bg-orange-500 p-1 px-5 rounded-md"
    const styles1 ="hover:bg-orange-500 p-1 px-5 rounded-md"
    

  return (
    <div className=' w-full flex justify-around bg-yellow-300 p-4  ' >
        {/* <p>{router.pathname}</p> */}
        <Link href={"/"} className={router.pathname == "/" ? styles:styles1} >Home</Link>
        <Link href={"/subject"} className={router.pathname == "/subject" ? styles:styles1} >Subject</Link>
        <Link href={"/chapter"} className={router.pathname == "/chapter" ? styles:styles1} >Chapter</Link>
        <Link href={"/topic"} className={router.pathname == "/topic" ? styles:styles1} >Topic</Link>
    </div>
  )
}

export default Header