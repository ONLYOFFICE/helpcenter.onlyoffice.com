import { useRouter } from "next/router";
import StyledUpdateNotice from "./styled-update-notice";

const UpdateNotice = ({ categorySlug }) => {
  const { locale } = useRouter();

  if (locale !== "fr" || !["mobile", "mobiles"].includes(categorySlug)) return null;

  return (
    <StyledUpdateNotice>
      <b>Mise à jour en cours.</b> Cet article peut contenir des informations obsolètes.
    </StyledUpdateNotice>
  );
};

export default UpdateNotice;
