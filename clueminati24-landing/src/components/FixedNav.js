import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Options from "./NavbarComps/Options";
import logo from "../assets/logo.png";
import SocialHandles from "./NavbarComps/SocialHandles";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import BurgerSVG from "./BurgerSVG";
import Link from "next/link";

const FixedNav = () => {
  const isMobile = useMediaQuery("(max-width:639px)");
  const [isToggled, setIsToggled] = useState(false);
  const navbarRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsToggled(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (!isMobile) {
    return (
      <div className="fixed h-screen w-screen text-green">
        <div className="flex justify-between p-12 md:p-6">
          <div className="h-16 w-auto cursor-pointer logo z-40">
            <Image className="h-16 w-auto sm:h-12" src={logo} alt="CC Logo" />
          </div>
          <Options />
        </div>
        <div className="absolute left-[3.7rem] bottom-40 sm:hidden">
          <SocialHandles />
        </div>
      </div>
    );
  }

  return (
    <div>
      {isToggled ? (
        <div
          className="fixed right-0 h-screen w-1/2 bg-green z-40 flex flex-col items-center justify-evenly"
          ref={navbarRef}
        >
          <Link href="/landing" className="text-3xl font-black">
            Home
          </Link>
          <Link
            href="#about"
            className="text-3xl font-black"
            onClick={() => setIsToggled(false)}
          >
            About
          </Link>
          <Link href="#timeline" className="text-3xl font-black">
            Timeline
          </Link>
          <Link href="#prizes" className="text-3xl font-black">
            Prizes
          </Link>
          <Link href="#faqs" className="text-3xl font-black">
            FAQ&apos;s
          </Link>
          <Link href="#socials" className="text-3xl font-black">
            Socials
          </Link>
        </div>
      ) : (
        <BurgerSVG setIsToggled={setIsToggled} />
      )}
    </div>
  );
};

export default FixedNav;