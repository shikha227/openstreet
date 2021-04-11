import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";


 function Header() {
  const displayDesktop = () => {
    return <Toolbar>Welcome</Toolbar>;
  };
  
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
export default Header;