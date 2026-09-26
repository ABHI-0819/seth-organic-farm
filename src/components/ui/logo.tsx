import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark" | "monochrome";
  hideTagline?: boolean;
}

export function Logo({
  className,
  variant = "default",
  hideTagline = false,
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      {/* Botanical Emblem Icon */}
      <div className="relative flex items-center justify-center size-9 sm:size-10 rounded-xl bg-[#1B4332] text-white shadow-sm shrink-0">
        <svg
          viewBox="0 0 40 40"
          className="size-6 sm:size-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 9C13 14 11 23 15 29C17 32 20 34 23 34C28 34 32 29 32 23C32 15 25 10 20 9Z"
            fill="#52B788"
            fillOpacity="0.95"
          />
          <path
            d="M15 28C19 22 25 17 29 13"
            stroke="#FBF9F5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 22C23 21 26 22 28 24"
            stroke="#FBF9F5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M17 25C19 26 21 27 23 27"
            stroke="#FBF9F5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="27" cy="12" r="2.7" fill="#D4A373" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-extrabold tracking-tight text-base sm:text-lg",
              isDark ? "text-white" : "text-[#1B4332]",
            )}
          >
            Seth
          </span>
          <span
            className={cn(
              "font-bold tracking-tight text-base sm:text-lg",
              isDark ? "text-[#74C69D]" : "text-[#2D6A4F]",
            )}
          >
            Organic
          </span>
          <span
            className={cn(
              "font-semibold tracking-tight text-base sm:text-lg",
              isDark ? "text-[#D4A373]" : "text-[#8C6239]",
            )}
          >
            Form
          </span>
        </div>
        {!hideTagline && (
          <span
            className={cn(
              "text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5",
              isDark ? "text-[#D4A373]/90" : "text-[#B38048]",
            )}
          >
            Pure Nature • Organic Living
          </span>
        )}
      </div>
    </div>
  );
}
