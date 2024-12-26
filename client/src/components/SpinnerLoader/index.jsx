import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";

const SpinnerLoader = () => {
  const text = "Loading in progress. please wait";
  const characters = text.split("");

  const radius = 80;
  const fontSize = "15px";
  const letterSpacing = 10.5;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation = [];
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      animate(letterAnimation, {
        repeat: Number.POSITIVE_INFINITY,
      });
      animate(
        scope.current,
        { rotate: 360 },
        { duration: 4, repeat: Number.POSITIVE_INFINITY }
      );
    };
    animateLoader();
  }, [animate, scope, characters]);

  const letter = "absolute top-0 left-[50%] text-black";
  return (
    <section className="h-full w-full flex justify-center items-center ">
      <motion.div
        ref={scope}
        className="relative aspect-square"
        style={{ width: radius * 2 }}
      >
        <p aria-label={text} />
        <p aria-hidden="true">
          {characters.map((ch, i) => (
            <motion.span
              key={i}
              className={`${letter} letter-${i}`}
              style={{
                transformOrigin: `0 ${radius}px`,
                transform: `rotate(${i * letterSpacing}deg)`,
                fontSize,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </section>
  );
};

export default SpinnerLoader;
