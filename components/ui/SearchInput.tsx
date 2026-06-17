import {InputHTMLAttributes, useId} from "react";
import {cn} from "@/lib/utils";
import {SearchIcon} from "@/components/ui/icons/SearchIcon";

interface SearchInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
    value: string;
    onChange: (value: string) => void;
    label?: string; // visually hidden, for accessibility
}

export function SearchInput({
                                value,
                                onChange,
                                label = "Search candidates",
                                placeholder = "Search by name...",
                                className,
                                ...props
                            }: SearchInputProps) {
    const id = useId();

    return (
        <div className={cn("relative flex items-center", className)}>
            <label htmlFor={id} className="sr-only">
                {label}
            </label>

            {/* Search icon */}
            <SearchIcon
                width="16"
                height="16"
                className="absolute left-3 text-secondary pointer-events-none shrink-0"
            />

            <input
                id={id}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
                className={cn(
                    "w-full h-10 pl-9 pr-3 rounded-md text-sm",
                    "bg-card border border-border",
                    "text-primary placeholder:text-secondary",
                    "transition-colors duration-150",
                    "hover:border-[rgba(255,255,255,0.15)]",
                    "focus:outline-none focus:border-action-primary focus:ring-1 focus:ring-action-primary",
                    // hide the browser's native clear button
                    "[&::-webkit-search-cancel-button]:hidden"
                )}
                {...props}
            />
        </div>
    );
}
