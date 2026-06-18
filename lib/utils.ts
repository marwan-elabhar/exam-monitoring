/**
 * Converts an ISO timestamp to a relative time string.
 * e.g. "just now", "2 min ago", "1 hr ago"
 */
export function formatRelativeTime(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 30) return "just now";
    if (seconds < 90) return "1 min ago";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

/**
 * Merges class names.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}
