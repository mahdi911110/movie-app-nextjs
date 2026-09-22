export default function MovieDetailSkeleton() {
  return (
    <div className="flex w-full justify-center animate-pulse">
      <div className="flex w-full flex-col gap-10 md:gap-14 lg:max-w-225">
        {/* Backdrop + Poster + Movie info */}
        <div className="relative aspect-video w-full shrink-0">
          {/* Backdrop */}
          <div className="absolute inset-0 rounded-2xl bg-gray-800" />

          {/* Poster + Title */}
          <div className="absolute bottom-0 start-0 z-10 flex translate-y-1/3 gap-4 ps-6">
            {/* Poster */}
            <div className="relative aspect-2/3 w-30 shrink-0 rounded-2xl bg-gray-700 md:w-60" />

            {/* Movie information */}
            <div className="flex flex-col justify-end gap-2 pb-6 md:pb-14">
              <div className="h-5 w-32 rounded bg-gray-700 md:h-10 md:w-80" />

              <div className="h-4 w-40 rounded bg-gray-700 md:h-7 md:w-96" />

              <div className="h-4 w-24 rounded bg-gray-700 md:h-7 md:w-40" />
            </div>
          </div>
        </div>

        {/* Movie information */}
        <div className="flex flex-col gap-3">
          <div className="flex min-w-0 flex-col px-5 text-[12px] text-white md:text-3xl">
            {/* Overview */}
            <div className="flex flex-col gap-2 border-b-2 pb-2">
              <div className="h-5 w-28 rounded bg-gray-700 md:h-9 md:w-44" />

              <div className="flex flex-col gap-2">
                <div className="h-4 w-full rounded bg-gray-800 md:h-7" />
                <div className="h-4 w-11/12 rounded bg-gray-800 md:h-7" />
                <div className="h-4 w-3/4 rounded bg-gray-800 md:h-7" />
              </div>
            </div>

            {/* Movie details */}
            <div className="grid grid-cols-3 gap-2 border-b-2 py-2 md:gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="h-4 w-20 rounded bg-gray-700 md:h-7 md:w-32" />
                  <div className="h-4 w-16 rounded bg-gray-800 md:h-7 md:w-24" />
                </div>
              ))}
            </div>

            {/* Spoken languages */}
            <div className="flex flex-col gap-2 border-b-2 py-2">
              <div className="h-4 w-32 rounded bg-gray-700 md:h-7 md:w-48" />

              <div className="flex gap-2">
                <div className="h-4 w-16 rounded bg-gray-800 md:h-6 md:w-24" />
                <div className="h-4 w-20 rounded bg-gray-800 md:h-6 md:w-28" />
                <div className="h-4 w-14 rounded bg-gray-800 md:h-6 md:w-20" />
              </div>
            </div>

            {/* Production countries */}
            <div className="flex flex-col gap-2 border-b-2 py-2">
              <div className="h-4 w-40 rounded bg-gray-700 md:h-7 md:w-60" />

              <div className="flex gap-2">
                <div className="h-4 w-20 rounded bg-gray-800 md:h-6 md:w-28" />
                <div className="h-4 w-24 rounded bg-gray-800 md:h-6 md:w-32" />
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-col gap-2 border-b-2 py-2">
              <div className="h-4 w-16 rounded bg-gray-700 md:h-7 md:w-24" />

              <div className="flex gap-2">
                <div className="h-4 w-16 rounded bg-gray-800 md:h-6 md:w-24" />
                <div className="h-4 w-20 rounded bg-gray-800 md:h-6 md:w-28" />
                <div className="h-4 w-14 rounded bg-gray-800 md:h-6 md:w-20" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 border-b-2 py-4">
              <div className="h-9 w-32 rounded bg-gray-700" />
              <div className="h-9 w-40 rounded bg-gray-700" />
            </div>

            {/* Companies */}
            <div className="flex flex-col gap-2 py-2">
              <div className="h-5 w-36 rounded bg-gray-700 md:h-9 md:w-56" />

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="aspect-square w-20 rounded-2xl bg-gray-800" />
                    <div className="h-3 w-14 rounded bg-gray-700 md:h-4 md:w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}