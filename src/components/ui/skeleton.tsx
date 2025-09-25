import { cn } from "~/lib/utils";

function Skeleton({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-300 animate-pulse rounded-md min-h-3", className)}
      {...props}
    />
  );
}

export { Skeleton };
