"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within Carousel");
  return ctx;
}

export function Carousel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [carouselRef, api] = useEmblaCarousel({ axis: "x" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev: () => api?.scrollPrev(),
        scrollNext: () => api?.scrollNext(),
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div className={cn("relative", className)} role="region" aria-roledescription="carousel">
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className={cn("flex -ml-4", className)}>{children}</div>
    </div>
  );
}

export function CarouselItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}>
      {children}
    </div>
  );
}

export function CarouselPrevious({ className }: { className?: string }) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black hover:bg-neutral-800 disabled:opacity-40 h-8 w-8",
        className
      )}
      aria-label="Previous slide"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

export function CarouselNext({ className }: { className?: string }) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black hover:bg-neutral-800 disabled:opacity-40 h-8 w-8",
        className
      )}
      aria-label="Next slide"
    >
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
