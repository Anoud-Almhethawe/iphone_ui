import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap";
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";

const HowitWorks = () => {
  const videoRef = useRef();
  useGSAP(() => {
    gsap.to(".video", {
      scrollTrigger: {
        trigger: ".video",
        toggleActions: "play none reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      ease: "Power2.easeInOut",
      duration: 1,
    });

    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom ",
        toggleActions: "restart reverse restart reverse",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="flex-center w-full my-20" id="chip">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip. <br /> A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It’s here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-40">
          <div className="relative flex-center h-full ">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="z-10 relative bg-transparent"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none video"
                ref={videoRef}
                muted
                autoPlay
                preload="none"
                playsInline
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Start Rail
          </p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
              .
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowitWorks;
