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
  if (!isVisible) return;

  return (
    <div
      className={`w-full h-full bg-black bg-opacity-25 fixed inset-0 z-[768686999999] backdrop-blur-sm flex items-center justify-center box-border ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={() => onClose()}
    >
      <div
        className={`w-full mx-auto max-w-sm lg:max-w-md relative transition-all scale-100 opacity-100 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-100"
        }`}
        id="modelWrapper"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute -right-6 top-4 cursor-pointer"
          onClick={() => onClose()}
        >
          <X className="size-5 md:size-6 lg:size-7" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
