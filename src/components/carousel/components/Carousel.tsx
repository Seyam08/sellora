import { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <img
                className="embla__slide__img"
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          {/* <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} /> */}
          {/* <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} /> */}
          {/* prev button  */}
          <PrevNextButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <ArrowLeft />
          </PrevNextButton>

          {/* next button  */}
          <PrevNextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <ArrowRight />
          </PrevNextButton>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
