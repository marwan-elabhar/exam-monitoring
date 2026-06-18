import {memo} from "react";
import {RiskLevel} from "@/types";
import {RiskBadge} from "@/components/dashboard/Badge";

interface RiskCellProps {
    level: RiskLevel;
}

export const RiskCell = memo(function RiskCell({level}: RiskCellProps) {
    return (
        <div>
            <RiskBadge level={level}/>
        </div>
    );
});
