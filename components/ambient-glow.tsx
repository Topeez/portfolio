export function AmbientGlow() {
    return (
        <div className="relative size-full">
            <div className="top-[300px] right-1/2 absolute bg-sky-400 blur-[70px] rounded-full h-[500%] aspect-square translate-x-1/2"></div>
            <div className="top-[380px] right-1/2 absolute bg-blue-600 blur-[70px] rounded-full h-[500%] aspect-square translate-x-1/2"></div>
            <div className="top-[400px] right-1/2 absolute bg-background blur-[70px] rounded-full h-[500%] aspect-square translate-x-1/2"></div>
        </div>
    );
}
