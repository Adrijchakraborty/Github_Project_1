import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { GiHamburgerMenu } from "react-icons/gi";

const Welcome = ({ user, responsive, setResponsive }) => {
    const handleClick = () => {
        setResponsive(true)
    }
    return (
        <div
            
            className='flex-1 bg-gray-800 text-white flex flex-col justify-center items-center relative'
        >
            {!responsive && <div className='absolute top-0 left-0 p-4 text-3xl'>
                <AnimatePresence>
                <motion.span
                    initial={{  opacity: 0 }}
                    animate={{  opacity: 1 }}
                    exit={{  opacity: 0 }}
                    transition={{duration:0.5}}
                    onClick={handleClick} className='cursor-pointer'><GiHamburgerMenu /></motion.span></AnimatePresence>
            </div>}
            <p className=' text-2xl'>Welcome {user.username}</p>
            <p>click a repo in sidebar</p>
        </div>
    )
}

export default Welcome