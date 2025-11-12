import SphereImageGrid from "@/src/components/ui/img-sphere";

const sampleImages = Array.from({ length: 14 }).map((_, i) => ({
  id: String(i),
  src: `https://i.pravatar.cc/200?img=${10 + i}`,
  alt: `Friend ${i + 1}`,
  title: `Friend ${i + 1}`,
  description: `Friend ${i + 1} from your network`
}));

export default function Friends() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 flex items-start justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6">Friends globe</h1>
        <p className="text-sm text-gray-600 mb-6">Interact with your friends in 3D. Drag to rotate, tap to zoom.</p>

        <div className="flex justify-center">
          <SphereImageGrid images={sampleImages} containerSize={600} sphereRadius={220} autoRotate={true} autoRotateSpeed={0.4} />
        </div>
      </div>
    </div>
  );
}
