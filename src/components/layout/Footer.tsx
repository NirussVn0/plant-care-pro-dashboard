import Link from "next/link";
import { IoLeaf } from "react-icons/io5";


export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e6f4f2] dark:border-[#354545] bg-background-light dark:bg-background-dark px-6 lg:px-20 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
            <IoLeaf size={20} />
            <span className="text-sm font-bold font-display">PlantCare Pro</span>
          </Link>
          <span className="text-sm text-text-muted">© 2026 NirussVn0. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="https://github.com/NirussVn0" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
