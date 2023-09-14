import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({
    id: null,
    jwt: null,
    nickname: null,
    profile_image_url: null,
  });

  const setUser = (id, jwt) => {
    setUserInfo({ id: id, jwt: jwt });
  };

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
