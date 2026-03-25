import { TailSpin } from "react-loader-spinner";

export default function Loader({ text = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-[40vh]"
      }`}
    >
      <TailSpin
        height="60"
        width="60"
        color="#18af78"
        ariaLabel="loading"
      />

      <p className="text-secondF text-sm">{text}</p>
    </div>
  );
}