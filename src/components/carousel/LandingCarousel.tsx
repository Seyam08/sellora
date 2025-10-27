"use client";

import slide1 from "@/assets/images/slide-1.jpg";
import slide2 from "@/assets/images/slide-2.jpg";
import slide3 from "@/assets/images/slide-3.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import { AutoplayOptionsType } from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";
import { CarouselThree } from "./carousel-types/CarouselThree";
import "./styles/carousel-global.css";

const OPTIONS: EmblaOptionsType = { loop: false, duration: 30 };
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
  <div className="w-full relative">
    <Image src={slide1} alt="sellora" className="carousel_slide_img" />
    <div className="carousel_slide_content">
      <div className="w-full md:w-2/3 space-y-10">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Discover Endless Choices in One Place
        </h2>
        <p className="text-base md:text-xl text-foreground">
          Explore thousands of products from trusted vendors across every
          category. From daily essentials to exclusive finds — everything you
          love is just one click away.
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-foreground text-secondary hover:bg-muted-foreground cursor-pointer"
        >
          Shop Now
        </Button>
      </div>
    </div>
  </div>,
  <div className="w-full relative">
    <Image src={slide2} alt="sellora" className="carousel_slide_img" />
    <div className="carousel_slide_content">
      <div className="w-full md:w-2/3 space-y-10">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Grow Your Business on Our Marketplace
        </h2>
        <p className="text-base md:text-xl text-foreground">
          Join our vibrant seller community and reach buyers nationwide. Manage
          orders, track performance, and boost sales — all with powerful tools
          made for modern vendors.
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-foreground text-secondary hover:bg-muted-foreground cursor-pointer"
        >
          Explore Now
        </Button>
      </div>
    </div>
  </div>,
  <div className="w-full relative">
    <Image src={slide3} alt="sellora" className="carousel_slide_img" />
    <div className="carousel_slide_content">
      <div className="w-full md:w-2/3 space-y-10">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Shop Smarter, Save Bigger
        </h2>
        <p className="text-base md:text-xl text-foreground">
          Don&apos;t just shop — win! Enjoy flash sales, seasonal offers, and
          exclusive vendor discounts updated daily. Your next favorite deal is
          waiting for you.
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-foreground text-secondary hover:bg-muted-foreground cursor-pointer"
        >
          Store
        </Button>
      </div>
    </div>
  </div>,
];

export default function LandingCarousel({
  className,
}: {
  className?: React.HtmlHTMLAttributes<"div">["className"];
}) {
  return (
    <div className={cn("carousel", className)}>
      {/* <CarouselOne slides={slides} options={OPTIONS} /> */}
      {/* <CarouselTwo slides={slides2} options={OPTIONS2} /> */}
      <CarouselThree slides={slides2} options={OPTIONS} />
    </div>
  );
}
