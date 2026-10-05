import { useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiAward, FiTarget, FiTrendingUp } from "react-icons/fi";
import DownloadBtn from "../resume/DownloadBtn";

function Step3report({ report, user, setUser }) {
  const navigate = useNavigate();
  const reportRef = useRef();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center md:p-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl rounded-[24px] bg-gray-100 border border-white/10 overflow-hidden"
      >
        <div className="border-b border-white/10 px-8 py-6 flex items-center justify-between">
          <div>
            <div
              onClick={() => navigate("/dashboard")}
              className="inline-flex cursor-pointer items-center gap-2 text-white rounded-full border border-black/20 bg-black px-3 py-1.5 "
            >
              <FiArrowLeft size={14} />
              <span className="text-xs text-zinc-100 ">Back</span>
            </div>

            <h1 className="text-2xl font-bold text-black mt-2">
              Interview Report
            </h1>

            <p className="text-xs mb-2 text-zinc-500 mt-1.5">
              AI Generated Performance Analysis
            </p>

            <DownloadBtn docRef={reportRef} user={user} setUser={setUser} />
          </div>

          <div className="hidden md:flex items-center gap-2.5 rounded-2xl border border-black/34 bg-black px-4 py-2.5">
            <FiAward className="text-yellow-400" size={16} />
            <span className="text-sm text-white">Completed</span>
          </div>
        </div>

        <div className="p-8" ref={reportRef}>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                <FiTarget size={18} />
              </div>

              <p className="mt-5 text-zinc-500 text-xs">Overall Score</p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                {report.overallScore}
                <span className="text-lg text-zinc-500">/100</span>
              </h2>
            </div>

            <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                <FiTrendingUp size={18} />
              </div>
              <p className="mt-5 text-zinc-500 text-xs">Questions</p>
              <h2 className="mt-2 text-4xl font-bold text-white">
                {report.questions.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-[#17181E] border border-white/10 p-6">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
                <FiAward size={18} />
              </div>
              <p className="mt-5 text-zinc-500 text-xs">Status</p>
              <h2 className="mt-2 text-4xl font-bold text-white">Completed</h2>
            </div>


          </div>


          
        </div>
      </motion.div>
    </div>
  );
}

export default Step3report;
