import {
  ArrowRight,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Where Purity Begins | Seth Organic Farm",
  description:
    "Discover our sacred Gir cow sanctuary, Vedic Bilona churning ritual, and the ancient agrarian philosophy behind Seth Organic Farm.",
};

interface WherePurityBeginsProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

export default async function WherePurityBeginsPage({
  params,
}: WherePurityBeginsProps) {
  const { country, locale } = await params;
  const basePath = `/${country}/${locale}`;

  const vedicSteps = [
    {
      step: "01",
      title: "Sacred Ahimsa Grazing",
      subtitle: "Free-roaming indigenous Gir cows",
      description:
        "Our Gir cows roam freely across pesticide-free pastures of Rajasthan, feeding on wild medicinal herbs like Shatavari, Ashwagandha, and tender green grasses without hormones or synthetic feed.",
    },
    {
      step: "02",
      title: "Whole Curd Culturing",
      subtitle: "Clay pot natural fermentation",
      description:
        "Unlike commercial ghee made by separating raw industrial cream, authentic Vedic ghee begins by boiling pure A2 milk and naturally culturing it overnight into whole curd in clay pots.",
    },
    {
      step: "03",
      title: "Bi-Directional Wooden Bilona",
      subtitle: "Early morning Brahma Muhurta churn",
      description:
        "Before dawn, wooden churners (bilona) spin clockwise and counter-clockwise in synchrony. This ancient bi-directional motion extracts cultured makkhan (butter) without friction heat.",
    },
    {
      step: "04",
      title: "Slow Earthen Chulha Simmer",
      subtitle: "Gentle boiling over cow dung fuel",
      description:
        "The raw butter is clarified slowly on earthen stoves powered by dried cow-dung cakes at low temperatures, allowing liquid gold to form while preserving living enzymes and golden carotenoids.",
    },
    {
      step: "05",
      title: "UV Amber Glass Preservation",
      subtitle: "Zero plastic, zero leaching",
      description:
        "Poured warm into UV-filtering amber glass jars to protect delicate nutritional bonds against light degradation. No chemical preservatives, no deodorizers, no color additives.",
    },
  ];

  return (
    <div className="bg-[#fbf9f5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[580px] flex items-center justify-center border-b border-[#e3dcd2]">
        <Image
          src="/images/seth-a2-ghee.jpg"
          alt="Seth Organic Farm Vedic A2 Ghee and pasture lands"
          fill
          priority
          className="object-cover object-center pointer-events-none opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e2416]/90 via-[#132c1c]/80 to-[#0e2416]/95" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold mb-6">
            <Sun className="size-3.5 text-amber-300" />
            <span>Our Origin Story • The Sacred Bilona Tradition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Where Purity{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-100 to-amber-200">
              Begins
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
            In an era of mass-manufactured, chemically clarified oils and
            ultra-processed dairy, Seth Organic Farm was born to preserve the
            uncompromising sanctity of pure Vedic food.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={`${basePath}/products/traditional-bilona-a2-desi-gir-cow-ghee`}
              className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg transition-all"
            >
              <span>Taste Authentic A2 Ghee</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
            Ancient Wisdom, Living Science
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1b4332] mt-2">
            The 5 Vedic Truths of Our Farm
          </h2>
          <p className="mt-3 text-sm text-[#52796f]">
            Every drop of clarified butter that leaves our Jaipur sanctuary
            follows the timeless instructions preserved in ancient Charaka and
            Sushruta Samhitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#e3dcd2] shadow-xs hover:border-[#52b788]/60 transition-all">
            <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
              <Heart className="size-6 text-[#2d6a4f]" />
            </div>
            <h3 className="text-xl font-bold text-[#1b4332] mb-3">
              Ahimsa &amp; Sacred Care
            </h3>
            <p className="text-sm text-[#52796f] leading-relaxed">
              Cows are never treated as commercial commodities. Calves always
              drink their mother's milk first; only the surplus milk is
              respectfully gathered for churned ghee.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#e3dcd2] shadow-xs hover:border-[#52b788]/60 transition-all">
            <div className="size-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
              <Sparkles className="size-6 text-amber-700" />
            </div>
            <h3 className="text-xl font-bold text-[#1b4332] mb-3">
              100% Gir Cow A2 Beta-Casein
            </h3>
            <p className="text-sm text-[#52796f] leading-relaxed">
              Certified pure Gir cows possess the distinct hump carrying the
              Surya Ketu Nadi vein, imparting natural golden radiance, easily
              digestible A2 proteins, and rich fat-soluble vitamins.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#e3dcd2] shadow-xs hover:border-[#52b788]/60 transition-all">
            <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-6">
              <ShieldCheck className="size-6 text-[#2d6a4f]" />
            </div>
            <h3 className="text-xl font-bold text-[#1b4332] mb-3">
              Zero Chemical Refining
            </h3>
            <p className="text-sm text-[#52796f] leading-relaxed">
              No artificial bleaching agents, artificial essences, trans-fat
              blending, or thermal cracking. What you receive is unadulterated
              nature in its purest bio-available form.
            </p>
          </div>
        </div>
      </section>

      {/* The 5-Step Process */}
      <section className="bg-[#f4efea] py-16 md:py-24 border-y border-[#e3dcd2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
              Step-by-Step Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b4332] mt-2">
              The Sacred 5-Stage Bilona Method
            </h2>
          </div>

          <div className="space-y-6">
            {vedicSteps.map((s) => (
              <div
                key={s.step}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e3dcd2] shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div className="size-14 rounded-2xl bg-[#1b4332] text-amber-200 flex items-center justify-center font-bold text-xl shrink-0">
                  {s.step}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-[#d4a373] uppercase tracking-wider">
                    {s.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-[#1b4332] mt-0.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[#52796f] mt-1.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto bg-[#1b4332] text-white p-10 sm:p-14 rounded-3xl shadow-xl">
          <Leaf className="size-10 text-emerald-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Experience the Golden Nectar</h2>
          <p className="mt-3 text-emerald-100 text-sm leading-relaxed">
            Freshly churned in small batches every morning. Packed safely in
            shatter-resistant UV amber glass with straw cushioning.
          </p>
          <div className="mt-8">
            <Link
              href={`${basePath}/products/traditional-bilona-a2-desi-gir-cow-ghee`}
              className="inline-flex items-center gap-2 bg-[#d4a373] hover:bg-[#c39162] text-[#081c14] font-bold px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              <span>Order Farm-Fresh A2 Ghee</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
