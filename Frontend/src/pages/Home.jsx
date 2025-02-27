import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BranchComponent from "../components/BranchComponent";
import Welcome from "../components/Welcome";
import { ImCross } from "react-icons/im";

const Home = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [branches, setBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [responsive, setResponsive] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRepos(currentPage);
    }
  }, [user, currentPage]);

  const fetchRepos = (page) => {
    fetch(`https://api.github.com/users/${user.username}/repos?per_page=5&page=${page}`)
      .then((res) => {
        // Extract the 'Link' header to determine the total number of pages
        const linkHeader = res.headers.get('Link');
        if (linkHeader) {
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
          if (totalPagesMatch) {
            setTotalPages(parseInt(totalPagesMatch[1], 10));
          }
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => console.error(err));
  };

  const fetchBranches = (repo) => {
    setSelectedRepo(repo); // Set repo to open the sidebar
    fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`)
      .then((res) => res.json())
      .then((data) => setBranches(data))
      .catch((err) => console.error(err));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Repository List */}
        {responsive && <motion.div
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-2/3 md:w-1/3 p-4 bg-gray-900 text-white overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Repositories</h2>
            <span onClick={() => setResponsive(false)} className="cursor-pointer"> <ImCross /> </span>
          </div>
          {repos.length > 0 && repos?.map((repo) => (
            <motion.div
              key={repo.id}
              className="p-3 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => fetchBranches(repo)}
            >
              {repo?.name}
            </motion.div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 px-2 md:px-4 py-2 md:py-2 rounded-lg disabled:bg-gray-500"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="md:text-lg text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg disabled:bg-gray-500"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </motion.div>}

      {/* Branches Sidebar */}
      {selectedRepo === null && <Welcome user={user} responsive={responsive} setResponsive={setResponsive} />}
      <AnimatePresence>
        {selectedRepo && (

          <motion.div
            className="w-full flex-1 md:w-2/3 p-4 bg-gray-800 text-white absolute right-0 h-full overflow-auto"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 12, opacity: 0}}
          >
            <button
              className="bg-red-500 px-4 py-2 mb-4"
              onClick={() => setSelectedRepo(null)}
            >
              Close
            </button>
            <h2 className="text-xl font-bold">{selectedRepo.name} - Branches</h2>
            {branches.length > 0 && branches?.map((branch) => (
              <BranchComponent key={branch?.name} repo={selectedRepo} branch={branch} user={user} />
            ))}
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
};

export default Home;