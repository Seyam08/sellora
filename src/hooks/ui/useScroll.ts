"use client";

import { throttle } from "lodash";
import { useEffect, useState } from "react";

type ScrollState = {
  isScrollTop: boolean;
  isScrollUp: boolean;
  isScrollBottom: boolean;
};

export function useScroll(topPoint: number): ScrollState {
  const [isScrollTop, setScrollTop] = useState<boolean>(true);
  const [isScrollUp, setScrollUp] = useState<boolean>(true);
  const [isScrollBottom, setScrollBottom] = useState<boolean>(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = throttle((event: Event) => {
      const target = event.target as Document | HTMLElement;
      let scrollableHeight = 0;

      if (target instanceof Document) {
        scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
      } else {
        scrollableHeight = target.scrollHeight - target.offsetHeight;
      }

      const currentScrollTop = window.scrollY <= topPoint;
      const currentScrollUp = window.scrollY < prevScrollY;
      const currentScrollBottom = window.scrollY >= scrollableHeight;

      if (currentScrollTop !== isScrollTop) setScrollTop(currentScrollTop);
      if (currentScrollUp !== isScrollUp) setScrollUp(currentScrollUp);
      if (currentScrollBottom !== isScrollBottom)
        setScrollBottom(currentScrollBottom);

      prevScrollY = window.scrollY;
    }, 300);

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [isScrollTop, isScrollUp, isScrollBottom, topPoint]);

  return { isScrollTop, isScrollUp, isScrollBottom };
}
