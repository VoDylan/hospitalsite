import {withAuthenticationRequired} from "@auth0/auth0-react";
import React, {ComponentType} from "react";

interface AuthenticationProps {
  component: ComponentType<{
    className?: string;
  }>;
}

export const Auth0Protection: React.FC<AuthenticationProps> = ({component: Component,}) => {
  const WrappedComponent = withAuthenticationRequired(Component);

  return <WrappedComponent/>;
};
