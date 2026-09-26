"use client";

import { Clock, Home, Package, Search, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";

interface TrackOrderPageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
  searchParams?: Promise<{
    order?: string;
  }>;
}

export default function TrackOrderPage({
  params,
  searchParams,
}: TrackOrderPageProps) {
  const { country, locale } = use(params);
  const search = searchParams ? use(searchParams) : {};
  const basePath = `/${country}/${locale}`;

  const [orderQuery, setOrderQuery] = useState(search?.order || "SOF-98214");
  const [searched, setSearched] = useState(true);

  // Simulated live consignment data for demonstration & parity
  const trackingData = {
    orderNumber: orderQuery || "SOF-98214",
    status: "in_transit",
    carrier: "Delhivery Surface Express",
    trackingNumber: "DELHIVERY-9823104",
    dispatchedDate: "Sept 25, 2026, 04:30 PM",
    estimatedDelivery: "Sept 28, 2026",
    destination: "Mumbai, Maharashtra - 400050",
    packagingType: "UV Amber Glass + Recycled Straw Bedding",
    items: [
      { name: "Traditional Bilona A2 Desi Gir Cow Ghee (1L)", qty: 1 },
      { name: "Wood Cold-Pressed Yellow Mustard Oil (1L)", qty: 2 },
    ],
  };

  const steps = [
    {
      key: "placed",
      title: "Order Placed & Churn Reserved",
      desc: "Batch reserved at Jaipur Agrarian Farm",
      time: "Sept 25, 2026 - 10:15 AM",
      icon: Clock,
      done: true,
    },
    {
      key: "packed",
      title: "Packed at Farm Gate",
      desc: "Jar sealed in UV glass with biodegradable straw cushioning",
      time: "Sept 25, 2026 - 02:45 PM",
      icon: Package,
      done: true,
    },
    {
      key: "in_transit",
      title: "In Transit via Express Consignment",
      desc: `Dispatched via ${trackingData.carrier}. Tracking #${trackingData.trackingNumber}`,
      time: "Sept 25, 2026 - 04:30 PM",
      icon: Truck,
      done: true,
      current: true,
    },
    {
      key: "delivered",
      title: "Out for Delivery & Delivered",
      desc: "Handover at doorstep with OTP verification",
      time: "Expected by Sept 28, 2026",
      icon: Home,
      done: false,
    },
  ];

  return (
    <div className="bg-[#fbf9f5] min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
            Farm-to-Doorstep Tracking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] mt-1">
            Track Your Order
          </h1>
          <p className="mt-2 text-sm text-[#52796f]">
            Monitor your fresh harvest and Vedic Bilona consignments directly
            from Jaipur farm to your doorstep.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#e3dcd2] shadow-xs mb-8 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#52796f]" />
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter your Order Number (e.g. SOF-98214 or R123456789)"
              className="w-full bg-[#fbf9f5] border border-[#e3dcd2] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1b4332] placeholder:text-[#52796f]/60 focus:outline-none focus:border-[#2d6a4f]"
            />
          </div>
          <Button
            onClick={() => setSearched(true)}
            className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white px-6 rounded-xl font-semibold text-sm"
          >
            Track Status
          </Button>
        </div>

        {searched && (
          <div className="space-y-6">
            {/* Status Summary Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e3dcd2] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e3dcd2]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                    Consignment Active
                  </span>
                  <h2 className="text-2xl font-bold text-[#1b4332]">
                    Order #{trackingData.orderNumber}
                  </h2>
                  <p className="text-xs text-[#52796f] mt-0.5">
                    Carrier:{" "}
                    <span className="font-semibold text-[#1b4332]">
                      {trackingData.carrier}
                    </span>{" "}
                    • Tracking:{" "}
                    <span className="font-mono font-semibold text-[#2d6a4f]">
                      {trackingData.trackingNumber}
                    </span>
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Transit
                  </span>
                  <p className="text-xs text-[#52796f] mt-1.5">
                    Estimated Delivery:{" "}
                    <strong>{trackingData.estimatedDelivery}</strong>
                  </p>
                </div>
              </div>

              {/* Fragile & Packaging Notice */}
              <div className="my-6 p-4 rounded-2xl bg-[#f4efea] border border-[#e3dcd2] flex items-start gap-3">
                <ShieldCheck className="size-5 text-[#2d6a4f] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1b4332]">
                  <strong className="block font-semibold">
                    Fragile Glass &amp; Organic Seal Intact
                  </strong>
                  Protected by multi-layered corrugated straw cushions and
                  thermal temperature buffer.
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 space-y-8 mt-8 before:absolute before:left-9 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e3dcd2]">
                {steps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.key}
                      className="relative flex items-start gap-4"
                    >
                      <div
                        className={`size-8 rounded-full flex items-center justify-center z-10 transition-all ${
                          s.done
                            ? "bg-[#2d6a4f] text-white ring-4 ring-emerald-100"
                            : "bg-white border-2 border-[#e3dcd2] text-gray-400"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <h4
                            className={`text-base font-bold ${s.current ? "text-[#1b4332]" : s.done ? "text-[#2d6a4f]" : "text-gray-400"}`}
                          >
                            {s.title}
                          </h4>
                          <span className="text-xs text-[#52796f] mt-0.5 sm:mt-0 font-mono">
                            {s.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#52796f] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Destination & Consignment Items */}
              <div className="mt-8 pt-6 border-t border-[#e3dcd2] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#52796f]">
                <div>
                  <strong className="text-[#1b4332] block mb-1">
                    Shipping Destination:
                  </strong>
                  {trackingData.destination}
                </div>
                <div>
                  <strong className="text-[#1b4332] block mb-1">
                    Consignment Items:
                  </strong>
                  {trackingData.items.map((i) => (
                    <div key={i.name}>
                      • {i.name} × {i.qty}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to Shopping */}
            <div className="text-center">
              <Link
                href={`${basePath}/products`}
                className="text-xs font-semibold text-[#2d6a4f] hover:text-[#1b4332] underline underline-offset-4"
              >
                Return to Farm Fresh Collection
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
