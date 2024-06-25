import { useCallback, useEffect, useState } from "react"
import { LOCAL_STORAGE_INTRO_SEEN_KEY } from "./intro.types";

export const useIntroState = (): [boolean, () => void] => {
    const [showIntro, setShowIntro] = useState(false);
    useEffect(()=>{
        const introSeenStatus = localStorage.getItem(LOCAL_STORAGE_INTRO_SEEN_KEY);

        if(introSeenStatus !== 'true') {
            setShowIntro(true);
        }
    },[setShowIntro]);

    const setIntroSeen = useCallback(()=>{
        setShowIntro(false);
        localStorage.setItem(LOCAL_STORAGE_INTRO_SEEN_KEY, 'true');
    }, [setShowIntro])

    return [showIntro, setIntroSeen];
}