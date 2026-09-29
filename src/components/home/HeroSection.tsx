import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { getStoreName } from "@/lib/store";

interface HeroSectionProps {
  basePath: string;
  locale: string;
}

export async function HeroSection({ basePath, locale }: HeroSectionProps) {
  const t = await getTranslations({
    locale: locale as any,
    namespace: "home",
  });
  const storeName = getStoreName();

  const trustHighlights = [
    {
      icon: Leaf,
      title: "100% Certified Organic",
      desc: "Zero chemicals, GMOs, or synthetic pesticides",
    },
    {
      icon: ShieldCheck,
      title: "Direct From Indian Farms",
      desc: "Ethically harvested & fair-trade sourced",
    },
    {
      icon: Sparkles,
      title: "Lab-Tested Purity",
      desc: "Highest nutrient density & authentic taste",
    },
    {
      icon: Truck,
      title: "Freshness-Sealed Delivery",
      desc: "Eco-friendly insulated packs delivered nationwide",
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] md:min-h-[720px] flex items-center justify-center border-b border-[#e3dcd2]">
      {/* Background Hero Image */}
      <Image
        src="/images/organic-farm-hero.jpg"
        alt="Seth Organic Farm lush green fields and golden sunrise"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center pointer-events-none"
      />

      {/* Cinematic Nature Scrim & Atmosphere Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a1f12]/85 via-[#0d2818]/70 to-[#0a1f12]/90 backdrop-blur-[0.5px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle organic light orbs */}
      <div
        className="absolute top-10 right-10 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-amber-300/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 relative z-20 w-full">
        <div className="text-center max-w-3xl mx-auto">
          {/* Organic Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-emerald-100 text-[11px] sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg shadow-black/20">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <Leaf className="size-3.5 sm:size-4 text-emerald-300 shrink-0" />
            <span>
              {storeName} • 100% Certified Organic • Direct from Indian Farms
            </span>
          </div>

          {/* Stately High-Impact Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-md">
            Pure from Nature{" "}
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-amber-200">
              to Your Home
            </span>
          </h1>

          {/* Subtitle / Description with high legibility */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-emerald-50/90 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm">
            {t("heroDescription")}
          </p>

          {/* Action CTAs */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-stretch sm:items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-emerald-950/50 hover:shadow-2xl hover:scale-105 transition-all duration-200 gap-2.5 border border-emerald-400/30 text-base"
              asChild
            >
              <Link href={`${basePath}/products`}>
                <span>{t("shopNow")}</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/35 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-4 rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-all duration-200 text-base hover:border-white/50"
              asChild
            >
              <Link href={`${basePath}/products`}>
                <span>Explore Collections</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Guarantees Grid with Glassmorphism */}
        <div className="mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {trustHighlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 p-5 rounded-2xl bg-black/35 hover:bg-black/45 backdrop-blur-md border border-white/15 hover:border-emerald-400/40 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-center size-11 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300">
                <item.icon className="size-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/75 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth bottom transition blending with the page background */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#fbf9f5] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
    </section>
  );
}
