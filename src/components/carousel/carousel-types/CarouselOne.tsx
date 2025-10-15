import { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import {
  PrevNextButton,
  usePrevNextButtons,
} from "../components/CarouselArrowButtons";
import { DotButton, useDotButton } from "../components/CarouselDotButton";
import "../styles/carousel.css";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

export default function CarouselOne({ slides, options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

      <div className="carousel_controls w-full absolute bottom-0 p-3">
        <div className="carousel_buttons">
          <PrevNextButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft />
          </PrevNextButton>

          {/* next button  */}
          <PrevNextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <ChevronRight />
          </PrevNextButton>
        </div>

        <div className="carousel_dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              pressed={index === selectedIndex}
              className="mx-0.5 opacity-70 border border-border rounded-full h-1 md:h-2 min-w-5 md:min-w-8 cursor-pointer transition-all"
            ></DotButton>
          ))}
        </div>
      </div>
    </div>
  );
}
