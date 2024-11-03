// app/(platform)/_components/sidebar/Buttons.tsx
import React from "react";
import { DraftingCompass, Share2 } from "lucide-react";
import useGraphStore from "@/stores/graphStore";

const Buttons = () => {
  const { setGoesTrue, setSliderPosition, isAnimating, setIsAnimating } =
    useGraphStore();

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGoesTrue();

    const startTime = Date.now();
    const duration = 30000; // 30 seconds for the full year animation
    const frameDuration = 100; // Update every 100ms for smoother animation
    let lastUpdateTime = startTime;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Only update if enough time has passed since last update
      if (currentTime - lastUpdateTime >= frameDuration) {
        // Cubic easing for smoother progression
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Calculate the new slider position based on eased progress
        const newSliderPosition = easedProgress * 100;

        // Update the slider position in the store
        setSliderPosition(newSliderPosition);

        lastUpdateTime = currentTime;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="w-full h-full flex justify-between flex-col">
      <div className="flex flex-col w-full">
        <div className="relative group">
          <div className="w-full aspect-square flex justify-center items-center p-2 relative">
            <div className="w-[0.35rem] h-[0.35rem] bg-blue-950 rounded-full absolute top-2 right-2"></div>
            <DraftingCompass className="w-full h-full stroke-[0.8] text-blue-950 text-opacity-45" />
          </div>
        </div>
        <div className="w-full aspect-square flex justify-center items-center p-2 group hover:bg-blue-950 transition duration-200">
          <Share2
            className={`w-full h-full stroke-[0.8] text-blue-950 fill-blue-950 group-hover:text-white group-hover:fill-white transition duration-200 ${
              isAnimating ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!isAnimating) {
                startAnimation();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Buttons;
