import { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import "../styles/carousel.css";
import { PrevNextButton, usePrevNextButtons } from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButton";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
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
          {slides.map((index) => (
            <div className="carousel_slide" key={index}>
              <img
                className="carousel_slide__img"
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
              />
            </div>
          ))}
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
              className="mx-0.5 border border-border rounded-full h-2"
            ></DotButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
