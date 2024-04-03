import gsap from "gsap";
import { hightlightsSlides } from "../constance";
import { useState, useRef, useEffect } from "react";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  // references to Keep track of the video we're on.
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
  //
  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to(videoId, {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo(prevVideo => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // use effect for playing the video and pause
  useEffect(() => {
    if (loadedData.length > 3) {
      // loadedData exist
      if (!isPlaying) {
        // video is not playing so
        // specific video we want to trigger and pause it
        videoRef.current[videoId].pause();
      } else {
        // video isplaying and startPlay are true so
        // specific video we want to trigger and play it
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;

    // span element for currently playing video
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }
      // to update progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      // ticker used to update the progress bar
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo(prevVideo => ({ ...prevVideo, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo(prevVideo => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo(prevVideo => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo(prevVideo => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      case "pause":
        setVideo(prevVideo => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };
  const handleLoadedMetadata = (i, e) =>
    setLoadedData(prevVideo => [...prevVideo, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={i} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div
                className="flex-center size-full overflow-hidden rounded-3xl
               bg-black"
              >
                <video
                  ref={el => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo(prevVideo => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onLoadedMetadata={e => handleLoadedMetadata(i, e)}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map(text => (
                  <p key={text} className="text-xl font-medium md:text-2xl ">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* play and pause button and progress bar */}
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200 "
              key={i}
              ref={el => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute size-full rounded-full"
                ref={el => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};
export default VideoCarousel;
