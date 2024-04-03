import * as React from "react";
import Button from "@mui/material/Button";

type NavButtonProp = {
  path: string;
  buttonType: string;
  name: string;
};

const NavButton: React.FC<NavButtonProp> = ({ path, name }) => {
  return (
    <div>
      <Button variant="contained" href={path}>
        {name}
      </Button>
    </div>
  );
};

export default NavButton;
