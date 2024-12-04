import FeaturesMobile from "./FeaturesMobile";
import FeaturesDesktop from "./FeaturesDesktop";
const Features = () => {
  return (
    <section className="container mx-auto flex flex-col items-center gap-8 p-4 md:p-8">
      <h2 className="mx-auto w-full max-w-[15rem] text-center md:max-w-[30.5rem] 2xl:max-w-[42rem]">
        Empowering Your NFTs with{" "}
        <span className="text-gradient">Next-Level</span> Functionality
      </h2>
      <FeaturesMobile />
      <FeaturesDesktop />
    </section>
  );
};

export default Features;
