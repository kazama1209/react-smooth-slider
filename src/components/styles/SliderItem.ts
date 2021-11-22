import styled from "styled-components";

interface StyledSliderItemProps {
  zoomFactor: number;
  slideMargin: number;
  visibleSlides: number;
  className: string;
}

export const StyledSliderItem = styled.div<StyledSliderItemProps>`
  ${({ slideMargin, visibleSlides, zoomFactor }) => `
    margin: 0 ${slideMargin}px;
    transition: transform 500ms ease;
    border-radius: 0.5vw;
    cursor: pointer;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    transform: scale(1);
    user-select: none;
    flex: 0 0 calc(100% / ${visibleSlides} - ${slideMargin * 2}px);

    img {
      height: 100%;
      width: 100%;
      border-radius: 0.5vw;
      box-sizing: border-box;
      -webkit-user-drag: none;
    }

    :hover {
      transform: scale(${zoomFactor / 100 + 1}) !important;
    }

    :hover ~ * {
      transform: translateX(${zoomFactor / 2 + "%"}) !important;
    }

    &.left {
      transform-origin: left;
      :hover ~ * {
        transform: translateX(${zoomFactor + "%"}) !important;
      }
    }

    &.right {
      transform-origin: right;
      :hover ~ * {
        transform: translateX(0%) !important;
      }
    }
  `}
`;
