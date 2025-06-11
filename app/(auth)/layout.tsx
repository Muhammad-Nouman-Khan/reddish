import React, { ReactNode } from "react";

//whats reactnode ? : it is a type that represents any react element.
const layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
