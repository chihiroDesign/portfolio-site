"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/images/chihiroDesign_logo.png"
              alt="chihiro Design Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-semibold tracking-widest text-white/90 group-hover:text-white transition-colors">
            chihiro Design PORTFOLIO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
          >
            Projects
          </Link>
          <Link
            href="/profile"
            className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
          >
            Profile
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/profile"
            className="text-sm text-white/70 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/70 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
