"use client";

import { useState, useEffect, useRef } from "react";
import { IoLeaf } from "react-icons/io5";
import {
  MdArrowForward,
  MdCalendarMonth,
  MdCenterFocusStrong,
  MdMenuBook,
  MdStar,
  MdWaterDrop,
  MdNotifications,
  MdCheckCircle,
} from "react-icons/md";
import AuthModal from "@/components/auth/AuthModal";
import { animationService } from "@/services/animation/AnimationService";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

const FEATURES = [
  {
    icon: MdCalendarMonth,
    title: "Smart Scheduling",
    description:
      "Automatic watering and fertilizing reminders based on your specific plant species and local weather conditions.",
    color: "bg-primary",
  },
  {
    icon: MdCenterFocusStrong,
    title: "Plant Identifier",
    description:
      "Not sure what that gift was? Snap a photo to identify plants instantly and get tailored care guides immediately.",
    color: "bg-accent-warm",
  },
  {
    icon: MdMenuBook,
    title: "Expert Guides",
    description:
      "Access a vast library of care guides for thousands of indoor plants, curated by certified botanists.",
    color: "bg-sun-yellow",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I used to kill every plant I touched. PlantCare Pro changed everything. My fiddle leaf fig has three new leaves this month alone!",
    name: "Maria Johnson",
    role: "Plant Parent since 2022",
    initials: "MJ",
    color: "bg-purple-200 text-purple-700",
  },
  {
    quote:
      "The identification feature is magic. I found a plant in the trash, scanned it, and now it's the centerpiece of my living room.",
    name: "David Kim",
    role: "Urban Gardener",
    initials: "DK",
    color: "bg-blue-200 text-blue-700",
    featured: true,
  },
  {
    quote:
      "Simple, beautiful, and effective. The scheduling adapts to the weather which is a game changer for my balcony garden.",
    name: "Sarah Lewis",
    role: "Botanist",
    initials: "SL",
    color: "bg-pink-200 text-pink-700",
  },
];

/**
 * Full marketing landing page with anime.js animations.
 * Features: Hero entrance, floating cards, scroll reveals, counter animations.
 */
export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);

  // Refs for hero animations
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroSocialRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);

  // Refs for counter animations
  const plantsSavedRef = useRef<HTMLParagraphElement>(null);
  const dailyUsersRef = useRef<HTMLParagraphElement>(null);

  // Scroll animation hooks
  const { ref: featuresRef } = useStaggerAnimation({ stagger: 150, delay: 100 });
  const { ref: testimonialsRef } = useStaggerAnimation({ stagger: 200, delay: 100 });
  const { ref: missionRef } = useScrollAnimation({ type: "fadeInUp", delay: 0 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ type: "scaleIn", delay: 200 });

  // Hero entrance animations on mount
  useEffect(() => {
    // Hydration pattern - intentional state update
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const runHeroAnimations = () => {
      // Badge
      if (heroBadgeRef.current) {
        animationService.fadeInUp(heroBadgeRef.current, { delay: 0, duration: 600 });
      }
      // Title
      if (heroTitleRef.current) {
        animationService.fadeInUp(heroTitleRef.current, { delay: 150, duration: 800 });
      }
      // Description
      if (heroDescRef.current) {
        animationService.fadeInUp(heroDescRef.current, { delay: 300, duration: 700 });
      }
      // Buttons
      if (heroButtonsRef.current) {
        animationService.fadeInUp(heroButtonsRef.current, { delay: 450, duration: 700 });
      }
      // Social proof
      if (heroSocialRef.current) {
        animationService.fadeInUp(heroSocialRef.current, { delay: 600, duration: 700 });
      }
      // Hero image
      if (heroImageRef.current) {
        animationService.scaleIn(heroImageRef.current, { delay: 300, duration: 1000 });
      }
      // Floating cards with continuous animation
      if (floatingCard1Ref.current) {
        animationService.fadeInLeft(floatingCard1Ref.current, { delay: 800, duration: 600 });
        setTimeout(() => {
          if (floatingCard1Ref.current) {
            animationService.float(floatingCard1Ref.current);
          }
        }, 1400);
      }
      if (floatingCard2Ref.current) {
        animationService.fadeInRight(floatingCard2Ref.current, { delay: 1000, duration: 600 });
        setTimeout(() => {
          if (floatingCard2Ref.current) {
            animationService.float(floatingCard2Ref.current, { duration: 3000 });
          }
        }, 1600);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(runHeroAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  // Counter animations when stats section becomes visible
  useEffect(() => {
    if (statsVisible && mounted) {
      if (plantsSavedRef.current) {
        animationService.counterAnimation(plantsSavedRef.current, 500000, { duration: 2500 });
      }
      if (dailyUsersRef.current) {
        animationService.counterAnimation(dailyUsersRef.current, 10000, { duration: 2000, delay: 300 });
      }
    }
  }, [statsVisible, mounted]);

  const openLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-main dark:text-text-inverse overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-6 lg:px-20 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <IoLeaf size={32} />
          <h2 className="text-xl font-bold leading-tight tracking-tight">PlantCare Pro</h2>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={openLogin}
            className="hidden md:block text-sm font-bold hover:text-primary transition-colors"
          >
            Log In
          </button>
          <button
            onClick={openSignup}
            className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-[#005f52] transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 lg:px-20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 z-10">
            <div
              ref={heroBadgeRef}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#2d3a3a] border border-[#e6f4f2] dark:border-[#354545] shadow-sm opacity-0"
            >
              <span className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                #1 Plant Care App
              </span>
            </div>

            <h1
              ref={heroTitleRef}
              className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight opacity-0"
            >
              Keep your <br />
              <span className="text-primary relative inline-block">
                indoor jungle
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-primary/20"
                  fill="none"
                  viewBox="0 0 200 9"
                >
                  <path
                    d="M2.00025 6.99997C2.00025 6.99997 59.5463 -0.422329 111.08 1.99996C162.614 4.42225 198.001 5.49997 198.001 5.49997"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </span>
              <br /> thriving.
            </h1>

            <p
              ref={heroDescRef}
              className="text-lg text-text-main/70 dark:text-text-inverse/70 max-w-lg leading-relaxed opacity-0"
            >
              The all-in-one dashboard for modern plant parents. Schedule watering, track growth,
              and get expert care guides in one beautiful place.
            </p>

            <div
              ref={heroButtonsRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0"
            >
              <button
                onClick={openSignup}
                className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-[#005f52] transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group hover:scale-105 active:scale-95"
              >
                To the Garden
                <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white dark:bg-[#2d3a3a] border border-[#e6f4f2] dark:border-[#354545] font-bold rounded-full hover:bg-gray-50 dark:hover:bg-[#354545] transition-all hover:scale-105 active:scale-95">
                View Demo
              </button>
            </div>

            <div ref={heroSocialRef} className="flex items-center gap-4 pt-4 opacity-0">
              <div className="flex -space-x-3">
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-purple-200 flex items-center justify-center text-purple-700 text-xs font-bold">
                  MJ
                </div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">
                  DK
                </div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-pink-200 flex items-center justify-center text-pink-700 text-xs font-bold">
                  SL
                </div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#222a2a] bg-primary text-white flex items-center justify-center text-xs font-bold">
                  +10k
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-sun-yellow text-sm">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <MdStar key={i} />
                  ))}
                </div>
                <p className="text-xs font-bold text-primary">Loved by 10,000+ gardeners</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={heroImageRef} className="relative z-10 opacity-0">
            <div className="absolute -z-10 w-72 h-72 bg-primary/20 rounded-full top-0 right-0 blur-[40px] opacity-50" />
            <div className="absolute -z-10 w-72 h-72 bg-sun-yellow/20 rounded-full bottom-0 left-10 blur-[40px] opacity-50" />

            <div className="relative bg-white dark:bg-[#2a3434] rounded-[2.5rem] p-4 shadow-soft rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out border border-white/50">
              <div className="relative rounded-[2rem] overflow-hidden bg-background-light dark:bg-background-dark h-[500px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
                  alt="Monstera plant"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 dark:bg-[#2a3434]/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <MdCheckCircle className="text-green-500" />
                    <span className="text-xs font-bold">Healthy</span>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                ref={floatingCard1Ref}
                className="absolute -left-8 top-12 bg-white dark:bg-[#2a3434] backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 opacity-0"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <MdWaterDrop size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      Status
                    </p>
                    <p className="text-sm font-bold leading-tight">All plants watered</p>
                  </div>
                  <div className="size-2 rounded-full bg-green-500 ml-2" />
                </div>
              </div>

              <div
                ref={floatingCard2Ref}
                className="absolute -right-4 bottom-20 bg-white dark:bg-[#2a3434] backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px] opacity-0"
              >
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-accent-warm/20 flex items-center justify-center text-accent-warm shrink-0">
                    <MdNotifications size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">
                      Reminder
                    </p>
                    <p className="text-xs font-bold leading-snug">Fertilize Monstera today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 lg:px-20 py-20 bg-white dark:bg-[#2a3434]/50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Everything you need to grow
          </h2>
          <p className="text-text-main/60 dark:text-text-inverse/60">
            Don&apos;t let another plant die of thirst. We handle the remembering so you can handle
            the enjoying.
          </p>
        </div>
        <div
          ref={featuresRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-3xl bg-background-light dark:bg-background-dark/50 hover:bg-white dark:hover:bg-[#2d3a3a] transition-all duration-300 border border-transparent hover:border-[#e6f4f2] dark:hover:border-[#354545] group opacity-0 hover:shadow-xl hover:-translate-y-2"
            >
              <div
                className={`size-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-text-main/70 dark:text-text-inverse/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 lg:px-20 py-24 bg-white dark:bg-[#222a2a] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">What Our Community Says</h2>
            <p className="text-text-main/60 dark:text-text-inverse/60">
              Join thousands of happy plant parents who have transformed their homes.
            </p>
          </div>
          <div
            ref={testimonialsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className={`p-8 bg-background-light dark:bg-[#2d3a3a] rounded-3xl relative opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  testimonial.featured
                    ? "mt-0 md:-mt-4 shadow-xl border border-primary/10"
                    : ""
                }`}
              >
                <div className="flex text-sun-yellow mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <MdStar key={i} />
                  ))}
                </div>
                <p className="text-lg font-medium leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`size-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-lg`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-xs text-text-main/50 dark:text-text-inverse/50">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 lg:px-20 py-20 bg-primary dark:bg-[#005f52] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div
          ref={missionRef}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 opacity-0"
        >
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              Our Mission
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">
              Bringing nature back into modern life.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              We believe everyone deserves a green sanctuary. In a world of concrete and screens,
              plants reconnect us to the rhythm of nature. Our goal is to make plant care
              accessible, successful, and joyful for everyone.
            </p>
            <button className="px-6 py-3 bg-sun-yellow text-[#0c1d1a] font-bold rounded-full hover:bg-white transition-all hover:scale-105 active:scale-95 mt-4">
              Read Our Story
            </button>
          </div>
          <div
            ref={statsRef}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 opacity-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div>
                <p
                  ref={plantsSavedRef}
                  className="text-5xl lg:text-6xl font-extrabold text-sun-yellow mb-2"
                >
                  0
                </p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                  Plants Saved
                </p>
              </div>
              <div>
                <p
                  ref={dailyUsersRef}
                  className="text-5xl lg:text-6xl font-extrabold text-accent-warm mb-2"
                >
                  0
                </p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">
                  Daily Users
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2 pt-8 border-t border-white/10 mt-4">
                <p className="text-xl font-medium">
                  &ldquo;Together, we&apos;re growing a greener future one leaf at a time.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0c1d1a] text-white/80 pt-20 pb-10 px-6 lg:px-20 border-t border-[#1f2b29]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-white">
                <IoLeaf size={32} />
                <h2 className="text-xl font-bold">PlantCare Pro</h2>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                The #1 companion for your indoor jungle. Join our community and let&apos;s grow
                together.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Company</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>{" "}
                  <span className="text-[10px] ml-1 bg-primary text-white px-1.5 py-0.5 rounded">
                    Hiring
                  </span>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Plant Database
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6">Stay Updated</h3>
              <p className="text-sm mb-4">Get the latest plant tips and product updates.</p>
              <form className="flex flex-col gap-3">
                <input
                  className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm text-white placeholder-white/40 transition-colors"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="px-4 py-3 bg-primary hover:bg-[#005f52] text-white font-bold rounded-xl text-sm transition-all hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <p>© 2026 NirussVn0. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="https://github.com/NirussVn0" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}
