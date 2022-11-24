import styled, { css } from "styled-components";
import arrow_gray from "@static/images/icons/slideshow_next-prev.png"

const StyledCarousel = styled.div`
  margin: 0 auto;
  padding: 0px;
  .slick-slider {
    margin: 0 auto;
    padding: 0px;
    .slide {
      .carousel-image {
        width: 100%;
      }
    }
    .slick-list{
      margin: 24px 0;
    }
    ${(props) =>
      props.arrows
        ? css`
            .slick-arrow {
              position: relative;
              cursor: pointer;
              font-size: 0;
              height: 12px;
              outline: none;
              display: block;
              width: 26px;
              margin: 0 auto;
            }
            .slick-arrow:before {
              content: "";
              background-image: url(${arrow_gray});
              background-repeat: no-repeat;
              background-position: 0 0;
              display: block;
              height: 12px;
              width: 26px;
              margin: 0 auto;
            }
            .slick-prev, .slick-next {
              z-index: 1;
              transform: none !important;
              right: auto;
              top: auto;
              left: auto;
              bottom: auto;
            }
            .slick-prev::before {
              transform: rotate(0deg);
            }
            .slick-next::before {
              transform: rotate(180deg);
            }
          `
        : css`
            .slick-arrow {
              display: none !important;
            }
          `}
  }
  @media (max-width: 1200px) {
    .slick-slider {
      .slide-carousel {
        width: 100vw;
        height: 65vw;
      }
      .slick-arrow {
        display: none !important;
      }
    }
  }
  @media (max-width: 1024px) {
    .slick-slider {
      .slide-carousel {
        width: 100vw;
        height: 60vw;
      }
    }
  }
  @media (max-width: 576px) {
    .slick-slider {
      .slide-carousel {
        margin: 0;
      }
    }
  }
`;

export default StyledCarousel;
