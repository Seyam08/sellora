"use client";

import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./components/EmblaCarousel";
import "./styles/embla.css";

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Carousel() {
  return (
    <>
      <div className="carousel">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </>
  );
}
