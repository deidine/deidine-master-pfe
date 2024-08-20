 import { cn } from "@/utils/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        ` animate-slide-background-x rounded-sm bg-[linear-gradient(80deg,#eeeeee_0%,#dedede_50%,#eeeeee_75%)] bg-[size:200%_100%]
         `,
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
