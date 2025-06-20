import Link from "next/link";
import { Bot } from "lucide-react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isAuthenticated) redirect("/sign-in");
  return (
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Bot className="w-12 h-12 text-primary " />
          <h2 className="text-primary text-2xl font-bold">TalkHire</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
