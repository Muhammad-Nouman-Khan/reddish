import dayjs from "dayjs";
import { getRandomInterviewCover } from "@/lib/utils";
import { CalendarRange, Star } from "lucide-react";
import Link from "next/link";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}) => {
  const feedback = null;
  const normalizedType = /mixed/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  return (
    <div className="card-bordered border-primary/50 p-0.5 rounded-2xl w-full lg:w-[360px] min-h-96 bg-base-300 shadow-2xl">
      <div className="rounded-2xl min-h-full flex flex-col p-6 relative overflow-hidden gap-10 justify-between">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 bg-secondary/70 rounded-bl-lg">
            <p className="text-sm font-semibold capitalize">{normalizedType}</p>
          </div>
          <img
            src={getRandomInterviewCover()}
            alt="coverimage"
            className="w-[90px] h-[90px] object-contain size-[90px]"
          />
          <h3 className="text-2xl mt-5 capitalize font-bold">
            {role} Interview
          </h3>
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <CalendarRange className="w-5 h-5 text-primary" />
              <p className="text-sm text-base-content/80">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Star className="fill-primary text-primary w-4 h-4" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />
          <button className="btn btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
