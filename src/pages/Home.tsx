import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to GraceNook</h1>
        <p className="text-gray-600 mb-8">Home feed coming soon...</p>
        <Button onClick={() => navigate("/")} variant="outline">
          Back to Landing
        </Button>
      </div>
    </div>
  );
}
