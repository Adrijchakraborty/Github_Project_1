import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BranchComponent from "../components/BranchComponent";

const Home = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [branches, setBranches] = useState([]);

  console.log(repos, branches)

  useEffect(() => {
    if (user) {
      fetch(`https://api.github.com/users/${user.username}/repos`)
        .then((res) => res.json())
        .then((data) => setRepos(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const fetchBranches = (repo) => {
    setSelectedRepo(repo); // Set repo to open the sidebar
    fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`)
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen">
      {/* Repository List */}
      <motion.div
        className="w-1/3 p-4 bg-gray-900 text-white overflow-auto"
        initial={{ x: 0 }}
        animate={{ x: selectedRepo ? "-100%" : 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Your Repositories</h2>
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            className="p-3 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            onClick={() => fetchBranches(repo)}
          >
            {repo.name}
          </motion.div>
        ))}
      </motion.div>

      {/* Branches Sidebar */}
      {selectedRepo && (
        <motion.div
          className="w-2/3 p-4 bg-gray-800 text-white absolute right-0 h-full overflow-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="bg-red-500 px-4 py-2 mb-4"
            onClick={() => setSelectedRepo(null)}
          >
            Close
          </button>
          <h2 className="text-xl font-bold">{selectedRepo.name} - Branches</h2>
          {branches.map((branch) => (
            <BranchComponent key={branch.name} repo={selectedRepo} branch={branch} user={user} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;


// import React from 'react'
// import useStore from '../zustand/useStore.js'


// const Home = () => {
//   const { user } = useStore()
//   console.log(user)
//   return (
//     <div>
//       {user ? (
//         <div>
//           <h2>Welcome, {user.displayName || user.username || "User"}</h2>
//           {user.photos?.[0]?.value ? (
//             <img src={user.photos[0].value} alt="Profile" />
//           ) : (
//             <p>No Profile Picture</p>
//           )}
//           <p>Email: {user.emails?.[0]?.value || "Email not available"}</p>
//         </div>
//       ) : (
//         <a href="/auth/github">Login with GitHub</a>
//       )}
//     </div>
//   )
// }

// export default Home