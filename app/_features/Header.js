"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "../_icons/Logo";
import { ChevronDown, ChevronRight, MapPin, User } from "lucide-react";
import CartOrderSheet from "./CartOrderSheet"; // Import the CartOrderSheet

const Header = () => {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const syncAuthState = () => {
      const token =
        localStorage.getItem("Token") || localStorage.getItem("token");
      const role = localStorage.getItem("userRole") || "";
      setIsLoggedIn(Boolean(token));
      setUserRole(role);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("");
    setIsUserMenuOpen(false);
    window.dispatchEvent(new Event("auth-changed"));
    router.push("/authentication/login");
  };

  const isAdmin = isLoggedIn && userRole === "admin";

  return (
    <div className="w-full bg-[#18181B] h-[68px] flex items-center justify-between py-3 px-22 sticky top-0">
      {/* logo */}
      <div className="flex flex-row gap-3">
        <Logo />
        <div className="flex flex-col">
          <div className="font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] flex flex-row">
            <p className="text-white">Nom</p>
            <p className="text-[#EF4444]">Nom</p>
          </div>
          <p className="text-center font-inter text-[12px] font-normal leading-4 text-white">
            swift delivery
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="gap-3 flex flex-row">
        {/* Location button */}
        <Button variant="default" className="bg-white rounded-full gap-1">
          <MapPin className="text-[#EF4444]" />
          <p className="text-[#EF4444] font-inter text-[12px] font-normal leading-4">
            Delivery address:
          </p>
          <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
            Add location
          </p>
          <ChevronRight className="text-[#71717A]" />
        </Button>

        {/* Cart button - Replace with CartOrderSheet */}
        <CartOrderSheet />

        {/* User button */}
        <div className="relative" ref={menuRef}>
          <Button
            variant="default"
            className="bg-[#EF4444] rounded-full gap-1 px-3"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <User />
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-[#E4E4E7] bg-white p-2 shadow-lg">
              {!isLoggedIn && (
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2]"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push("/authentication/login");
                  }}
                >
                  Login
                </button>
              )}

              {!isLoggedIn && (
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#F4F4F5]"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push("/authentication/signup");
                  }}
                >
                  Sign up
                </button>
              )}

              {isAdmin && (
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-[#F4F4F5]"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    router.push("/admin");
                  }}
                >
                  Admin
                </button>
              )}

              {isLoggedIn && (
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
