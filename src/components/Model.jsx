import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Model = () => {
  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
    });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>
        <div className="m-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]"></div>
        </div>
      </div>
    </section>
  );
};

export default Model;
