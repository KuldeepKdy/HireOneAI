import React from "react";
import { FiDownload } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { useCoins } from "../../apis/user.api.js";

function DownloadBtn({ docRef, user, setUser }) {
  const handlePdf = useReactToPrint({
    content: docRef,
    documentTitle: "HireOneAIPDF",
  });

  const handleDownload = async () => {
    try {
      const coinResponse = await useCoins({
        coins: 10,
        action: "resume-builder",
      });

      setUser((prev) => ({
        ...prev,
        interviewCoin: coinResponse?.interviewCoin,
      }));

      handlePdf();
    } catch (error) {
      if (error.response?.status === 403) {
        return alert("Not enough interview coins");
      }
      alert(
        error.response?.data?.message ||
          "Something went wrong, try again later",
      );
    }
  };
  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs text-white"
    >
      <FiDownload />
      Download PDF
    </button>
  );
}

export default DownloadBtn;
