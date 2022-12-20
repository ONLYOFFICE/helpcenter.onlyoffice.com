import React from "react";

import StyledCategory from "./styled-category";
import CategoryBox from "./sub-components/category-box";
import IntegrationPic from "@public/images/icons/integration.svg";
import InstallationPic from "@public/images/icons/installation.svg";
import AdministrationPic from "@public/images/icons/administration.svg";
import UserPic from "@public/images/icons/user-guides.svg";
import DeveloperPic from "@public/images/icons/development.svg";
import ContributionPic from "@public/images/icons/contribution.svg";

const Category = ({ t, template, currentLanguage }) => {

  const helpcenter = `https://helpcenter.onlyoffice.com/${
  currentLanguage === "en" ? "" : `${currentLanguage}/`
  }`;

  return (
    <StyledCategory template={template}>
        <CategoryBox t={t} pic={InstallationPic} label="Installation" href={"/installation.aspx"}/>
        <CategoryBox t={t} pic={AdministrationPic} label="Administration" href={"/administration.aspx"}/>
        <CategoryBox t={t} pic={IntegrationPic} label="Integration" href={"/integration.aspx"}/>
        <CategoryBox t={t} pic={UserPic} label="User Guides" href={"/userguides.aspx"}/>
        <CategoryBox t={t} pic={ContributionPic} label="Contribution" href={"/guides/become-translator.aspx"}/>
        <CategoryBox t={t} pic={DeveloperPic} label="Development" href="https://api.onlyoffice.com/"/>
    </StyledCategory>
  );
};

export default Category;