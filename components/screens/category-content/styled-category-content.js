import styled from "styled-components";
import Section from "@components/common/section";
import globalColors from "@components/utils/global-colors";

const StyledCategoryContent = styled(Section)`
  .section-page {
    display: flex;
  }

  .wrapper-description {
    &:not(:last-child) {
      margin-bottom: 24px;
    }

    a {
      color: ${globalColors.orangeMain};

      &:hover {
        text-decoration: none;
      }
    }
  }

  .category-items {
    margin: 24px 0 0 0;

    .category-item {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }

  .category-articles {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;
    list-style-type: none;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    div {
      display: flex;
      align-items: center;
      color: ${globalColors.orangeMain};
      text-decoration: underline;

      img {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        object-fit: contain;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

export default StyledCategoryContent;
