import { Models } from "@/types";
import { Loader, PostCard } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { Plus, Users } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const {
    data: currentUser,
    isLoading: userloading,
    isError: isusererror,
  } = useGetCurrentUser();

  let userMemberGroups = currentUser?.UserMember
    ? [...currentUser.UserMember].reverse()
    : [];

  if (isusererror) {
    return (
      <>
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </>
    );
  }
  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex w-full flex-col gap-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-violet-300">YOUR SHARED SPACES</p>
              <h2 className="text-3xl font-bold tracking-tight text-white">Groups</h2>
              <p className="mt-2 text-sm text-slate-400">Keep every trip, home, and hangout settled.</p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
              onClick={() => navigate("/create-group")}>
              <Plus size={18} /> New group
            </button>
          </div>
          {userloading ? (
            <Loader />
          ) : userMemberGroups.length === 0 && !userloading ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-600 bg-slate-900/40 px-6 text-center">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-300"><Users size={26} /></div>
              <h3 className="text-lg font-semibold">Start your first group</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-400">Create a group for a trip, shared home, or anything else you split together.</p>
            </div>
          ) : (
            <div
              className="custom-scrollbar max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {userMemberGroups.map((group: Models.Document) => (
                  <li
                    key={group.$id}
                    className="rounded-2xl border border-white/10 bg-[#151e35]/85 p-5 text-white shadow-xl shadow-slate-950/15 transition duration-200 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#19233e]">
                    <PostCard post={group} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
