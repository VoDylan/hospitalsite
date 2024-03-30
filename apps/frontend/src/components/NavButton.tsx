import * as React from "react";
import Button from "@mui/material/Button";

type NavButtonProp = {
  path: string;
  buttonType: string;
  name: string;
};

const NavButton: React.FC<NavButtonProp> =({
    path, buttonType, name
}) => {
    return (
        <div>
            <Button variant={buttonType} href={path}>
                {name}
            </Button>
        </div>
    );
};


export default NavButton;
