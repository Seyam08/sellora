"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useProgressButton } from "../hooks/useProgressButton";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplayOption?: AutoplayOptionsType;
};

export function CarouselThree({ slides, options, autoplayOption }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOption),
    Fade(),
  ]);
  const { selectedIndex, scrollSnaps, onProgressButtonClick } =
    useProgressButton(emblaApi);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins().autoplay;

    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;

    playOrStop();
  }, [emblaApi]);

  const resetAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins().autoplay;

    if (!autoplay) return;

    autoplay.reset();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins().autoplay;

    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => {
        setIsPlaying(true);
        setPlayCount(playCount + 1);
      })
      .on("autoplay:stop", () => {
        setIsPlaying(false);
      })
      .on("reInit", () => {
        setIsPlaying(autoplay.isPlaying());
      });
  }, [emblaApi, playCount]);

  return (
    <div className="carousel relative">
      <div className="carousel_viewport" ref={emblaRef}>
        <div className="carousel_container">
          {slides.map((item, index) => {
            return (
              <div className="carousel_slide" key={index}>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="carousel_controls w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 py-3">
        <div className="carousel_dots">
          {scrollSnaps.map((_: number, index: number) => {
            return (
              <Button
                aria-label={`View image number ${index + 1}`}
                variant={"outline"}
                className="py-0 px-1 border-0 !bg-transparent cursor-pointer"
                key={index}
                onClick={() => {
                  onProgressButtonClick(index);
                  resetAutoplay();
                }}
              >
                <div className="relative overflow-hidden">
                  {/* White Bar - Current Index Indicator / Progress Bar */}
                  <div
                    className={cn(
                      "absolute h-0.5 bg-accent",
                      "opacity-0 fill-mode-forwards",
                      isPlaying ? "running" : "paused",
                      index === selectedIndex
                        ? "opacity-100 ease-linear animate-in slide-in-from-left"
                        : "ease-out animate-out fade-out"
                    )}
                    key={`progress-${playCount}`} // Force the animation to restart when pressing "Play", to match animation with embla's autoplay timer
                    style={{
                      animationDuration:
                        index === selectedIndex
                          ? `${autoplayOption?.delay ?? 4000}ms`
                          : "200ms",
                      width: `${100 / slides.length}px`,
                    }}
                  />
                  {/* Grey Bar BG */}
                  <div
                    className="h-0.5 bg-accent opacity-40"
                    style={{ width: `${100 / slides.length}px` }}
                  />
                </div>
              </Button>
            );
          })}
        </div>

        <div className="carousel_buttons">
          <Button
            aria-label={isPlaying ? "Pause" : "Play"}
            variant={"outline"}
            size={"icon-sm"}
            onClick={toggleAutoplay}
            className="cursor-pointer bg-accent/50 border-border/50"
          >
            {isPlaying ? (
              <Pause className="pointer-events-none" />
            ) : (
              <Play className="pointer-events-none" />
            )}
          </Button>
          <span className="text-accent scroll-m-20 border-b text-base font-semibold tracking-tight">
            {selectedIndex + 1 < 10
              ? `0${selectedIndex + 1}`
              : selectedIndex + 1}
            /{slides.length < 10 ? `0${slides.length}` : slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
