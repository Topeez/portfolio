/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React from "react";

type StarBorderProps<T extends React.ElementType> =
    React.ComponentPropsWithoutRef<T> & {
        as?: T;
        className?: string;
        children?: React.ReactNode;
        color?: string;
        speed?: React.CSSProperties["animationDuration"];
        thickness?: number;
    };

const StarBorder = <T extends React.ElementType = "button">({
    as,
    className = "",
    color = "white",
    speed = "6s",
    thickness = 1,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = as || "button";

    return (
        <Component
            className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
            {...(rest as any)}
            style={{
                padding: `${thickness}px 0`,
                ...(rest as any).style,
            }}
        >
            <div
                className="right-[-250%] bottom-[-11px] z-0 absolute opacity-70 rounded-full w-[300%] h-[50%] animate-star-movement-bottom"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="top-[-10px] left-[-250%] z-0 absolute opacity-70 rounded-full w-[300%] h-[50%] animate-star-movement-top"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div className="z-1 relative bg-gradient-to-b from-black to-gray-900 px-[26px] py-[16px] border border-gray-800 rounded-[20px] text-[16px] text-white text-center">
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
