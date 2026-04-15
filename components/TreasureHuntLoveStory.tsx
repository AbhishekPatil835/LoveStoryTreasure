"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TreasureHuntLoveStory() {
  const clues = [
    {
      answer: "fattepur",
      title: "Clue 1 — The Day Destiny Knocked",
      hint: "The village in Jalgaon where our arranged meeting unexpectedly began our story.",
      reveal:
        "On 05/10/2025, in Fattepur, at her parents’ home, what began as an arranged setup quietly became the first page of our story.",
      image: "/images/clue1.jpeg"
    },
    {
      answer: "22102025",
      title: "Clue 2 — The First Endless Conversation",
      hint: "The date our calls and texts truly began after deciding to give this a chance.",
      reveal:
        "After that first meeting, our real journey began on 22/10/2025 through late-night calls, texts, and conversations that slowly made us part of each other’s everyday life.",
      image: "/images/clue2.jpeg"
    },
    {
      answer: "16112025",
      title: "Clue 3 — The Promise Ring",
      hint: "The day possibility officially became a promise.",
      reveal:
        "On 16/11/2025, our engagement made the story official — a day that turned hesitation into certainty and memories into forever.",
      image: "/images/clue3.jpeg"
    },
    {
      answer: "22112025",
      title: "Clue 4 — Our First Mumbai Date",
      hint: "The date of our first personal date in the city we both call home.",
      reveal:
        "On 22/11/2025, we stepped into our first personal Mumbai date — just us discovering how beautiful our story could become.",
      image: "/images/clue4.jpeg"
    },
    {
      answer: "26042026",
      title: "Clue 5 — The Final Treasure",
      hint: "The wedding date where every clue in our story leads.",
      reveal:
        "What started in a quiet village home now leads to our biggest day — 26/04/2026, where our story becomes forever.",
      image: "/images/clue5.jpeg"
    }
  ];

  const basePath = "/LoveStoryTreasure";

  const [step, setStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [openFinale, setOpenFinale] = useState(false);
  const [guess, setGuess] = useState("");
  const [shake, setShake] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const huntRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStars(Array.from({ length: 18 }, (_, i) => i));
  }, []);

  const revealStep = (nextStep: number, shouldScroll = false) => {
    setStep(nextStep);
    if (shouldScroll) {
      setTimeout(() => {
        huntRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 150);
    }
  };

  const weddingDate = new Date("2026-04-26T12:00:00");
  const [countdown, setCountdown] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      let diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      diff -= months * 1000 * 60 * 60 * 24 * 30;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * 1000 * 60 * 60 * 24;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * 1000 * 60 * 60;

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * 1000 * 60;

      const seconds = Math.floor(diff / 1000);

      setCountdown({ months, days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentClue =
    step > 0 && step <= clues.length ? clues[step - 1] : null;

  const submitGuess = () => {
    if (!currentClue) return;

    const normalized = guess.toLowerCase().replace(/[^a-z0-9]/g, "");
    const validAnswer = currentClue.answer;

    if (normalized === validAnswer) {
      setGuess("");
      revealStep(step + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const isFinished = step > clues.length;

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800 overflow-hidden relative">
      {stars.map((s) => (
        <motion.div
          key={s}
          className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 + (s % 3) }}
          style={{
            top: `${(s * 13) % 100}%`,
            left: `${(s * 17) % 100}%`
          }}
        />
      ))}

      <section className="min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center bg-gradient-to-b from-amber-100 to-yellow-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-7xl font-serif mb-6">
            Our Treasure Hunt Story
          </h1>
          <p className="max-w-2xl text-base md:text-xl leading-8">
            A romantic journey, a playful mystery, and an adventure through every
            memory that led us here.
          </p>
          <button
            onClick={() => revealStep(1, true)}
            className="mt-8 px-8 py-4 rounded-2xl bg-stone-900 text-white shadow-xl"
          >
            Start the Hunt ✨
          </button>
        </motion.div>
      </section>

      <AnimatePresence>
        {step > 0 && (
          <section
            ref={huntRef}
            className="px-4 md:px-6 py-10 md:py-16 max-w-4xl mx-auto space-y-6 pb-32"
          >
            {clues
              .slice(0, Math.min(Math.max(step - 1, 0), clues.length))
              .map((clue, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 60,
                    scale: 0.85,
                    rotateX: -12,
                    filter: "blur(10px)"
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200"
                >
                  <div className="relative aspect-[4/5] md:aspect-[16/9]">
                    <img
                      src={`${basePath}${clue.image}`}
                      alt={clue.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 md:p-6 text-white">
                    <h2 className="text-xl md:text-3xl font-serif mb-2 leading-tight">
                      {clue.title}
                    </h2>
                    <p className="text-xs md:text-sm opacity-80 mb-2">
                      Solved Memory ✨
                    </p>
                    <p className="leading-6 text-sm md:text-base">
                      {clue.reveal}
                    </p>
                  </div>
                </motion.div>
              ))}

            {!isFinished && currentClue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-100 rounded-3xl p-5 md:p-6 border border-amber-300"
              >
                <h2 className="text-2xl md:text-3xl font-serif mb-2 leading-tight">
                  {currentClue.title}
                </h2>
                <p className="italic text-stone-700">{currentClue.hint}</p>
                <p className="mt-3 text-sm text-stone-500">
                  Solve this clue to reveal the hidden memory photo and story.
                </p>
              </motion.div>
            )}

            {!isFinished ? (
              <motion.div
                animate={shake ? { x: [-6, 6, -6, 0] } : { x: 0 }}
                className="bg-amber-100 rounded-3xl p-5 md:p-6 border border-amber-300"
              >
                <p className="font-semibold mb-3">
                  🧩 Solve the clue to unlock the next memory
                </p>
                <input
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full rounded-2xl px-4 py-3 border border-amber-400 bg-white"
                />
                <button
                  onClick={submitGuess}
                  className="mt-4 w-full md:w-auto px-6 py-3 rounded-2xl bg-amber-700 text-white"
                >
                  Reveal Treasure 🗝️
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {!openFinale ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8 text-center shadow-2xl"
                  >
                    <p className="text-lg italic mb-4">
                      One last playful promise before forever 💖
                    </p>
                    <div className="text-6xl mb-4">💌</div>
                    <p className="mb-6">
                      Tap the heart to unlock your wedding finale
                    </p>
                    <button
                      onClick={() => setOpenFinale(true)}
                      className="px-8 py-4 rounded-full bg-rose-500 text-white text-2xl shadow-lg"
                    >
                      ❤️
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        y: 120
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0
                      }}
                      className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 text-center shadow-2xl"
                    >
                      <h2 className="text-3xl md:text-4xl font-serif mb-4">
                        Wedding Countdown 💍
                      </h2>

                      <div className="grid grid-cols-5 gap-2 md:gap-4 text-center">
                        {Object.entries(countdown).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-2xl md:text-4xl font-bold">
                              {value}
                            </p>
                            <p className="text-xs md:text-sm capitalize">
                              {key}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="mt-4 text-sm md:text-lg">
                        Counting down to 26 April 2026, 12:00 PM 💛
                      </p>
                    </motion.div>

                    <div className="text-center">
                      <button
                        onClick={() => setShowVideo(!showVideo)}
                        className="px-6 py-3 rounded-2xl bg-rose-600 text-white"
                      >
                        Reveal Hidden Video 🎥
                      </button>
                    </div>

                    {showVideo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-3xl overflow-hidden shadow-2xl"
                      >
                        <iframe
                          className="w-full aspect-video rounded-3xl"
                          src="https://www.youtube.com/embed/uCTkWqMp8Pg?autoplay=1&rel=0&modestbranding=1"
                          title="Pre Wedding Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>
        )}
      </AnimatePresence>
    </div>
  );
}