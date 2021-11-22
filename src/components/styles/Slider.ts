import styled from "styled-components";
import { StyledSliderItem } from "components/styles";

interface StyledSliderWrapperProps {
  zoomFactor: number;
  visibleSlides: number;
}

export const StyledSliderWrapper = styled.div<StyledSliderWrapperProps>`
  ${({ zoomFactor, visibleSlides }) => `
    overflow: hidden;
    position: relative;
    background: #333132;
    padding: ${(zoomFactor / visibleSlides) * 0.7 + "%"} 0;
  `}
`;

interface StyledSliderProps {
  visibleSlides: number;
  pageTransition: number;
  transformValue: string;
  zoomFactor: number;
  slideMargin: number;
  ref: any;
}

export const StyledSlider = styled.div<StyledSliderProps>`
  ${({ pageTransition, transformValue }) => `
    display: flex;
    padding: 0 55px;
    transition: transform ${pageTransition}ms ease;

    :hover ${StyledSliderItem} {
      transform: translateX(${transformValue});
    }
  `}
`;

interface StyledButtonWrapperProps {
  isForward: boolean;
  zoomFactor: number;
}

export const StyledButtonWrapper = styled.div<StyledButtonWrapperProps>`
  ${({ isForward, zoomFactor }) => `
    position: absolute;
    border-radius: ${isForward ? "0.5vw 0 0 0.5vw" : "0 0.5vw 0.5vw 0"};
    box-sizing: border-box;
    top: 0;
    ${isForward ? "right: 0;" : "left: 0;"};
    width: 55px;
    height: 100%;
    padding: ${zoomFactor / 8 + "%"} 0;
  `}
`;

interface StyledButtonProps {
  isForward: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ isForward }) => `
    display: block;
    background: rgb(0, 0, 0, 0.7);
    border: 0;
    border-radius: ${isForward ? "0.5vw 0 0 0.5vw" : "0 0.5vw 0.5vw 0"};
    top: 0;
    ${isForward ? "right: 0;" : "left: 0;"};
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 3rem;
    font-weight: 800;
    cursor: pointer;
    outline: none;
    transition: all 0.7s;
    user-select: none;

    :hover {
      opacity: 0.5;
    }
  `}
`;
