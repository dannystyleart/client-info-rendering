import React, { useCallback } from "react";

export const CopyContents: React.FC<React.PropsWithChildren<{
    targetId: string
}>> = ({
    targetId,
    children = 'Copy'
}) => {
        const copyContents = useCallback((event: React.MouseEvent) => {

            const target: HTMLElement | null = document.getElementById(targetId);

            if (!target) return;

            navigator.clipboard.writeText(target.innerText);

            alert("Copied!")
        }, []);

        return (
            <button onClick={copyContents}>
                {children}
            </button>
        )
    }