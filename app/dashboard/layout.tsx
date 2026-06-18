"use client";

import {useEffect, useRef} from "react";
import {useAppDispatch} from "@/hooks/redux";
import {setCandidates} from "@/store/slices/candidatesSlice";
import {setLoading} from "@/store/slices/uiSlice";
import {generateMockCandidates} from "@/lib/mock/candidates";
import {registerCandidateIds, startMockEmitter} from "@/lib/realtime/mockEmitter";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    const bootstrapped = useRef(false);

    useEffect(() => {
        // To prevent effects from running twice in dev
        if (bootstrapped.current) return;
        bootstrapped.current = true;

        const candidates = generateMockCandidates(10000);
        dispatch(setCandidates(candidates));
        dispatch(setLoading(false));

        const ids = candidates.map((c) => c.id);
        registerCandidateIds(ids);

        const stopEmitter = startMockEmitter();
        return () => stopEmitter();
    }, [dispatch]);

    return <>{children}</>;
}
