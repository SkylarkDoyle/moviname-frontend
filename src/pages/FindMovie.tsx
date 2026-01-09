import { useEffect } from "react";
import BGCollage from "../components/BGCollage";
import AdBanner from "../components/AdBanner";

/**
 * SEO Landing page for movie identification keywords.
 * This page is intentionally kept minimal to focus on SEO-friendly content.
 */
const FindMovie = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title =
      "Find Movie Name | Identify Movie from Clip & Video - movíename";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Identify movie names from clips, TikTok videos, and descriptions. Use our AI movie identifier to find what movie is this instantly."
      );
    }

    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "what movie is this, find movie name from clip, identify movie from video, what is the name of this movie, movie name finder by scene, find movie by describing it, movie identifier AI, search movie by screenshot, reverse movie search, how to find movie name from tiktok, find movie from instagram reel, what movie is this tiktok clip from, identify movie from youtube short, tiktok movie name finder, source of this movie clip, shazam for movies, whatismymovie alternative, reverse image search for films, soundhound for movies, AI film finder, movie where a guy action, find movie by plot description, identify movie with only one scene, find title of movie I remember"
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      <BGCollage />
      <AdBanner />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Identify Any Movie
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Searching for a movie name? Our AI-powered tool helps you find
            movies from clips, screenshots, or even vague descriptions.
          </p>
        </div>

        {/* Hidden SEO Keywords for Search Indexing */}
        <div className="sr-only" aria-hidden="true">
          <h2>Popular Movie Search Terms</h2>
          <ul>
            <li>what movie is this</li>
            <li>find movie name from clip</li>
            <li>identify movie from video</li>
            <li>what is the name of this movie</li>
            <li>movie name finder by scene</li>
            <li>find movie by describing it</li>
            <li>movie identifier AI</li>
            <li>search movie by screenshot</li>
            <li>reverse movie search</li>
            <li>how to find movie name from tiktok</li>
            <li>find movie from instagram reel</li>
            <li>what movie is this tiktok clip from</li>
            <li>identify movie from youtube short</li>
            <li>tiktok movie name finder</li>
            <li>source of this movie clip</li>
            <li>shazam for movies</li>
            <li>whatismymovie alternative</li>
            <li>reverse image search for films</li>
            <li>soundhound for movies</li>
            <li>AI film finder</li>
            <li>movie where a guy [action]</li>
            <li>find movie by plot description</li>
            <li>identify movie with only one scene</li>
            <li>find title of movie I remember</li>
          </ul>
        </div>

        {/* Call to action (optional, but good for UX) */}
        <div className="my-12">
          <a
            href="/"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
          >
            Go to Home Finder
          </a>
        </div>
        <AdBanner />
      </div>
    </div>
  );
};

export default FindMovie;
