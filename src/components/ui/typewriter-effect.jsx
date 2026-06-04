"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [animate, isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  textClassName,
  textStyle,
  hideCursor = false,
  duration = 2,
  delay = 1,
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          const isLastWord = idx === wordsArray.length - 1;
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-inherit`, word.className)}
                >
                  {char}
                </span>
              ))}
              {!isLastWord && <span>&nbsp;</span>}
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate total animation time (delay + duration)
  const totalAnimationTime = delay + duration;
  // Cursor blink duration per cycle
  const blinkDuration = 0.5;
  // Number of blinks after typing completes
  const blinkCount = 5;

  return (
    <div className={cn("flex items-center", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration,
          ease: "linear",
          delay,
        }}
      >
        <div
          className={textClassName || "text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"}
          style={{
            whiteSpace: "nowrap",
            ...textStyle,
          }}
        >
          {renderWords()}
        </div>
      </motion.div>
      {!hideCursor && (
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
          }}
          transition={{
            duration: blinkDuration * (blinkCount * 2 + (totalAnimationTime / blinkDuration)),
            times: (() => {
              // Generate keyframe times for blinking during typing, then 3 more blinks, then fade out
              const typingBlinkCount = Math.ceil(totalAnimationTime / blinkDuration);
              const totalBlinks = typingBlinkCount + blinkCount;
              const times = [];
              for (let i = 0; i <= totalBlinks * 2; i++) {
                times.push(i / (totalBlinks * 2));
              }
              return times;
            })(),
            ease: "linear",
          }}
          className={cn(
            "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500 ml-[1px]",
            cursorClassName
          )}
        ></motion.span>
      )}
    </div>
  );
};
