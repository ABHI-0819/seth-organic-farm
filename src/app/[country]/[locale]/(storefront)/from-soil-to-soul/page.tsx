import {
  ArrowRight,
  Droplets,
  Leaf,
  Shield,
  Sparkles,
  Sprout,
  Sun,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From Soil to Soul | Seth Organic Farm",
  description:
    "Regenerative organic farming, wood cold-pressed oils, and chemical-free seasonal harvest from our living soil to your soul.",
};

interface FromSoilToSoulProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

export default async function FromSoilToSoulPage({
  params,
}: FromSoilToSoulProps) {
  const { country, locale } = await params;
  const basePath = `/${country}/${locale}`;

  const regenerativePractices = [
    {
      title: "Jeevamrutha Soil Nourishment",
      description:
        "Our living soils are naturally fertilized with Jeevamrutha, an ancient microbial culture derived from indigenous Gir cow dung, urine, and organic pulse flour that fosters billions of beneficial earth microbes.",
      icon: Sprout,
    },
    {
      title: "Wood Kolhu Cold Pressing",
      description:
        "Cold pressing yellow mustard and sesame seeds in slow-turning wooden rotary presses (Kachi Ghani) keeps temperatures below 38°C. This preserves delicate Omega fats, aromatic allyls, and natural antioxidants.",
      icon: Droplets,
    },
    {
      title: "Straw-Cushioned Ripening",
      description:
        "Our seasonal Ratnagiri Alphonso mangoes and fruits ripen naturally in golden dry rice straw without harmful calcium carbide or artificial ripening gases. Harvested early morning and dispatched tree-fresh.",
      icon: Sun,
    },
    {
      title: "Fair-Trade Agrarian Guild",
      description:
        "We work directly with certified tribal and smallholder organic farmers across Rajasthan and Maharashtra, guaranteeing 40% above market pricing and restoring ecological agrarian equilibrium.",
      icon: Shield,
    },
  ];

  return (
    <div className="bg-[#fbf9f5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[520px] md:min-h-[580px] flex items-center justify-center border-b border-[#e3dcd2]">
        <Image
          src="/images/seth-mustard-oil.jpg"
          alt="Golden mustard fields and organic cold pressing"
          fill
          priority
          className="object-cover object-center pointer-events-none opacity-40 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e2416]/90 via-[#132c1c]/80 to-[#0e2416]/95" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold mb-6">
            <Leaf className="size-3.5 text-emerald-300" />
            <span>Regenerative Agriculture &amp; Farm Stewardship</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            From Soil{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-100 to-emerald-300">
              to Soul
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
            Food is not merely fuel; it is the vital prana connecting the deep
            cosmic microbiome of fertile earth with the human spirit. Explore
            our natural agriculture practices.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link
              href={`${basePath}/products`}
              className="inline-flex items-center gap-2 bg-[#d4a373] hover:bg-[#c39162] text-[#081c14] font-bold px-7 py-3.5 rounded-full shadow-lg transition-all"
            >
              <span>Explore Farm Harvest</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
            Ecological Agriculture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1b4332] mt-2">
            The Living Soil Philosophy
          </h2>
          <p className="mt-4 text-base text-[#52796f] leading-relaxed">
            Healthy soil yields living plants; living plants create healing
            food. By turning our backs on chemical inputs, monoculture
            fertilizers, and industrial extraction, Seth Organic Farm restores
            the natural vitality intended by nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regenerativePractices.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-white p-8 rounded-3xl border border-[#e3dcd2] shadow-xs hover:border-[#52b788]/60 transition-all flex gap-5"
              >
                <div className="size-14 rounded-2xl bg-emerald-50 text-[#2d6a4f] flex items-center justify-center shrink-0">
                  <Icon className="size-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1b4332] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#52796f] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Showcase: Mustard Oil & Mango Crates */}
      <section className="bg-[#f4efea] py-16 md:py-24 border-y border-[#e3dcd2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-[#e3dcd2]">
              <Image
                src="/images/seth-alphonso-mangoes.jpg"
                alt="Ratnagiri Alphonso mangoes in traditional wooden crate"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                Seasonal Pre-Order Harvests
              </span>
              <h2 className="text-3xl font-bold text-[#1b4332] mt-2">
                Tree-Ripened Organic Fruits
              </h2>
              <p className="mt-4 text-sm text-[#52796f] leading-relaxed">
                When you order our Seasonal Organic Alphonso Mango Crates, they
                are not picked weeks ahead and artificially forced in ripening
                chambers. Our fruit is picked at the pinnacle of morning brix
                sweetness, bedded in dry organic straw, and dispatched straight
                from the orchard gate to your dining table.
              </p>
              <div className="mt-6">
                <Link
                  href={`${basePath}/products/seasonal-organic-alphonso-mango-crate`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2d6a4f] hover:text-[#1b4332]"
                >
                  <span>Reserve Harvest Batch #1</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Callout */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="size-8 text-[#d4a373] mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-[#1b4332]">
            Pure Living Begins with Real Food
          </h2>
          <p className="mt-3 text-sm text-[#52796f] leading-relaxed">
            Every bottle of oil, every jar of A2 ghee, and every crate of
            seasonal harvest is our pledge of purity to your family.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={`${basePath}/products`}
              className="inline-flex items-center gap-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              <span>Shop All Farm Products</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
