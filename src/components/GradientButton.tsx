import React, { useEffect } from "react";

interface GradientButtonProps {
  onClickCB?: () => void;
}
const GradientButton = ({ onClickCB }: GradientButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const ubsub = setTimeout(() => {
      if (ref?.current) {
        ref.current.click();
      }
    }, 2000);

    return () => {
      clearTimeout(ubsub);
    };
  }, []);

  return (
    <button
      ref={ref}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300"
      onClick={() => {
        if (onClickCB) onClickCB();
      }}
    >
      VUI LÒNG ĐỢI TÍ
    </button>
  );
};

export default GradientButton;
