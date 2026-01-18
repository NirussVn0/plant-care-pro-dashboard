import Link from "next/link";
import { MdSearch, MdNotifications, MdSettings, MdMenu } from "react-icons/md";
import { IoLeaf } from "react-icons/io5";

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "My Jungle", href: "/jungle" },
  { name: "Schedule", href: "/schedule" },
  { name: "Encyclopedia", href: "/encyclopedia" },
  { name: "Care Logs", href: "/logs" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white dark:border-[#354545] bg-opacity-80 backdrop-blur-md bg-background-light dark:bg-background-dark px-6 lg:px-20 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between gap-8 text-text-main dark:text-text-inverse">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
            <div className="size-8">
               <IoLeaf size={32} />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight font-display">PlantCare Pro</h2>
          </Link>

          {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
            <Link
                key={link.name}
                href={link.href}
                className="text-text-muted hover:text-primary transition-colors font-medium text-sm"
            >
                {link.name}
            </Link>
        ))}
      </nav>    </div>
          {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-white dark:bg-[#2d3a3a] rounded-lg px-3 py-1.5 border border-[#e6f4f2] dark:border-[#354545]">
            <MdSearch className="text-primary text-lg" />
            <input 
                className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-text-muted w-40 ml-2 focus:outline-none" 
                placeholder="Search plants..." 
                type="text"
            />
          </div>

          <button className="p-2 rounded-lg bg-white dark:bg-[#2d3a3a] text-primary hover:bg-[#d6ebe9] dark:hover:bg-[#354545] transition-colors shadow-sm">
            <MdNotifications size={20} />
          </button>
          
          <button aria-label="Settings" className="p-2 rounded-lg bg-white dark:bg-[#2d3a3a] text-primary hover:bg-[#d6ebe9] dark:hover:bg-[#354545] transition-colors group shadow-sm">
            <MdSettings size={20} className="group-hover:rotate-45 transition-transform duration-300" />
          </button>

          {/* User Avatar Placeholder - Replace with Image component when implementing User Service */}
          <div className="size-9 rounded-full bg-cover bg-center border-2 border-primary cursor-pointer hover:opacity-90 transition-opacity" 
               style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4L-yeUJzasM-KnmHpRaGOy4Q0P6W1DT_fcBCYMI9VHN5JwqkgvIC1iIDeTi10qij1hTQSCBtghVVq5gdUQbTVQGaIGNbMhwQFFENUUDdf0_33CoO0HSQ_ZDqjOFUpFEqR-10Jroz1pIw6wVySVHaCNY9TXc2S-vUJwgOnA_hpHFbXpxnDFve4_NymV5jhbKa4ngCnE4S3x9sOy6HUhz9Fj6uRNdqj8_xgtAQ-Dgjcfg64jFQOvUX-Vgm04VBriTnh66Q0mOeJAQ")' }}>
          </div>
          
          <button className="md:hidden p-2 text-primary">
              <MdMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
