export default function CardComponentSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Search / category title */}
      <div className="h-5 w-52 rounded bg-gray-700" />

      {/* Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 pt-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl bg-gray-800"
          >
            {/* Poster */}
            <div className="aspect-2/3 w-full bg-gray-700" />

            {/* Card content */}
            <div className="flex flex-col gap-2 p-3">
              {/* Title */}
              <div className="h-5 w-4/5 rounded bg-gray-700" />

              {/* Rating / year */}
              <div className="h-4 w-2/5 rounded bg-gray-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <div className="h-9 w-9 rounded-md bg-gray-700" />
        <div className="h-9 w-9 rounded-md bg-gray-700" />
        <div className="h-9 w-9 rounded-md bg-gray-700" />
        <div className="h-9 w-9 rounded-md bg-gray-700" />
        <div className="h-9 w-9 rounded-md bg-gray-700" />
      </div>
    </div>
  );
}