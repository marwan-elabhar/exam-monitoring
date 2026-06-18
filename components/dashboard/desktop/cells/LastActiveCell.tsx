import { formatRelativeTime } from "@/lib/utils";

interface LastActiveCellProps {
  isoString: string;
}

export function LastActiveCell({ isoString }: LastActiveCellProps) {
  return (
    <div className="w-[160px] shrink-0">
      <time
        dateTime={isoString}
        className="text-xs text-secondary"
        title={new Date(isoString).toLocaleString()}
      >
        {formatRelativeTime(isoString)}
      </time>
    </div>
  );
}
