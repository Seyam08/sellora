"use client";

import { EmblaOptionsType } from "embla-carousel";
import Carousel from "./components/Carousel";
import "./styles/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function LandingCarousel() {
  return (
    <>
      <div className="carousel">
        <Carousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
}
