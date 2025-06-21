import Link from "next/link";
import { Bot, LogOut } from "lucide-react";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="w-12 h-12 text-primary " />
          <h2 className="text-primary text-2xl font-bold">TalkHire</h2>
        </Link>

        <form action={signOut}>
          <button type="submit" className="btn btn-outline btn-sm gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
