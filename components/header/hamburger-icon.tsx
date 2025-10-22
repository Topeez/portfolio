"use client";

interface HamburgerIconProps {
    isOpen: boolean;
}

export default function HamburgerIcon({ isOpen }: HamburgerIconProps) {
    return (
        <div className="space-y-1">
            <span
                className={`block h-1 w-6 origin-center bg-foreground rounded-full transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-1" : ""
                }`}
            ></span>
            <span
                className={`block h-1 ml-auto w-4 origin-center bg-foreground rounded-full transition-all duration-300 ease-in-out mt-1.5 ${
                    isOpen ? "-rotate-45 -translate-y-1.5 w-6" : ""
                }`}
            ></span>
        </div>
    );
}
