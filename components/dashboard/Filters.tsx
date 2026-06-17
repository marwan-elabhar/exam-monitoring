"use client";

import {useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useDebounce} from "@/hooks/useDebounce";
import {setSearch, setRisk, setStatus} from "@/store/slices/filtersSlice";
import {RiskLevel, SessionStatus} from "@/types";
import {SearchInput} from "@/components/ui/SearchInput";
import {Dropdown, DropdownOption} from "@/components/ui/Dropdown";

const RISK_OPTIONS: DropdownOption<RiskLevel | "all">[] = [
    {label: "High", value: "high"},
    {label: "Medium", value: "medium"},
    {label: "Low", value: "low"},
];

const STATUS_OPTIONS: DropdownOption<SessionStatus | "all">[] = [
    {label: "Active", value: "active"},
    {label: "Idle", value: "idle"},
    {label: "Reconnecting", value: "reconnecting"},
    {label: "Terminated", value: "terminated"},
    {label: "Completed", value: "completed"},
];

export function Filters() {
    const dispatch = useAppDispatch();
    const risk = useAppSelector((s) => s.filters.risk);
    const status = useAppSelector((s) => s.filters.status);

    const [searchInput, setSearchInput] = useState("");
    const debouncedSearch = useDebounce(searchInput, 300);

    useEffect(() => {
        dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    return (
        <section
            aria-label="Filters"
            className="flex flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:gap-2 border-b border-border"
        >
            <SearchInput
                value={searchInput}
                onChange={setSearchInput}
                className="w-full md:w-80"
            />

            <div className="flex gap-2">
                <Dropdown
                    label="Filter by risk level"
                    placeholder="Risk"
                    value={risk}
                    onChange={(v) => dispatch(setRisk(v))}
                    options={RISK_OPTIONS}
                    className="flex-1 md:w-40 md:flex-none"
                />

                <Dropdown
                    label="Filter by status"
                    placeholder="Status"
                    value={status}
                    onChange={(v) => dispatch(setStatus(v))}
                    options={STATUS_OPTIONS}
                    className="flex-1 md:w-44 md:flex-none"
                />
            </div>
        </section>
    );
}
