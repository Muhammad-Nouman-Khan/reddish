"use client";
import { useEffect, useState } from "react";
import { getTechLogos } from "@/lib/utils";

const DisplayTechIcons = ({ techStack }) => {
  const [techIcons, setTechIcons] = useState([]);

  useEffect(() => {
    const fetchTechIcons = async () => {
      const icons = await getTechLogos(techStack);
      setTechIcons(icons);
    };
    fetchTechIcons();
  }, [techStack]);

  return (
    <div className="flex flex-row gap-1">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className="relative group bg-base-content rounded-full p-2 px-3 flex items-center justify-center"
        >
          <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-700 rounded-md shadow-md">
            {tech}
          </span>
          <img src={url} alt={tech} className="w-5 h-5" />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
