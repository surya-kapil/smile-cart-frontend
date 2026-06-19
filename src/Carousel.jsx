import { useState, useEffect, useRef } from "react";

import className from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const handlePrevious = () => {
    resetTimer();
    setCurrentIndex(prev => (prev - 1 + imageUrls.length) % imageUrls.length);
    console.log(imageUrls[currentIndex]);
    console.log(currentIndex);
  };

  const handleNext = () => {
    resetTimer();
    setCurrentIndex(prev => (prev + 1) % imageUrls.length);
    //console.log(currentIndex);
  };

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  }

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* previous JSX returned by Carousel component as it is */}
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={handleNext}
        />
      </div>
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={className(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": currentIndex === index }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
