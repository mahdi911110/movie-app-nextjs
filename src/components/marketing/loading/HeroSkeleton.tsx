export default function HeroSkeleton() {
  return (
    <div className="relative mx-auto aspect-video w-full animate-pulse overflow-hidden rounded-lg lg:max-w-225">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-800" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-800/40 to-transparent" />

      {/* Movie information */}
      <div className="absolute bottom-4 start-12 flex flex-col gap-2 md:bottom-8 md:start-8">
        {/* Title */}
        <div className="h-6 w-40 rounded bg-gray-600 md:h-10 md:w-80" />

        {/* Overview */}
        <div className="flex max-w-[80%] flex-col gap-1.5">
          <div className="h-4 w-full rounded bg-gray-700 md:h-6" />
          <div className="h-4 w-4/5 rounded bg-gray-700 md:h-6" />
        </div>

        {/* Button */}
        <div className="h-8 w-28 rounded-lg bg-gray-600 md:h-10 md:w-36" />
      </div>

      {/* Previous button */}
      <div className="absolute left-0 top-1/2 ml-2 aspect-square w-9 -translate-y-1/2 rounded-full bg-gray-700 md:w-11" />

      {/* Next button */}
      <div className="absolute right-0 top-1/2 mr-2 aspect-square w-9 -translate-y-1/2 rounded-full bg-gray-700 md:w-11" />
    </div>
  );
}