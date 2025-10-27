export function HeroDivider() {
    return (
        <div className="-translate-y-28 md:-translate-y-36 lg:-translate-y-36">
            <div className="divider-bottom">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                    className="z-[1500]"
                >
                    <g fill="#000">
                        <path
                            d="M0 0v100c166.7 0 166.7-66 333.3-66S500 77 666.7 77 833.3 28 1000 28V0H0Z"
                            opacity=".5"
                            className="shape-fill"
                        ></path>
                        <path
                            d="M0 0v100c166.7 0 166.7-66 333.3-66S500 70 666.7 70 833.3 16 1000 16V0H0Z"
                            opacity=".5"
                            className="shape-fill"
                        ></path>
                        <path
                            d="M0 0v100c166.7 0 166.7-66 333.3-66S500 63 666.7 63 833.3 4 1000 4V0H0Z"
                            className="shape-fill"
                        ></path>
                    </g>
                </svg>
            </div>
            <div className="divider-top">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                    className="z-[1500]"
                >
                    <g fill="#000">
                        <path
                            d="M1000 100C500 100 500 64 0 64V0h1000v100Z"
                            opacity=".5"
                            className="shape-fill"
                        ></path>
                        <path
                            d="M1000 100C500 100 500 34 0 34V0h1000v100Z"
                            opacity=".5"
                            className="shape-fill"
                        ></path>
                        <path
                            d="M1000 100C500 100 500 4 0 4V0h1000v100Z"
                            className="shape-fill"
                        ></path>
                    </g>
                </svg>
            </div>
        </div>
    );
}
