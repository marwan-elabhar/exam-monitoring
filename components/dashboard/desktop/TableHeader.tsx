const HEADER_CELL_CLASS = "text-xs font-medium uppercase tracking-wider text-secondary";

export function TableHeader() {
  return (
    <div role="rowgroup" className="shrink-0 border-b border-border bg-surface">
      <div role="row" className="flex items-center px-6 h-11 gap-4">
        <span role="columnheader" className={`w-[100px] shrink-0 ${HEADER_CELL_CLASS}`}>Risk</span>
        <span role="columnheader" className={`w-[260px] shrink-0 ${HEADER_CELL_CLASS}`}>Name</span>
        <span role="columnheader" className={`w-[160px] shrink-0 ${HEADER_CELL_CLASS}`}>Status</span>
        <span role="columnheader" className={`w-[160px] shrink-0 ${HEADER_CELL_CLASS}`}>Last Active At</span>
        <span role="columnheader" className={`flex-1 ${HEADER_CELL_CLASS}`}>Actions</span>
      </div>
    </div>
  );
}
