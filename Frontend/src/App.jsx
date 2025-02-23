import React, { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/user", { credentials: "include" }) // Important: allows session cookies
      .then((res) => res.json())
      .then((data) => {
        if(data?.error) {
          console.log(data.error)
          return;
        }
        console.log(data)
        setUser(data)
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(user)

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || user.username || "User"}</h2>
          {user.photos?.[0]?.value ? (
            <img src={user.photos[0].value} alt="Profile" />
          ) : (
            <p>No Profile Picture</p>
          )}
          <p>Email: {user.emails?.[0]?.value || "Email not available"}</p>
        </div>
      ) : (
        <a href="/auth/github">Login with GitHub</a>
      )}
    </div>
  );
};

export default App;
