import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import getVideos from "@lib/strapi/getVideos";
import getCategoriesMenu from "@lib/strapi/getCategoriesMenu";
import getMainPageData from "@lib/strapi/getMainPageData";
import Layout from "@components/layout";
import HeadSEO from "@components/screens/head";
import Header from "@components/screens/header";
import Footer from "@components/screens/footer";
import VideoContent from "@components/screens/video-content";

const VideoPage = ({ locale, categoriesMenu, videoData, fullMenuData }) => {
  const { t } = useTranslation();
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

  return (
    <Layout>
      <Layout.PageHead>
        <HeadSEO
          title={`${t('Video')} - ONLYOFFICE`}
          description={t("VideoPageDescription")}
        />
      </Layout.PageHead>
      <Layout.PageHeader>
        <Header
          t={t}
          locale={locale}
          data={fullMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.PageHeader>
      <Layout.SectionMain>
        <VideoContent
          t={t}
          locale={locale}
          videoData={videoData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      </Layout.SectionMain>
      <Layout.PageFooter>
        <Footer t={t} locale={locale} />
      </Layout.PageFooter>
    </Layout>
  );
};

export const getServerSideProps = async ({ locale, preview }) => {
  const categoriesMenu = await getCategoriesMenu(locale, preview);
  const videoData = await getVideos(locale, preview);
  const fullMenuData = await getMainPageData(locale, preview);

  if (videoData.data === null || videoData.data.length === 0) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      locale,
      categoriesMenu,
      videoData,
      fullMenuData,
      preview: !!preview
    },
  };
};

export default VideoPage;