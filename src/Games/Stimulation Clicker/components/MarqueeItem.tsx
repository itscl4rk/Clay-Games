import { motion } from "framer-motion";
import React from "react";

export default function NewsMarquee({
  texts,
  from,
  to,
}: {
  texts: string[];
  from: number | string;
  to: number | string;
}) {
  return (
    <div className="flex overflow-hidden w-full">
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: `${from}` }}
          animate={{ x: `${to}` }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 whitespace-nowrap"
        >
          {texts.map((text, index) => (
            <React.Fragment key={`${i}-${index}`}>
              <p className="text-xl text-zinc-900 pr-3 border-b border-zinc-900">
                {text}
              </p>
              {index < texts.length - 1 && (
                <span className="text-xl text-zinc-900 pr-3 border-b border-zinc-900">
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
