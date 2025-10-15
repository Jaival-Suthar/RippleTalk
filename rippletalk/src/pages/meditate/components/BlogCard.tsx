import React from "react";

interface BlogCardProps {
  title: string;
  description: string;
  url: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-gray-800 rounded-2xl p-5 hover:shadow-green-400/30 transition-all shadow-md"
    >
      <div className="absolute inset-0 bg-green-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-green-300 font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        <span className="inline-block mt-3 text-green-400 text-sm font-medium group-hover:underline">
          Read More →
        </span>
      </div>
    </a>
  );
};

export default BlogCard;
