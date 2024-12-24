import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../api/user";

const GlobalContext = createContext();
export const useGlobalContext = useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsloggedIn(true);
          setUser(res);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsloggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
