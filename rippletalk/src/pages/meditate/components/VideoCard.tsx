import React from "react";

interface VideoCardProps {
  title: string;
  url: string;
  description: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, url, description }) => {
  return (
    <div className="relative group bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-green-400/30 transition-shadow">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-green-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity" />
      
      <div className="relative z-10">
        <iframe
          src={url.replace("watch?v=", "embed/")}
          title={title}
          loading="lazy"
          className="w-full aspect-video rounded-lg border border-gray-700"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
        <h3 className="mt-3 text-lg font-semibold text-green-300">{title}</h3>
        <p className="text-gray-300 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
