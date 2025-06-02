import StyledVideoItem from "./styled-video-item";
import YouTube from "react-youtube";
import Heading from "@components/common/heading";
import Text from "@components/common/text";

const VideoItem = ({ data, isMain }) => {
  return (
    <StyledVideoItem className="video-item">
      <div className="video-item-frame">
        <YouTube
          videoId={data.url}
          opts={{
            width: isMain ? "512" : "224",
            height: "auto"
          }}
        />
      </div>
      <Heading
        className={`video-item-title ${isMain && "main"}`}
        label={data.title}
        level={5}
      />
      {isMain && data.description &&
        <Text className="video-item-description" label={data.description} as="p" />
      }
    </StyledVideoItem>
  );
};

export default VideoItem;
