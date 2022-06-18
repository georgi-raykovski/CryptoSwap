import { useMemo } from "react";
import { useMoralis } from "react-moralis";
import { headerStyles } from "../styles/header";
import AuthStep from "./AuthStep";
import HeaderIcon from "./HeaderIcon";

const Header = () => {
  const { authenticate, logout, isAuthenticated, user, Moralis } = useMoralis();

  const userAddress = useMemo((): string => {
    if (!user) return "";

    const initialAddress = user?.get("ethAddress");
    const firstLetters = initialAddress.slice(0, 5);
    const truncate = "...";
    const lastLetters = initialAddress.slice(-5);
    const formattedAddress = firstLetters + truncate + lastLetters;

    return formattedAddress;
  }, [user]);

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContainer}>
        <HeaderIcon />
        {user && <h1 className={headerStyles.heading}>Welcome {userAddress}</h1>}
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
