import {SelectHTMLAttributes, useId} from "react";
import {cn} from "@/lib/utils";
import {ChevronDownIcon} from "@/components/ui/icons/ChevronDownIcon";

export interface DropdownOption<T extends string> {
    label: string;
    value: T;
}

interface DropdownProps<T extends string>
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
    value: T;
    onChange: (value: T) => void;
    options: DropdownOption<T>[];
    label: string;
    placeholder?: string; // shown as the first "all" option
}

export function Dropdown<T extends string>({
                                               value,
                                               onChange,
                                               options,
                                               label,
                                               placeholder = "All",
                                               className,
                                               ...props
                                           }: DropdownProps<T>) {
    const id = useId();

    return (
        <div className={cn("relative flex items-center", className)}>
            {/* Visually hidden label */}
            <label htmlFor={id} className="sr-only">
                {label}
            </label>

            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className={cn(
                    "w-full h-10 pl-3 pr-8 rounded-md text-sm appearance-none",
                    "bg-card border border-border",
                    "text-primary",
                    "transition-colors duration-150",
                    "hover:border-[rgba(255,255,255,0.15)]",
                    "focus:outline-none focus:border-action-primary focus:ring-1 focus:ring-action-primary",
                    "cursor-pointer"
                )}
                {...props}
            >
                <option value="all">{placeholder}</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            <ChevronDownIcon className="absolute right-2.5 text-secondary pointer-events-none shrink-0"/>
        </div>
    );
}
