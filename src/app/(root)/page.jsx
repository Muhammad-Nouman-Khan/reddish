import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <section className="flex flex-row bg-base-300 gap-10 rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-4xl font-bold">
            Get Interview Ready with AI-Powered Coaching
          </h2>
          <p className="text-lg ">
            Practice with real interview questions and get personalized feedback
            to land your dream job.
          </p>
          <button className="btn btn-primary">
            <Link href="/interview">Get Started</Link>
          </button>
        </div>
        <img
          src="/chatbot.png"
          alt="robot"
          className="hidden md:block w-80 h-80"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold">Your Interviews</h2>
        <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p className="opacity-70">You haven't taken any interviews yet</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-bold">Take an Interview</h2>
        <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
