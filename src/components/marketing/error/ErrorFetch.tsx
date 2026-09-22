import { RotateCcw } from "lucide-react";
import type { QueryObserverResult } from "@tanstack/react-query";

type ErrorFetchProps = {
  refetch: () => Promise<QueryObserverResult>;
};

export default function ErrorFetch({ refetch, text }: ErrorFetchProps & { text: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-red-500">{text}</span>
      <button className="bg-red-600 rounded-full cursor-pointer p-2 flex items-center" onClick={() => refetch()}>
        <RotateCcw size={18} color="white" />
      </button>
    </div>
  );
}