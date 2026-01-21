"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { MdPerson, MdPalette, MdNotifications, MdSecurity, MdChevronRight, MdDarkMode, MdLightMode } from "react-icons/md";
import { animationService } from "@/services/animation/AnimationService";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationService.fadeInUp(containerRef.current, { duration: 600 });
      // Stagger sections
      const sections = containerRef.current.querySelectorAll("section");
      animationService.staggerFadeIn(Array.from(sections), { stagger: 100, delay: 200 });
    }
  }, []);

  const SettingSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <section className="bg-white dark:bg-[#2a3434] rounded-2xl p-6 border border-[#e6f4f2] dark:border-[#354545] opacity-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-text-main dark:text-text-inverse">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );

  const SettingItem = ({ label, description, rightElement }: { label: string; description?: string; rightElement?: React.ReactNode }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-text-main dark:text-text-inverse">{label}</p>
        {description && <p className="text-sm text-text-muted">{description}</p>}
      </div>
      {rightElement || <MdChevronRight className="text-text-muted" size={24} />}
    </div>
  );

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto pb-12 opacity-0">
      <h1 className="text-3xl font-extrabold text-text-main dark:text-text-inverse mb-2">Settings</h1>
      <p className="text-text-muted mb-8">Manage your account preferences and application settings.</p>

      <div className="space-y-6">
        {/* Profile Section */}
        <SettingSection title="Profile" icon={<MdPerson size={24} />}>
           <div className="flex items-center gap-4 mb-4">
             <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
               {user?.name?.charAt(0) || "U"}
             </div>
             <div>
               <p className="font-bold text-lg">{user?.name || "User Name"}</p>
               <p className="text-text-muted">{user?.email || "user@example.com"}</p>
             </div>
             <button className="ml-auto px-4 py-2 border border-[#e6f4f2] dark:border-[#354545] rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-[#354545] transition-colors">
               Edit Profile
             </button>
           </div>
           <hr className="border-[#e6f4f2] dark:border-[#354545] my-2" />
           <SettingItem label="Display Name" description={user?.name || "User Name"} />
           <SettingItem label="Email Address" description={user?.email || "user@example.com"} />
        </SettingSection>

        {/* Appearance Section */}
        <SettingSection title="Appearance" icon={<MdPalette size={24} />}>
          <div className="flex items-center justify-between py-2">
             <div>
               <p className="font-medium text-text-main dark:text-text-inverse">Theme Preference</p>
               <p className="text-sm text-text-muted">Choose your preferred visual theme</p>
             </div>
             <div className="flex bg-[#f4f3f1] dark:bg-[#222a2a] p-1 rounded-xl">
               <button
                 onClick={() => setTheme("light")}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                   theme === "light" 
                     ? "bg-white dark:bg-[#354545] shadow-sm text-primary" 
                     : "text-text-muted hover:text-text-main"
                 }`}
               >
                 <MdLightMode /> Light
               </button>
               <button
                 onClick={() => setTheme("dark")}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                   theme === "dark" 
                     ? "bg-white dark:bg-[#354545] shadow-sm text-primary" 
                     : "text-text-muted hover:text-text-main"
                 }`}
               >
                 <MdDarkMode /> Dark
               </button>
             </div>
          </div>
          <SettingItem 
            label="Compact Mode" 
            description="Reduce spacing and increase data density"
            rightElement={
              <button className="w-12 h-6 bg-[#e6f4f2] dark:bg-[#354545] rounded-full relative transition-colors">
                <span className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm" />
              </button>
            } 
          />
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications" icon={<MdNotifications size={24} />}>
           <SettingItem 
            label="Push Notifications" 
            description="Receive alerts for care tasks on your device"
            rightElement={
              <button className="w-12 h-6 bg-primary rounded-full relative transition-all">
                <span className="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm" />
              </button>
            } 
          />
          <SettingItem 
            label="Email Digest" 
            description="Weekly summary of your plant care history"
            rightElement={
              <button className="w-12 h-6 bg-[#e6f4f2] dark:bg-[#354545] rounded-full relative transition-colors">
                <span className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm" />
              </button>
            } 
          />
        </SettingSection>

         {/* Security & Account */}
         <SettingSection title="Security" icon={<MdSecurity size={24} />}>
           <SettingItem label="Change Password" description="Last changed 3 months ago" />
           <SettingItem label="Two-Factor Authentication" description="Not enabled" rightElement={<span className="text-orange-500 font-bold text-sm">Disabled</span>} />
         </SettingSection>
      </div>
    </div>
  );
}
