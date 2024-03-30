import * as React from "react";
import Button from "@mui/material/Button";

type NavButtonProp = {
  path: string;
  buttonType: string;
  name: string;
};

function NavButton(props: NavButtonProp) {
  return (
    <div>
      <Button variant={props.buttonType} href={props.path}>
        {props.name}
      </Button>
    </div>
  );
}

export default NavButton;
