import React, { useState } from "react";
import { motion } from "framer-motion";

import { MdKeyboardArrowDown } from "react-icons/md";

const BranchComponent = ({ repo, branch, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [issues, setIssues] = useState([]);
  const [pullRequests, setPullRequests] = useState([]);

  const fetchDetails = () => {
    setShowDetails(!showDetails);

    // Fetch issues
    fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues`)
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error(err));

    // Fetch PRs
    fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => setPullRequests(data))
      .catch((err) => console.error(err));
  };
  
  return (
    <motion.div className="p-3 bg-gray-700 rounded-lg mb-2">
      <motion.div
        className="cursor-pointer hover:bg-gray-600 p-2 rounded flex justify-between items-center"
        onClick={fetchDetails}
      >
        <p>{branch?.name}</p>
        <MdKeyboardArrowDown/>
      </motion.div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 mt-2 bg-gray-600 rounded-lg"
        >
          <h3 className="text-lg font-semibold">Pull Requests</h3>
          {pullRequests.length > 0 ? (
            pullRequests.map((pr) => <p key={pr.id}>{pr.title}</p>)
          ) : (
            <p>No PRs found</p>
          )}

          <h3 className="text-lg font-semibold mt-2">Issues</h3>
          {issues.length > 0 ? (
            issues.map((issue) => <p key={issue.id}>{issue.title}</p>)
          ) : (
            <p>No Issues found</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BranchComponent;
