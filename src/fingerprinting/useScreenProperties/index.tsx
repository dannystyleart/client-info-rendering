import { ChangeEvent, useEffect, useState } from "react"

declare global {
    interface Screen extends ScreenOrientation {
        
    }
}

export const useScreenProperties = () => {
    const [screenProps, setScreenProps] = useState<{width: number, height: number}>({ width: 0, height: 0});

    useEffect(()=>{
        const processScreenObject = (screen: Screen) => {
            const { availHeight: height, availWidth: width } = screen;
            setScreenProps({ height, width })
        }

        const handleWindowChange = (event: Event) =>processScreenObject(event.target as Screen);

        if(typeof window !== 'undefined'){
            processScreenObject(window.screen);

            window.screen.addEventListener('change', handleWindowChange)
        }

        return () => {
            window.screen.removeEventListener('change', handleWindowChange);            
        }
    },[]);

    return screenProps;
}