import { Models } from "@/types";
import { Link } from "react-router-dom";
import ActivityImage from "./ActivityImage";
import { ArrowUpRight, Receipt, User } from "lucide-react";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const totalAmount = post.activity.reduce(
    (sum: number, activityItem: { Amout: string }) => {
      return sum + parseFloat(activityItem.Amout);
    },
    0
  );

  return (
    <>
      <Link to={`/groups/${post?.$id}`} className="group block">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center">
          <ActivityImage Desc={post.groupName} Type={"group"} />
          <p className="ml-3 truncate text-lg font-bold text-white">
            {post.groupName}
          </p>
          </div>
          <ArrowUpRight className="shrink-0 text-slate-500 transition group-hover:text-violet-300" size={20} />
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400"><User size={14} /> Created by</p>
            <p className="mt-1 capitalize text-sm font-semibold text-slate-200">{post.Creator?.name || "Unknown"}</p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-xs font-medium text-slate-400"><Receipt size={14} /> Total spent</p>
            <p className="mt-1 text-lg font-bold text-emerald-300">₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostCard;
