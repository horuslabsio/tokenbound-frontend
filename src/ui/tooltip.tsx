import { ReactNode } from "react";

interface ITooltip {
  message: string;
  children: ReactNode;
}

export function Tooltip({ message, children }: ITooltip) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 z-50 scale-0 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
