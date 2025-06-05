export function Ambient() {
    return (
        <div className="absolute inset-0 size-full z-[-1]">
            <div className="h-6 w-65 -rotate-[55deg] blur-2xl bg-blue-600 absolute top-12 -left-10 opacity-45 animate-slide-in-ambient-1"></div>
            <div className="h-8 w-[1400px] -rotate-[55deg] blur-3xl bg-sky-400 absolute top-12 -left-82 opacity-75 animate-slide-in-ambient-2 delay-200"></div>
            <div className="h-32 w-[1400px] -rotate-[55deg] blur-2xl bg-blue-600 absolute top-[200px] left-32 opacity-15 animate-slide-in-ambient-3 delay-500"></div>
            <div className="h-[400px] w-[200px] opacity-50 blur-3xl bg-blue-600 absolute top-[400px] right-[400px] animate-fade-in"></div>
        </div>
    );
}