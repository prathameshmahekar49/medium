import { AppBar } from "../components/AppBar";
import { useUser, useUserBlogs } from "../hooks";

export const Profile = () => {
  const { user, loading: userLoading } = useUser();
  const { loading: blogsLoading } = useUserBlogs();

  if (userLoading || blogsLoading) return <div className="p-10 text-center font-mono">Loading...</div>;

  return (
    <div className="font-mono text-black bg-white min-h-screen">
      <AppBar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
              {user?.name?.[0] || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name || "Anonymous"}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-700 pt-2 max-w-2xl">
                Welcome to your profile. You can view and manage your articles here.
              </p>
            </div>
          </div>
          <button className="border px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition ">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};
