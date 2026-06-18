"use client";

import {useSyncExternalStore} from "react";

function subscribe(callback: () => void, query: string): () => void {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
}

function getSnapshot(query: string): boolean {
    return window.matchMedia(query).matches;
}

const getServerSnapshot = (): boolean => false;

export function useMediaQuery(query: string): boolean {
    return useSyncExternalStore(
        (callback) => subscribe(callback, query),
        () => getSnapshot(query),
        getServerSnapshot
    );
}

export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)");
}
