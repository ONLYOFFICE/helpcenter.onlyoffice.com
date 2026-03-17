import React, { useEffect, useRef, useState } from "react";
import StyledVideoContent from "./styled-video-content";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import VideoItem from "@components/screens/common/video-item";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import Heading from "@components/common/heading";
import ScrollToTopButton from "@components/screens/common/scroll-to-top-button";
import { extractHeadings, handleArticleScroll } from "@utils/scroll-highlight-functions";

const VideoContent = ({ t, videoData, leftMenuIsOpen, setLeftMenuIsOpen }) => {
  const [headings, setHeadings] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef(null);
  const leftMenuRef = useRef(null);
  const groupedVideos = {};
  const order = ['Docs', 'Docspace', 'Workspace', 'Connectors', 'Desktop', 'Mobile'];

  videoData.data.forEach(video => {
    Object.keys(video).forEach(key => {
      if (key.startsWith('article') && video[key]) {
        const groupName = key === 'article'
          ? 'Connectors'
          : key.replace('article_', '').charAt(0).toUpperCase() + key.slice(9);

        if (!groupedVideos[key]) {
          groupedVideos[key] = { name: groupName, videos: [] };
        }
        groupedVideos[key].videos.push(video);
      }
    });
  });

  const sortedGroupedVideos = Object.keys(groupedVideos)
    .sort((a, b) => {
      const nameA = groupedVideos[a].name;
      const nameB = groupedVideos[b].name;
      return order.indexOf(nameA) - order.indexOf(nameB);
    })
    .map(key => groupedVideos[key]);

  useEffect(() => {
    if (contentRef.current) {
      setHeadings(extractHeadings(contentRef.current, null, "h4"));
    }
  }, [contentRef]);

  useEffect(() => {
    const scrollHandler = (event) => handleArticleScroll(false, contentRef.current, contentRef.current.offsetHeight, leftMenuRef.current, document.querySelector("header").offsetHeight + 16, "h4", setShowButton);
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <StyledVideoContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          ref={leftMenuRef}
          headings={headings}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper" ref={contentRef}>
          <Breadcrumbs t={t} pageName={t("Video")} />
          {Object.entries(sortedGroupedVideos).map(([key, group]) => (
            <div id={`${group.name.toLowerCase()}_block`} key={key}>
              <Heading level={4}>{group.name}</Heading>
              <div className="video-items">
                {group.videos.map(video => (
                  <VideoItem key={video.id} data={video} isMain={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <ScrollToTopButton $showButton={showButton} />
      </StyledWrapperContent>
    </StyledVideoContent>
  );
};

export default VideoContent;
