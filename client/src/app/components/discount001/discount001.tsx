interface Discount001Props {
    rate: number;
}

export default function Discount001(props: Discount001Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 143.53 177.42"
        >
            <defs>
                <style>
                    {`.cls-1{fill:url(#linear-gradient);}
                    .cls-2{fill:url(#linear-gradient-2);}
                    .cls-3,.cls-4,.cls-5{fill:#181a21;}
                    .cls-4,.cls-6{font-size:42.89px;letter-spacing:-0.05em;}
                    .cls-4,.cls-5{stroke:#181a21;stroke-linecap:round;stroke-linejoin:round;stroke-width:6px;}
                    .cls-4,.cls-5,.cls-6,.cls-7,.cls-8{font-family:Impact;}
                    .cls-5,.cls-7{font-size:45.02px;letter-spacing:-0.05em;}
                    .cls-6,.cls-8{fill:#fff;}
                    .cls-7{fill:#f4d63b;}
                    .cls-8{font-size:31.32px;letter-spacing:-0.05em;}`}
                </style>
                <linearGradient
                    id="linear-gradient"
                    x1="19.59"
                    y1="142.31"
                    x2="28.64"
                    y2="126.89"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#f6ba26" />
                    <stop offset="1" stopColor="#dc7e22" />
                </linearGradient>
                <linearGradient
                    id="linear-gradient-2"
                    x1="134.8"
                    y1="-36.36"
                    x2="31.95"
                    y2="92.54"
                    gradientTransform="matrix(0.74, 0.68, -0.74, 0.68, 53.81, -5.7)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#f4d63b" />
                    <stop offset="1" stopColor="#ebb029" />
                </linearGradient>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
                <g id="TEXTS">
                    <path
                        className="cls-1"
                        d="M4.76,138.88l1.5-20.28c1-13.95,10.21-16.86,18.35-17.82l33.3-3.94L55.24,132.9Z"
                    />
                    <ellipse
                        className="cls-2"
                        cx="71.77"
                        cy="72.01"
                        rx="75.04"
                        ry="68.58"
                        transform="translate(-29.88 73.72) rotate(-46.06)"
                    />
                    <path
                        className="cls-3"
                        d="M2.61,162.06h0l3.65-43.57h0c-1,13.72,7.89,14.71,16,13.75L141.71,117l-8.07,36.61a11.18,11.18,0,0,1-9.5,8.68L18.63,175.8C10.49,176.77,3.88,171.1,2.61,162.06Z"
                    />
                    <rect
                        className="cls-3"
                        x="27.7"
                        y="42.44"
                        width="79.15"
                        height="53.58"
                    />
                    <text
                        className="cls-4"
                        transform="matrix(0.99, -0.15, 0, 1, 25.25, 77.48)"
                    >
                        PRICE
                    </text>
                    <text
                        className="cls-5"
                        transform="matrix(0.99, -0.15, 0, 1, 27.2, 116.59)"
                    >
                        DROP
                    </text>
                    <text
                        className="cls-6"
                        transform="matrix(0.99, -0.15, 0, 1, 25.25, 77.48)"
                    >
                        PRICE
                    </text>
                    <text
                        className="cls-7"
                        transform="matrix(0.99, -0.15, 0, 1, 27.2, 116.59)"
                    >
                        DROP
                    </text>
                    <text
                        className="cls-8"
                        transform="matrix(0.99, -0.13, 0, 1, 24.71, 167.06)"
                    >
                        {props.rate}% OFF
                    </text>
                </g>
            </g>
        </svg>
    );
}
