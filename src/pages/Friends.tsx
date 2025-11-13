import FriendsPopup from "@/src/components/Friends/FriendsPopup";

export default function Friends() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 flex items-start justify-center">
      <div className="max-w-4xl w-full flex justify-center">
        <div className="mt-8">
          <FriendsPopup />
        </div>
      </div>
    </div>
  );
}
