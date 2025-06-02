import StyledVideoBlock from "./styled-video-block";
import YouTube from "react-youtube";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import InternalLink from "@components/common/internal-link";

const VideoBlock = ({ t, video }) => {
 
  return (
    <StyledVideoBlock className="video-block">
      <Heading className="video-block-title" level={3} dangerouslySetInnerHTML={{ __html: t("VideosWithASimilarTopic") }} />

      <div className="video-block-wrapper">
        <YouTube className="video-block-youtube" videoId={video.url} />
        <div className="video-block-content">
          <Heading className="video-block-name" level={4} label={video.title} />
          <Text className="video-block-description" label={video.description} />
        </div>
      </div>

      <InternalLink className="video-block-link" label={t("MoreVideos")} href="/video.aspx" />
    </StyledVideoBlock>
  );
};

export default VideoBlock;
