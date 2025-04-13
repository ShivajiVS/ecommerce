import clsx from "clsx";
import { X } from "lucide-react";

export const Model = ({
  children,
  isVisible,
  onClose,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[768686999999] flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm",
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          "w-full mx-auto max-w-sm lg:max-w-md relative transform transition-all duration-300 ease-in-out",
          isVisible ? "opacity-100 scale-105" : "opacity-0  scale-0"
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute -right-1.5 md:-right-6 top-4 cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
          onClick={onClose}
        >
          <X className="size-6 lg:size-7" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
