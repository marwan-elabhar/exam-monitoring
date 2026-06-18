"use client";

import {useState, useRef, useEffect, useCallback} from "react";
import {Candidate} from "@/types";
import {RiskBadge, StatusBadge} from "@/components/dashboard/Badge";
import {ActionButton} from "@/components/ui/Button";
import {formatRelativeTime} from "@/lib/utils";

interface CandidateCardProps {
    candidate: Candidate;
    onViewDetails: (candidate: Candidate) => void;
    onSendWarning: (candidate: Candidate) => void;
    onTerminate: (candidate: Candidate) => void;
}

export function CandidateCard({
                                  candidate,
                                  onViewDetails,
                                  onSendWarning,
                                  onTerminate,
                              }: CandidateCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const isEnded =
        candidate.status === "terminated" || candidate.status === "completed";

    // Close menu on outside click
    useEffect(() => {
        if (!menuOpen) return;

        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    // Close menu on Escape
    const handleMenuKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        },
        []
    );

    return (
        <article
            aria-label={`Candidate ${candidate.name}, ${candidate.riskLevel} risk, ${candidate.status}`}
            className="rounded-lg bg-card border border-border flex flex-col"
        >
            <div className="flex items-center justify-between px-3 pt-3 pb-2 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <RiskBadge level={candidate.riskLevel}/>
                    <span className="text-sm font-medium text-primary truncate">
            {candidate.name}
          </span>
                </div>
                <StatusBadge status={candidate.status}/>
            </div>

            <div className="px-3 pb-3">
        <span className="text-xs text-secondary">
          Last active: {formatRelativeTime(candidate.lastActiveAt)}
        </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border-t border-border">
                <ActionButton
                    variant="primary"
                    className="flex-1"
                    onClick={() => onViewDetails(candidate)}
                />

                <div className="relative" ref={menuRef}>
                    <button
                        ref={menuButtonRef}
                        type="button"
                        aria-label="More actions"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-border text-secondary hover:text-primary hover:border-[rgba(255,255,255,0.2)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <circle cx="5" cy="12" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="19" cy="12" r="2"/>
                        </svg>
                    </button>

                    {menuOpen && (
                        <div
                            role="menu"
                            aria-label="Candidate actions"
                            onKeyDown={handleMenuKeyDown}
                            className="absolute bottom-full right-0 mb-1 w-40 rounded-lg border border-border bg-card shadow-lg z-10 overflow-hidden"
                        >
                            <button
                                role="menuitem"
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onSendWarning(candidate);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-action-warning hover:bg-[rgba(255,184,48,0.08)] transition-colors focus-visible:outline-none focus-visible:bg-[rgba(255,184,48,0.08)]"
                            >
                                Send Warning
                            </button>
                            <button
                                role="menuitem"
                                type="button"
                                disabled={isEnded}
                                onClick={() => {
                                    setMenuOpen(false);
                                    onTerminate(candidate);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-action-danger hover:bg-[rgba(255,107,107,0.08)] transition-colors focus-visible:outline-none focus-visible:bg-[rgba(255,107,107,0.08)] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Terminate
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
