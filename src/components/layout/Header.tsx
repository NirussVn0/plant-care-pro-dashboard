import Link from "next/link";
import { FaBell, FaCog, FaSearch, FaUser } from "react-icons/fa";
import { IoLeaf } from "react-icons/io5"; // Using IoLeaf for the plant logo feel

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-background sticky top-0 z-50">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-brand-dark p-2 rounded-lg text-white group-hover:bg-brand-primary transition-colors duration-300">
          <IoLeaf size={24} />
        </div>
        <span className="text-xl font-bold text-brand-dark tracking-tight">
          PlantCarePro
        </span>
      </Link>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:flex items-center gap-8">
        {[
          { name: "Dashboard", href: "/" },
          { name: "My Jungle", href: "/jungle" },
          { name: "Schedule", href: "/schedule" },
          { name: "Encyclopedia", href: "/encyclopedia" },
          { name: "Care Logs", href: "/logs" },
        ].map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-text-muted hover:text-brand-primary font-medium transition-colors text-sm"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Visual only for now */}
        <div className="hidden lg:flex items-center bg-white px-4 py-2 rounded-full border border-gray-200 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all w-64">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search plants..."
            className="bg-transparent border-none outline-none text-sm text-text-main w-full placeholder:text-gray-400"
          />
        </div>

        <button className="p-2 text-brand-dark bg-brand-light rounded-lg hover:bg-brand-primary hover:text-white transition-colors">
          <FaBell size={18} />
        </button>
        <button className="p-2 text-brand-dark bg-brand-light rounded-lg hover:bg-brand-primary hover:text-white transition-colors">
          <FaCog size={18} />
        </button>
        <button className="h-10 w-10 rounded-full bg-brand-primary flex items-center justify-center text-white overflow-hidden border-2 border-white shadow-sm">
          {/* Placeholder for user avatar */}
          <FaUser />
          {/* TODO: proper image component */}
        </button>
      </div>
    </header>
  );
}
