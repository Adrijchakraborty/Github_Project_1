import React from 'react';
import { FaGithub } from "react-icons/fa";

const Login = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-white text-black dark:bg-gray-900 dark:text-white'>
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
  );
}

export default Login;
