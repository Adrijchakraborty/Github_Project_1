import React from 'react';
import { FaGithub } from "react-icons/fa";

const Login = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white text-black dark:bg-gray-900 dark:text-white'>
      <div className='flex flex-col gap-10 justify-center items-center'>
        <div className='flex flex-col gap-2'> 
          <h1 className='text-3xl font-bold text-center'>Login with Github</h1>
          <span className='border-b border-black dark:border-white w-full'></span>
        </div>
        <a
          className='px-3 py-2 shadow-xl bg-black text-white hover:bg-gray-900 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 transition duration-300'
          href='/auth/github'
        >
          <span className='flex items-center gap-2'>
            <FaGithub />
            <p>Login with Github</p>
          </span>
        </a>
      </div>
      {/* <a
          className='px-3 py-2 shadow-xl bg-black text-white hover:bg-gray-900 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 transition duration-300'
          href='/auth/github'
        >
          <span className='flex items-center gap-2'>
            <FaGithub />
            <p>Login with Github</p>
          </span>
        </a> */}
    </div>
  );
}

export default Login;
