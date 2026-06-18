import {memo} from "react";
import {formatRelativeTime} from "@/lib/utils";

interface LastActiveCellProps {
    isoString: string;
}

export const LastActiveCell = memo(function LastActiveCell({isoString}: LastActiveCellProps) {
    return (
        <div>
            <time
                dateTime={isoString}
                className="text-xs text-secondary"
                title={new Date(isoString).toLocaleString()}
            >
                {formatRelativeTime(isoString)}
            </time>
        </div>
    );
});
