import { ReactNode } from "react";
import { Play, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  category?: string;
  rating?: string;
  onPlayClick?: () => void;
  onWatchlistClick?: () => void;
  actionLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  image,
  category,
  rating,
  onPlayClick,
  onWatchlistClick,
  actionLabel = "Launch",
  children,
  className,
}: HeroProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 flex flex-col justify-end h-full min-h-96">
        {/* Category Badge */}
        {category && (
          <div className="mb-4 inline-flex w-fit">
            <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-primary/20 border border-primary/40 rounded-full text-primary">
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="mb-3 text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight max-w-2xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-4 text-lg font-semibold text-primary">{subtitle}</p>
        )}

        {/* Description */}
        {description && (
          <p className="mb-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl line-clamp-2">
            {description}
          </p>
        )}

        {/* Metadata Row */}
        {rating && (
          <div className="mb-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              ⭐ {rating}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onPlayClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg smooth-fade"
          >
            <Play className="w-5 h-5 fill-current" />
            {actionLabel}
          </button>

          <button
            onClick={onWatchlistClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-card-border hover:bg-card/80 text-foreground font-semibold rounded-lg transition-all duration-300 smooth-fade"
          >
            <Bookmark className="w-5 h-5" />
            Save
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Hero;
