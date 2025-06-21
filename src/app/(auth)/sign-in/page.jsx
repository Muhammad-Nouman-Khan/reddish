"use client";
import { useState } from "react";
import Link from "next/link";
import { Bot } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn } from "@/lib/actions/auth.action";
import { getAuthErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password } = signinData;
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredentials.user.getIdToken();
      if (!idToken) {
        toast.error("Failed to sign in");
        setIsLoading(false);
        return;
      }
      const result = await signIn({
        email,
        idToken,
      });

      if (!result?.success) {
        toast.error(result?.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      toast.success("Signed in successfully");
      router.push("/");
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="border-2 border-primary flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Bot className="w-10 h-10 text-primary " />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              TalkHire
            </span>
          </div>

          <div className="w-full mt-4">
            <form onSubmit={handleSignin}>
              <div className="space-y-3">
                {/* Email */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="someone@example.com"
                    className="input input-bordered w-full"
                    value={signinData.email}
                    onChange={(e) =>
                      setSigninData({ ...signinData, email: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Password */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    className="input input-bordered w-full"
                    value={signinData.password}
                    onChange={(e) =>
                      setSigninData({ ...signinData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <button
                className="btn btn-primary w-full mt-5"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-xs">
                      Signing In...
                    </span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/interview.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h3 className="text-2xl ">Practice job interviews with AI</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
