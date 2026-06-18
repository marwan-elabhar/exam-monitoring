import {memo} from "react";

interface NameCellProps {
    name: string;
}

export const NameCell = memo(function NameCell({name}: NameCellProps) {
    return (
        <div>
            <span className="text-sm font-medium text-primary truncate block">{name}</span>
        </div>
    );
});
