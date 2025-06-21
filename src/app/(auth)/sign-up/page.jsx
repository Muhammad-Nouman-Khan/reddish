"use client";
import { useState } from "react";
import { Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp } from "@/lib/actions/auth.action";
import { getAuthErrorMessage } from "@/lib/utils";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
    resume: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { name, email, password } = signupData;
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const result = await signUp({
        uid: userCredentials.user.uid,
        name: name,
        email: email,
        password: password,
      });
      if (!result?.success) {
        toast.error(result?.message);
        setIsLoading(false);
        return;
      }
      toast.success(
        "Account created successfully. Please sign in to continue."
      );
      router.push("/sign-in");
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
            <form onSubmit={handleSignup}>
              <div className="space-y-3">
                {/* NAME */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nouman Khan"
                    className="input input-bordered w-full"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="someone@example.com"
                    className="input input-bordered w-full"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
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
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Profile Picture */}
                {/* <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Profile picture</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full "
                    value={signupData.profilePicture}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        profilePicture: e.target.value,
                      })
                    }
                  />
                </div> */}
                {/* Resume */}
                {/* <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Resume</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full "
                    value={signupData.resume}
                    onChange={(e) =>
                      setSignupData({ ...signupData, resume: e.target.value })
                    }
                  />
                </div> */}
                {/* Terms and Privacy Policy */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline">
                        privacy policy
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-xs">
                      Creating Account...
                    </span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Sign in
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

export default SignUp;
