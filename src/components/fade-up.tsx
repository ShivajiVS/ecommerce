"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export const FadeUp = ({
  children,
  delay = 0.5,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let ref = useRef(null);
  let isInView = useInView(ref);

  useEffect(() => {
    if (isInView && !isVisible) setIsVisible(true);
  }, [isVisible, isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial={false}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ delay, type: "spring", duration }}
    >
      {children}
    </motion.div>
  );
};
