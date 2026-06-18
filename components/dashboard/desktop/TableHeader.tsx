"use client";

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {toggleSort} from "@/store/slices/filtersSlice";
import {selectSortDirection} from "@/store/selectors";
import {ChevronDownIcon} from "@/components/ui/icons/ChevronDownIcon";
import {cn} from "@/lib/utils";

const HEADER_CELL_CLASS = "text-xs font-medium uppercase tracking-wider text-secondary";

export function TableHeader() {
    const dispatch = useAppDispatch();
    const sortDirection = useAppSelector(selectSortDirection);

    return (
        <div role="rowgroup" className="shrink-0 border-b border-border bg-surface">
            <div
                role="row"
                className="flex items-center h-11 px-6"
                style={{boxSizing: "border-box", width: "100%"}}
            >
        <span
            role="columnheader"
            style={{width: "12%", paddingRight: 16}}
            className={`shrink-0 ${HEADER_CELL_CLASS}`}
        >
          Risk
        </span>
                <span
                    role="columnheader"
                    style={{width: "25%", paddingRight: 16}}
                    className={`shrink-0 ${HEADER_CELL_CLASS}`}
                >
          Name
        </span>
                <span
                    role="columnheader"
                    style={{width: "21%", paddingRight: 16}}
                    className={`shrink-0 ${HEADER_CELL_CLASS}`}
                >
          Status
        </span>

                <button
                    role="columnheader"
                    type="button"
                    aria-label={`Sort by last active, currently ${sortDirection === "desc" ? "newest first" : "oldest first"}`}
                    aria-sort={sortDirection === "desc" ? "descending" : "ascending"}
                    onClick={() => dispatch(toggleSort())}
                    style={{width: "20%", paddingRight: 16}}
                    className={cn(
                        "shrink-0 flex items-center gap-1 cursor-pointer",
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

                <span
                    role="columnheader"
                    style={{width: "22%", minWidth: 340}}
                    className={`shrink-0 text-right ${HEADER_CELL_CLASS}`}
                >
          Actions
        </span>
            </div>
        </div>
    );
}