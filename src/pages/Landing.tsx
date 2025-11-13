import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Waves } from "@/components/ui/wave-background";
import { SocialCard } from "@/components/ui/social-card";

export function Landing() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<"signup" | "signin" | null>(null);
  
  // --- Infinite-scroll mock state ---
  type MockPost = {
    id: string;
    author: { name: string; username: string; avatar?: string; timeAgo?: string };
    content: { text: string };
    engagement: { likes: number; comments: number; shares: number };
  };

  const feedRef = useRef<HTMLDivElement | null>(null);
  const [posts, setPosts] = useState<MockPost[]>(() => {
    // seed with a few posts
    const seed: MockPost[] = [];
    for (let i = 1; i <= 6; i++) {
      seed.push({
        id: `p_init_${i}`,
        author: { name: `User ${i}`, username: `user${i}`, avatar: `https://i.pravatar.cc/100?img=${10 + i}`, timeAgo: `${i}h` },
        content: { text: `This is a sample post #${i} — welcome to GraceNook.` },
        engagement: { likes: Math.floor(Math.random() * 60), comments: Math.floor(Math.random() * 8), shares: Math.floor(Math.random() * 4) },
      });
    }
    return seed;
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const maxPosts = 60;

  const generateMockPost = (index: number): MockPost => ({
    id: `p_${Date.now()}_${index}`,
    author: { name: `Person ${index}`, username: `person${index}`, avatar: `https://i.pravatar.cc/100?img=${20 + (index % 70)}`, timeAgo: `${(index % 12) + 1}h` },
    content: { text: [`Lovely day for a walk.`, `Sharing a quick update from my day.`, `Anyone else reading something great?`, `Here are photos from the weekend.`][index % 4] + ` (post ${index})` },
    engagement: { likes: Math.floor(Math.random() * 120), comments: Math.floor(Math.random() * 20), shares: Math.floor(Math.random() * 5) },
  });

  useEffect(() => {
    const onScroll = () => {
      if (loadingMore) return;
      // if near bottom of the page, load more
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.body.offsetHeight;
      if (scrollBottom >= docHeight - 600 && posts.length < maxPosts) {
        setLoadingMore(true);
        // simulate network
        setTimeout(() => {
          setPosts((prev) => {
            const next: MockPost[] = [];
            const start = prev.length + 1;
            for (let i = start; i < start + 6 && prev.length + next.length < maxPosts; i++) {
              next.push(generateMockPost(i));
            }
            return [...prev, ...next];
          });
          setLoadingMore(false);
        }, 700 + Math.random() * 600);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadingMore, posts.length]);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Left & Right wave edges (hidden on small screens) */}
      <div className="hidden md:block pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-[28%] overflow-hidden -z-10">
          <div className="translate-x-[-20%]">
            <Waves strokeColor="#3b82f6" backgroundColor="transparent" pointerSize={0.9} />
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[28%] overflow-hidden -z-10">
          <div className="translate-x-[20%] rotate-180">
            <Waves strokeColor="#6366f1" backgroundColor="transparent" pointerSize={0.9} />
          </div>
        </div>
      </div>

      {/* Main hero + two-column content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column: headline + CTAs */}
          <div className="pt-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Connect with friends and the world around you on GraceNook.
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              See photos and updates from your friends in a feed that focuses on people, not algorithms.
            </p>

            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => navigate("/auth/signup")}
                size="lg"
                className="bg-blue-600 text-white px-6 py-3"
              >
                Create an account
              </Button>
              <Button
                onClick={() => navigate("/auth/signin")}
                variant="outline"
                className="px-6 py-3"
              >
                Sign in
              </Button>
            </div>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Share updates with friends</li>
              <li>• Join groups to meet people who share your interests</li>
              <li>• Control your privacy and data</li>
            </ul>
          </div>

          {/* Right column: blurred feed preview */}
          <div className="pt-8">
            <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden relative">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview of your feed</h3>
                <div className="space-y-6 relative">
                  {/* Infinite-scroll mimic: render blurred mock posts and append as user scrolls */}
                  {/** posts will be rendered here by state below */}
                </div>
                <div className="h-6" />
              </div>

              {/* Overlay to require sign-in */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <p className="text-center text-gray-800 font-medium mb-4">Sign in to see and interact with your feed</p>
                <div className="flex gap-3">
                  <Button onClick={() => navigate("/auth/signin")} className="px-5 py-2">Sign in</Button>
                  <Button variant="outline" onClick={() => navigate("/auth/signup")} className="px-5 py-2">Create account</Button>
                </div>
              </div>
            </div>

            {/* Below the preview: a long blurred feed that grows as the user scrolls */}
            <div className="mt-8 max-w-xl mx-auto">
              <div
                ref={feedRef}
                className="space-y-6"
              >
                {posts.map((p) => (
                  <div key={p.id} className="filter blur-sm">
                    <SocialCard
                      author={p.author}
                      content={p.content}
                      engagement={p.engagement}
                    />
                  </div>
                ))}

                {loadingMore && (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-pulse text-gray-500">Loading more...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
