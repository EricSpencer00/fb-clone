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
  },
  {
    id: "3",
    author: { name: "Jordan Lee", username: "jordlee", avatar: "https://i.pravatar.cc/100?img=52", timeAgo: "3d" },
    content: { text: "Small groups can make a big difference. Started a neighborhood book club — join if you're local!", link: undefined },
    engagement: { likes: 7, comments: 2, shares: 0 }
  },
  {
    id: "4",
    author: { name: "Priya Singh", username: "priya", avatar: "https://i.pravatar.cc/100?img=7", timeAgo: "5h" },
    content: { text: "Photos from today's hike 🌲 — what a view!", link: undefined },
    engagement: { likes: 55, comments: 12, shares: 4 }
  },
  {
    id: "5",
    author: { name: "Sam Carter", username: "samc", avatar: "https://i.pravatar.cc/100?img=18", timeAgo: "1w" },
    content: { text: "Sharing a useful thread about local volunteering opportunities.", link: undefined },
    engagement: { likes: 5, comments: 1, shares: 1 }
  }
];

export function Feed() {
  const navigate = useNavigate();
  const [posts] = useState(samplePosts);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
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
