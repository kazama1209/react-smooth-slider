import styled from "styled-components";
import { StyledSliderItem } from "components/styles/SliderItem";

interface StyledSliderWrapperProps {
  zoomFactor: number;
  visibleSlides: number;
}

export const StyledSliderWrapper = styled.div<StyledSliderWrapperProps>`
  overflow: hidden;
  position: relative;
  background: #333132;
  padding: ${(props) => (props.zoomFactor / props.visibleSlides) * 0.7 + "%"} 0;
`;

interface StyledSliderProps {
  visibleSlides: number;
  transformValue: string;
  zoomFactor: number;
  slideMargin: number;
  pageTransition: number;
  ref: any;
}

export const StyledSlider = styled.div<StyledSliderProps>`
  display: flex;
  padding: 0 55px;
  transition: transform ${(props) => props.pageTransition}ms ease;

  :hover ${StyledSliderItem} {
    transform: translateX(${(props) => props.transformValue});
  }
`;

interface StyledButtonWrapperProps {
  zoomFactor: number;
  isForward: boolean;
}

export const StyledButtonWrapper = styled.div<StyledButtonWrapperProps>`
  position: absolute;
  border-radius: ${(props) =>
    props.isForward ? "0.5vw 0 0 0.5vw" : "0 0.5vw 0.5vw 0"};
  box-sizing: border-box;
  top: 0;
  ${(props) => (props.isForward ? "right: 0;" : "left: 0;")};
  width: 55px;
  height: 100%;
  padding: ${(props) => props.zoomFactor / 8 + "%"} 0;
`;

interface StyledButtonProps {
  isForward: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  background: rgb(0, 0, 0, 0.7);
  border: 0;
  border-radius: ${(props) =>
    props.isForward ? "0.5vw 0 0 0.5vw" : "0 0.5vw 0.5vw 0"};
  top: 0;
  ${(props) => (props.isForward ? "right: 0;" : "left: 0;")};
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
`;
