import {cn} from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({className}: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "animate-pulse rounded bg-[rgba(255,255,255,0.06)]",
                className
            )}
        />
    );
}

export function TableRowSkeleton() {
    return (
        <div
            role="row"
            aria-hidden="true"
            className="flex items-center h-14 px-6"
            style={{boxSizing: "border-box", width: "100%"}}
        >
            <div className="shrink-0" style={{width: "12%", paddingRight: 16}}>
                <Skeleton className="w-12 h-5"/>
            </div>
            <div className="shrink-0" style={{width: "25%", paddingRight: 16}}>
                <Skeleton className="w-32 h-4"/>
            </div>
            <div className="shrink-0" style={{width: "21%", paddingRight: 16}}>
                <Skeleton className="w-20 h-4"/>
            </div>
            <div className="shrink-0" style={{width: "20%", paddingRight: 16}}>
                <Skeleton className="w-24 h-4"/>
            </div>
            <div
                className="shrink-0 flex justify-end gap-2"
                style={{width: "22%", minWidth: 340}}
            >
                <Skeleton className="w-20 h-7"/>
                <Skeleton className="w-24 h-7"/>
                <Skeleton className="w-20 h-7"/>
            </div>
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="rounded-lg bg-card border border-border p-3 space-y-3"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-14 h-5"/>
                    <Skeleton className="w-28 h-4"/>
                </div>
                <Skeleton className="w-20 h-5"/>
            </div>
            <Skeleton className="w-24 h-3"/>
            <div className="flex gap-2 pt-1 border-t border-border">
                <Skeleton className="flex-1 h-8"/>
                <Skeleton className="w-8 h-8"/>
            </div>
        </div>
    );
}