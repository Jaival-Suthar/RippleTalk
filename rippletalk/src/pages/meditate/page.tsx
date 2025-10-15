import React from "react";
import VideoCard from "./components/VideoCard";
import BlogCard from "./components/BlogCard";
import { videos, blogs } from "./data";

const MeditatePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-6 sm:px-16">
      <section className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">
          Find Your Inner Ripple 🌊
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Take a deep breath. Reflect. Grow. Explore curated meditations and thought-provoking reads that fuel your emotional resilience.
        </p>
      </section>

      {/* Video Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-green-300 mb-6 text-center">
          Guided Meditation Videos
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <h2 className="text-2xl font-semibold text-green-300 mb-6 text-center">
          Insightful Blog Posts
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MeditatePage;
