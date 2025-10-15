"use client";

import { EmblaOptionsType } from "embla-carousel";
import CarouselOne from "./carousel-types/CarouselOne";

const OPTIONS: EmblaOptionsType = { loop: false, duration: 30 };

const slides = [
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=1`}
    alt="Your alt text"
  />,
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=2`}
    alt="Your alt text"
  />,
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=3`}
    alt="Your alt text"
  />,
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=4`}
    alt="Your alt text"
  />,
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=5`}
    alt="Your alt text"
  />,
  <img
    className="rounded-sm block h-96 w-full object-cover"
    src={`https://picsum.photos/600/350?v=6`}
    alt="Your alt text"
  />,
];

export default function LandingCarousel() {
  return (
    <>
      <div className="carousel">
        <CarouselOne slides={slides} options={OPTIONS} />
      </div>
    </>
  );
}
