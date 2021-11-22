import React, { useState, useEffect, useRef } from "react";

import {
  StyledSliderWrapper,
  StyledSlider,
  StyledButtonWrapper,
  StyledButton,
} from "components/styles/Slider";

import SliderItem from "components/SliderItem";

interface SliderProps {
  children?: any;
  zoomFactor: number;
  slideMargin: number;
  maxVisibleSlides: number;
  pageTransition: number;
}

const Slider: React.FC<SliderProps> = ({
  children,
  zoomFactor,
  slideMargin,
  maxVisibleSlides,
  pageTransition,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [transformValue, setTransformValue] = useState<string>(
    `-${zoomFactor / 2}%`
  );
  const [windowWidth, setWindowWith] = useState<number>(0);
  const sliderRef = useRef<HTMLElement>(null);

  /* 画面サイズによってスライドの表示枚数を決定 */
  const numberOfSlides = (
    maxVisibleSlides: number,
    windowWidth: number
  ): number => {
    if (windowWidth > 1024) return maxVisibleSlides; /* パソコンを想定 */
    if (windowWidth > 768) return 4; /* タブレットを想定 */

    return 3; /* スマホを想定 */
  };

  const visibleSlides = numberOfSlides(maxVisibleSlides, windowWidth);
  const totalPages: number = Math.ceil(children.length / visibleSlides) - 1;

  /* 画面サイズを測定 */
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWindowWith(entries[0].contentRect.width);
    });
    // @ts-ignore
    resizeObserver.observe(sliderRef.current);
  }, [sliderRef]);

  /* スライダーの位置を調整 */
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (currentPage > totalPages) setCurrentPage(totalPages);

      sliderRef.current.style.transform = `translate3D(-${
        currentPage * windowWidth
      }px, 0, 0)`;
    }
  }, [sliderRef, currentPage, windowWidth, totalPages]);

  /* ページ推移中はスライドのホバー効果を無効にする（でないと推移中にマウスがスライドの上に乗った場合の見栄えが悪くなってしまう） */
  const disableHoverEffect = () => {
    if (sliderRef.current) sliderRef.current.style.pointerEvents = "none";

    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.pointerEvents = "all";
    }, pageTransition);
  };

  /* ページを推移させる */
  const handleSlideMove = (forward: boolean) => {
    disableHoverEffect();
    setCurrentPage(currentPage + (forward ? 1 : -1));

    if (sliderRef.current)
      sliderRef.current.style.transform = `translate3D(-${
        (currentPage + (forward ? 1 : -1)) * windowWidth
      }px, 0, 0)`;
  };

  /* マウスオーバー時の挙動 */
  const handleMouseOver = (id: number) => {
    if (id % visibleSlides === 1) setTransformValue("0%"); /* left */
    if (id % visibleSlides === 0)
      setTransformValue(`-${zoomFactor}%`); /* right */
  };

  /* マウスオアウト時の挙動 */
  const handleMouseOut = () => {
    setTransformValue(`-${zoomFactor / 2}%`);
  };

  const assignSlideClass = (index: number, visibleSlides: number) => {
    const classes = ["right", "left"];

    return classes[index % visibleSlides] || "";
  };

  return (
    <StyledSliderWrapper zoomFactor={zoomFactor} visibleSlides={visibleSlides}>
      <StyledSlider
        visibleSlides={visibleSlides}
        transformValue={transformValue}
        zoomFactor={zoomFactor}
        slideMargin={slideMargin}
        pageTransition={pageTransition}
        ref={sliderRef}
      >
        {children.map((child: any, index: number) => (
          <SliderItem
            key={index}
            slideMargin={slideMargin}
            visibleSlides={visibleSlides}
            zoomFactor={zoomFactor}
            slideClass={assignSlideClass(index + 1, visibleSlides)}
            id={index + 1}
            callback={handleMouseOver}
            callbackOut={handleMouseOut}
          >
            {child}
          </SliderItem>
        ))}
      </StyledSlider>
      {currentPage > 0 && (
        /* バックボタン */
        <StyledButtonWrapper zoomFactor={zoomFactor} isForward={false}>
          <StyledButton
            isForward={false}
            onClick={() => handleSlideMove(false)}
          >
            &#8249;
          </StyledButton>
        </StyledButtonWrapper>
      )}
      {currentPage !== totalPages && (
        /* フォワードボタン */
        <StyledButtonWrapper zoomFactor={zoomFactor} isForward={true}>
          <StyledButton isForward={true} onClick={() => handleSlideMove(true)}>
            &#8250;
          </StyledButton>
        </StyledButtonWrapper>
      )}
    </StyledSliderWrapper>
  );
};

export default Slider;
