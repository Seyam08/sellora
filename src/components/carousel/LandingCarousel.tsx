"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { EmblaOptionsType } from "embla-carousel";
import { AutoplayOptionsType } from "embla-carousel-autoplay";
import CarouselOne from "./carousel-types/CarouselOne";
import { CarouselThree } from "./carousel-types/CarouselThree";
import "./styles/carousel-global.css";
// import "./styles/carousel-two.css";

const OPTIONS: EmblaOptionsType = { loop: false, duration: 30 };
const OPTIONS2: EmblaOptionsType = { loop: false, duration: 30 };
const AUTOPLAY_OPTION: AutoplayOptionsType = { playOnInit: true, delay: 5000 };

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
const slides2 = [
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
        <Separator />
        {/* <CarouselTwo slides={slides2} options={OPTIONS2} /> */}
        <CarouselThree slides={slides} options={OPTIONS} />
      </div>
    </>
  );
}
