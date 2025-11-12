import { SocialCard } from "@/components/ui/social-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const samplePosts = [
  {
    id: "1",
    author: { name: "Alex Rivers", username: "alexr", avatar: "https://i.pravatar.cc/100?img=32", timeAgo: "2h" },
  content: { text: "Just tried GraceNook — the feed feels refreshingly human.", link: undefined },
    engagement: { likes: 12, comments: 3, shares: 1 }
  },
  {
    id: "2",
    author: { name: "Maya Patel", username: "maya", avatar: "https://i.pravatar.cc/100?img=12", timeAgo: "1d" },
  content: { text: "Anyone else building tiny local communities? Let's chat.", link: undefined },
    engagement: { likes: 34, comments: 8, shares: 2 }
  }
];

export function Feed() {
  const navigate = useNavigate();
  const [posts] = useState(samplePosts);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Home Feed</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/')}>Explore</Button>
            <Button onClick={() => navigate('/friends')}>Friends</Button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((p) => (
            <SocialCard
              key={p.id}
              author={p.author}
              content={p.content}
              engagement={p.engagement}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
