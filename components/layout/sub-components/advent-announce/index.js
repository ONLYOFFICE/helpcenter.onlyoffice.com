import { useRouter } from "next/router";
import { OOAdventAnnounce } from "onlyoffice-react-ui-kit/advent-announce";
import "onlyoffice-react-ui-kit/advent-announce/css";

const AdventAnnounce = () => {
  const router = useRouter();
  const locale = router.locale === "pt-BR" ? "pt" : router.locale || "en";

  return (
    <OOAdventAnnounce locale={locale} />
  );
};

export default AdventAnnounce;
