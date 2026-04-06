import styled from "styled-components";
import Section from "@components/common/section";
import globalColors from "@components/utils/global-colors";

const StyledSubCategoryContent = styled(Section)`
  .subcategory-description {
    margin-bottom: 24px;
  }

  .subcategory-articles {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 32px;
    list-style-type: none;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    a {
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

  .subcategory-block,
  .subcategory-item {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .subcategory-block-title {
    display: flex;
    gap: 8px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  .subcategory-block-list {
    list-style-type: none;

    li {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    a {
      display: block;
      color: ${globalColors.grayMain};

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .video-block {
    margin-top: 40px;
  }

  .faq-item {
    display: flex;
    align-items: center;
    color: #ff6f3d;
    margin-bottom: 24px;
    text-decoration: underline;

    > img {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        object-fit: contain;
    }
  }
`;

export default StyledSubCategoryContent;
