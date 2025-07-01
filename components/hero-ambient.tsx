export function Ambient() {
    return (
        <div className="hidden md:block z-[-1] absolute inset-0 size-full">
            <div className="top-12 -left-10 absolute bg-blue-600 opacity-45 blur-2xl w-65 h-6 -rotate-[55deg] animate-slide-in-ambient-1"></div>
            <div className="top-12 -left-82 absolute bg-sky-400 opacity-75 blur-3xl w-[1400px] h-8 -rotate-[55deg] animate-slide-in-ambient-2 delay-200"></div>
            <div className="top-[200px] left-32 absolute bg-blue-600 opacity-15 blur-2xl w-[1400px] h-32 -rotate-[55deg] animate-slide-in-ambient-3 delay-500"></div>
            <div className="top-[325px] right-[400px] absolute bg-blue-600 opacity-50 blur-3xl w-[200px] h-[400px] animate-fade-in-ambient4"></div>
        </div>
    );
}