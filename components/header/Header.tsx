import { useMemo } from "react";
import { useMoralis } from "react-moralis";
import AuthStep from "./AuthStep";
import HeaderIcon from "./HeaderIcon";

const styles = {
  header: "p-4 dark:bg-gray-800 dark:text-gray-100",
  headerContainer: "container flex justify-between h-16 mx-auto",
  heading: "flex items-center px-2 font-semibold text-lg",
};

const Header = () => {
  const { authenticate, logout, isAuthenticated, user, Moralis } = useMoralis();

  const userAddress = useMemo((): string => {
    if (!user) return "";

    const initialAddress = user?.get("ethAddress");
    const firstLetters = initialAddress.slice(0, 5);
    const truncate = "...";
    const lastLetters = initialAddress.slice(-3);
    const formattedAddress = firstLetters + truncate + lastLetters;

    return formattedAddress;
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <HeaderIcon />
        {user && <h1 className={styles.heading}>Welcome {userAddress}</h1>}
        {isAuthenticated ? (
          <AuthStep clickHandler={logout} buttonText="Logout" />
        ) : (
          <AuthStep clickHandler={authenticate} buttonText="Log in" />
        )}
      </div>
    </header>
  );
};

export default Header;
