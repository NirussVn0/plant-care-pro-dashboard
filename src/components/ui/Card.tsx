import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function Card({
  children,
  className,
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-surface rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden transition-shadow duration-300 hover:shadow-md",
          !noPadding && "p-6",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
