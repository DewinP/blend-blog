import React, { ReactNode } from "react";
import { IUserContext } from "../interfaces";

export const UserContext = React.createContext({});

export const UserContextProvider: React.FC<ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<IUserContext>({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
