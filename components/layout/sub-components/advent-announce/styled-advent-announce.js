import styled from "styled-components";

const StyledAdventAnnounce = styled.div`
.oo-advent-announce {
  &.oo-advent-announce--active {
    overflow: hidden;

    .oo-advent-announce-wrapper {
      @media screen and (max-width: 1024px) {
        transform: translate3d(429px, 0, 0);
        transition: transform 0.2s cubic-bezier(0.16, 0.68, 0.43, 0.99);
      }

      @media screen and (max-width: 592px) {
        transform: translate3d(calc(-48px + 100vw), 0, 0);
      }

      @media screen and (max-width: 375px) {
        transform: translate3d(calc(-32px + 100vw), 0, 0);
      }
    }
  }

  &.ar {
    &.oo-advent-announce--active {
      .oo-advent-announce-wrapper {
        @media screen and (max-width: 1024px) {
          transform: translate3d(-429px, 0, 0);
        }

        @media screen and (max-width: 592px) {
          transform: translate3d(calc(48px - 100vw), 0, 0);
        }

        @media screen and (max-width: 375px) {
          transform: translate3d(calc(32px - 100vw), 0, 0);
        }
      }
    }
  }
}

.oo-advent-announce-wrapper {
  position: relative;
  display: block;
  width: 100%;
  height: 56px;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  background-color: #120754;
  background-image: linear-gradient(to right, #120754 0%, #120962 32%, #140f86 62%, #0c119e 81%, #050a79 100%);

  &.fr {
    .oo-advent-announce-text {
      max-width: 1050px;
    }
  }

  &.es {
    .oo-advent-announce-text {
      max-width: 1040px;
    }
  }

  &.it {
    .oo-advent-announce-text {
      max-width: 1002px;
    }
  }

  &.ja {
    .oo-advent-announce-text {
      max-width: 1030px;
    }
  }

  &.de .oo-advent-announce-text {
    max-width: 980px;
  }

  &.pt,
  &.pt-br {
    .oo-advent-announce-text {
      max-width: 1090px;
    }
  }

  &.zh,
  &.zh-hans {
    .oo-advent-announce-text {
      max-width: 750px;
    }
  }

  @media screen and (max-width: 1024px) {
    height: 48px;
    background-image:
      url("/images/advent-announce/ai_updates_bg_mobile.png"),
      linear-gradient(to right, #120754 0%, #120962 32%, #140f86 62%, #0c119e 81%, #050a79 100%);
    background-position:
      calc(50% - 71px) -51px,
      center;
    background-size:
      1165px 191px,
      100% 100%;
  }
}

.oo-advent-announce-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  max-width: 960px;
  height: 100%;
  color: #ffffff;
  text-decoration: none;
  z-index: 10;

  &:after,
  &:before {
    content: "";
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &:before {
    width: 72px;
    min-width: 72px;
    height: 71px;
    background-image: url("/images/advent-announce/ai_icon.svg");
    background-size: 72px 71px;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  &:after {
    margin: 0 13px;
    width: 24px;
    min-width: 24px;
    height: 24px;
    background-image: url("/images/advent-announce/arrow_right.svg");

    @media screen and (max-width: 1024px) {
      margin: 0 0 0 2px;
    }
  }

  @media screen and (max-width: 1024px) {
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  @media screen and (max-width: 375px) {
    max-width: 247px;
  }
}

.oo-advent-announce-text-desktop {
  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.oo-advent-announce-text-mobile {
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
  }
}`;

export default StyledAdventAnnounce;