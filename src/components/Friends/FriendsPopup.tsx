import React from "react";
import SphereImageGrid from "@/src/components/ui/img-sphere";

const sampleImages = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i),
  src: `https://i.pravatar.cc/200?img=${20 + i}`,
  alt: `Friend ${i + 1}`,
  title: `Friend ${i + 1}`,
  description: `Friend ${i + 1} from your network`,
}));

export default function FriendsPopup({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-80 bg-white border rounded-lg shadow-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Friends</div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded">
          ✕
        </button>
      </div>

      <div className="h-48 mb-3 flex items-center justify-center">
        <SphereImageGrid images={sampleImages} containerSize={180} sphereRadius={80} autoRotate={true} autoRotateSpeed={0.3} />
      </div>

      <div>
        <input
          placeholder="Search for friends"
          className="w-full border rounded px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
