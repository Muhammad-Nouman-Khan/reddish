import React, { ReactNode } from "react";

//whats reactnode ? : it is a type that represents any react element.
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
