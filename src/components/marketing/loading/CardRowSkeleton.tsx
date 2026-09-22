export default function CardRowSkeleton() {
  return (
    <div className="flex w-full animate-pulse gap-x-3.5 overflow-hidden p-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative w-32 shrink-0 overflow-hidden rounded-xl bg-gray-800 md:w-45"
        >
          {/* Poster */}
          <div className="aspect-2/3 w-full bg-gray-700" />

          {/* Movie title */}
          <div className="flex flex-col gap-2 p-2">
            <div className="h-4 w-4/5 rounded bg-gray-700" />
            <div className="h-3 w-2/5 rounded bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}