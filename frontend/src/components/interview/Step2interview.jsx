import { useState } from "react";
import maleVideo from "../../assets/male-ai.mp4";
import femaleVideo from "../../assets/female-ai.mp4";
import { AnimatePresence, motion } from "motion/react";
import { FiCamera, FiCameraOff, FiCode, FiMic, FiMicOff } from "react-icons/fi";
function Step2interview({ interviewData, user }) {
  // — State —
  const [question, setQuestion] = useState(interviewData.question);
  const [currentIndex, setCurrentIndex] = useState(
    interviewData.currentQuestion || 0,
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(interviewData.question.timer || 60);
  const [timerActive, setTimerActive] = useState(true); // paused once the answer is submitted

  // UI toggles
  const [micOn, setMicOn] = useState(true);
  // user's manual preference — only changed by the mic button
  const [cameraOn, setCameraOn] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  // Speech
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");
  const [introSpoken, setIntroSpoken] = useState(false);

  // Refs
  const aiVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  const videoSource = voiceGender === "female" ? femaleVideo : maleVideo;

  const showMicon = micOn && !isAIPlaying;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-[#0E1016] border border-white/10 rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,.03)] grid lg:grid-cols-[36%_64%]"
      >
        {/* left  */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-white/8 p-4 sm:p-5 gap-3">
          {/* Ai Video */}
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
            <video
              src={videoSource}
              ref={aiVideoRef}
              muted
              playsInline
              preload="auto"
              loop
              className="w-full h-full object-cover"
            />
            {isAIPlaying && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
                <div className="flex gap-0.5 items-end h-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      animate={{ height: ["4px", "12px", "4px"] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-white/80">AI Speaking</span>
              </div>
            )}
          </div>
          <div className="min-h-[52px] flex items-center">
            <AnimatePresence>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full rounded-xl bg-white/5 border border-white/8 px-3 py-2"
                >
                  <p className="text-xs text-white/65 leading-relaxed text-center">
                    {subtitle}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-[#17181E] border border-white/8 aspect-video flex items-center justify-center">
            {cameraOn ? (
              <>
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />

                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-[10px] text-white/70">You</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <span className="text-xs text-white/35">
                  {user?.name.split(" ")[0]}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5 pt-1">
            <div className="flex items-center justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  showMicon
                    ? "bg-white/10 border-white/15 text-white"
                    : "bg-red-500/20 border-red-500/30 text-red-400"
                }`}
              >
                {showMicon ? <FiMic size={15} /> : <FiMicOff size={15} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  cameraOn
                    ? "bg-white/10 border-white/15 text-white"
                    : "bg-red-500/20 border-red-500/30 text-red-400"
                }`}
              >
                {cameraOn ? <FiCamera size={15} /> : <FiCameraOff size={15} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCodeOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5 border-white/10 text-white/45 hover:text-white hover:border-white/20 transition-all"
              >
                <FiCode size={15} />
              </motion.button>
            </div>
            <div className="min-h-[14px] flex items-center justify-center">
              {micOn && isAIPlaying && (
                <span className="text-[10px] text-red-400/80">
                  Mic paused - AI is speaking
                </span>
              )}
            </div>

            <span className="text-[10px] text-white/35 text-center">
              Coding question? Use{" "}
              <FiCode size={9} className="inline -mt-0.5" />
              to write &amp; add code
            </span>
          </div>
        </div>

        {/* right */}
      </motion.div>
    </div>
  );
}

export default Step2interview;
