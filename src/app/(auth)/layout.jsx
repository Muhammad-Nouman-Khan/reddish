import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
const AuthLayout = async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");
  return <div>{children}</div>;
};

export default AuthLayout;
