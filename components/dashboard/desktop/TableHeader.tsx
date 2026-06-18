"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleSort } from "@/store/slices/filtersSlice";
import { selectSortDirection } from "@/store/selectors";
import { ChevronDownIcon } from "@/components/ui/icons/ChevronDownIcon";
import { cn } from "@/lib/utils";

const HEADER_CELL_CLASS = "text-xs font-medium uppercase tracking-wider text-secondary";

export function TableHeader() {
  const dispatch = useAppDispatch();
  const sortDirection = useAppSelector(selectSortDirection);

  return (
    <div role="rowgroup" className="shrink-0 border-b border-border bg-surface">
      <div role="row" className="flex items-center px-6 h-11 gap-4">
        <span role="columnheader" className={`w-[100px] shrink-0 ${HEADER_CELL_CLASS}`}>
          Risk
        </span>
        <span role="columnheader" className={`w-[260px] shrink-0 ${HEADER_CELL_CLASS}`}>
          Name
        </span>
        <span role="columnheader" className={`w-[160px] shrink-0 ${HEADER_CELL_CLASS}`}>
          Status
        </span>

        {/* Sortable Last Active At header */}
        <button
          role="columnheader"
          type="button"
          aria-label={`Sort by last active, currently ${sortDirection === "desc" ? "newest first" : "oldest first"}`}
          aria-sort={sortDirection === "desc" ? "descending" : "ascending"}
          onClick={() => dispatch(toggleSort())}
          className={cn(
            "w-[160px] shrink-0 flex items-center gap-1 cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary rounded",
            HEADER_CELL_CLASS,
            "hover:text-primary transition-colors"
          )}
        >
          Last Active At
          <ChevronDownIcon
            width="12"
            height="12"
            className={cn(
              "transition-transform duration-200",
              sortDirection === "asc" && "rotate-180"
            )}
          />
        </button>

        <span role="columnheader" className={`flex-1 ${HEADER_CELL_CLASS}`}>
          Actions
        </span>
      </div>
    </div>
  );
}
