import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { WalletCards } from "lucide-react";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser, setIsAuthenticated } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-12">
        <Link to="/" className="text-white font-bold text-xl flex items-center gap-3 px-2 tracking-tight">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/40">
            <WalletCards size={21} strokeWidth={2.4} />
          </span>
          Settle<span className="text-violet-300">Sphere</span>
        </Link>
        <ul className="flex flex-col gap-2">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive ? "bg-violet-500 text-white shadow-lg shadow-violet-950/20" : ""}`}>
                <NavLink
                  to={link.route}
                  className="flex gap-3 items-center px-3 py-3">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`h-6 w-6 group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost rounded-xl px-3 py-3 text-slate-300 hover:bg-white/5"
        onClick={(e) => handleSignOut(e)}>
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/sf-black/64/FA5252/logout-rounded-left.png"
          alt="logout-rounded-left"
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
