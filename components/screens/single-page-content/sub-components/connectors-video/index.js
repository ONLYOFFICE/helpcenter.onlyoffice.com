import React, { useMemo, useState, useEffect } from "react";
import StyledVideo from "./styled-video";
import Heading from "@components/common/heading";
import Box from "@components/common/box";
import VideoItem from "./sub-components/video-item";
import Carousel from "@components/common/carousel";

const Video = ({ t, items }) => {
  // set all current videos data
  const curVideos = useMemo(() => {
    return items?.attributes.videos.data;
  }, [items]); 
  const [filteredArray, setFilteredArray] = useState(curVideos);
  const [mobile, setMobile] = useState(false);
  const [videosForCarLenght, setVideosForCarLenght] = useState(2);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) {
      setFilteredArray(curVideos.slice(1));
      setMobile(false);
      setVideosForCarLenght(2);
    } else {
      setFilteredArray(curVideos);
      setMobile(true);
      setVideosForCarLenght(1);
    }
  };

  useEffect(() => {
    if (curVideos.length >= 2) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  return (
    <StyledVideo id="watchvideo">
      <Heading level={4}>{t("WatchVideo")}</Heading>
      <Box className={`vids ${curVideos.length == 1 ? 'single' : ''}`}>
        {curVideos.slice(0, 1)?.map((it, index) => {
          return <VideoItem t={t} key={index} data={it} isMain={true} className={`main ${curVideos.length == 1 ? 'single' : ''}`} />;
        })}
        {filteredArray.length > 1 && <Carousel className="vids-car" isArrows={filteredArray.length > videosForCarLenght ? true : false} t={t} items={filteredArray}/>}
        {(curVideos.length == 2 && !mobile) && <VideoItem t={t} data={filteredArray[0]} isMain={false} className="second" />}
      </Box>
    </StyledVideo>
  );
};

export default Video;