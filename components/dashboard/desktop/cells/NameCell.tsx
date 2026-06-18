import { memo } from "react";

interface NameCellProps {
  name: string;
}

export const NameCell = memo(function NameCell({ name }: NameCellProps) {
  return (
    <div className="w-[260px] shrink-0 min-w-0">
      <span className="text-sm font-medium text-primary truncate block">{name}</span>
    </div>
  );
});
