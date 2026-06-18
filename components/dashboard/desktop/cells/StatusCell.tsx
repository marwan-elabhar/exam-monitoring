import {memo} from "react";
import {SessionStatus} from "@/types";
import {StatusBadge} from "@/components/dashboard/Badge";

interface StatusCellProps {
    status: SessionStatus;
}

export const StatusCell = memo(function StatusCell({status}: StatusCellProps) {
    return (
        <div>
            <StatusBadge status={status}/>
        </div>
    );
});
