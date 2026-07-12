import { Link } from "react-router-dom";
import { WalletCards } from "lucide-react";

const Topbar = () => {
  return (
    <section className="topbar">
      <nav className="p-4">
        <div className="font-sans mx-auto flex items-center">
          <Link
            to="/"
            className="text-white font-bold text-lg flex items-center gap-2 tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
              <WalletCards size={18} />
            </span>
            Settle<span className="text-violet-300">Sphere</span>
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Topbar;
