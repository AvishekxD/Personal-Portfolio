'use client';

import React from 'react';

interface TechnicalDrawingProps {
    className?: string;
}

const TechnicalDrawing: React.FC<TechnicalDrawingProps> = ({
    className = ''
}) => {
    return (
        // The main container div for the SVG, applying responsive positioning and opacity.
        // 'will-change-transform' is added for potential animation performance.
        // Positioning adjusted to better match the image's general placement.
        <div className={` ${className} will-change-transform absolute bottom-8 sm:bottom-12 md:bottom-8 p-3 right-1/5 sm:right-1/3 md:right-34`}>
            <svg
                viewBox="0 0 1400 600"
                className="w-full h-full max-w-screen-xl max-h-[600px]" // Ensure responsiveness and max size
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Main horizontal construction line - adjusted Y position slightly */}
                <line

                    x1="0" y1="300" x2="1400" y2="300"
                    stroke="#999"
                    strokeWidth="1"
                    strokeDasharray="8,4"
                />

                {/* Curved construction lines - Refined with more control points for more complex curves */}
                {/* Each path now uses multiple cubic Bezier segments (C) to create a more organic, multi-point curve,
            similar to the hand-drawn feel of the reference image. */}
                <path d="M 200 100 C 250 30, 350 70, 400 120 S 500 200, 600 250" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 800 100 C 850 30, 950 70, 1000 120 S 1100 200, 1200 290" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 150 400 C 200 470, 300 430, 350 380 S 450 320, 550 300" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 850 400 C 900 470, 1000 430, 1050 380 S 1150 200, 1290 140" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 400 50 C 450 0, 550 50, 600 100 S 650 150, 700 200" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 700 200 C 750 250, 850 350, 900 400 S 950 450, 1000 500" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 500 550 C 550 600, 650 550, 700 500 S 750 450, 800 400" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />
                <path d="M 600 250 C 650 300, 750 400, 800 450 S 850 500, 900 550" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="8,4" />


                {/* Gray rectangular boxes - translucent, no borders, overlapping effect */}

                {/* Top row  */}

                <rect x="253" y="235" width="100" height="65" fill="rgba(128,128,128,0.2)" />
                <rect x="473" y="190" width="120" height="110" fill="rgba(128,128,128,0.2)" />
                <rect x="995" y="190" width="120" height="110" fill="rgba(128,128,128,0.2)" />

                {/* Middle row  */}
                <rect x="353" y="300" width="120" height="110" fill="rgba(128,128,128,0.2)" />
                <rect x="535" y="240" width="120" height="115" fill="rgba(128,128,128,0.2)" />
                <rect x="775" y="240" width="120" height="115" fill="rgba(128,128,128,0.2)" />

                {/* Bottom row  */}
                <rect x="253" y="300" width="100" height="65" fill="rgba(128,128,128,0.2)" />
                <rect x="473" y="300" width="120" height="110" fill="rgba(128,128,128,0.2)" />
                <rect x="655" y="300" width="120" height="110" fill="rgba(128,128,128,0.2)" />
                <rect x="775" y="300" width="120" height="110" fill="rgba(128,128,128,0.2)" />
                <rect x="940" y="300" width="120" height="110" fill="rgba(128,128,128,0.2)" />


                {/* Small empty squares - adjusted positions to match image */}
                <rect x="515" y="203" width="10" height="10" fill="none" stroke="black" strokeWidth="0.3"  />
                <rect x="505" y="193" width="30" height="30" fill="none" stroke="black" strokeWidth="0.3"  />
                <rect x="890" y="60" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="880" y="50" width="30" height="30" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="210" y="431" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="200" y="421" width="30" height="30" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="580" y="562" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="570" y="552" width="30" height="30" fill="none" stroke="#000" strokeWidth="0.5" />
                <rect x="355" y="404" width="5" height="5" fill="none" stroke="#000" strokeWidth="0.5" className='fill-zinc-800'/>
                <rect x="695" y="240" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="695" y="362" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" />
                <rect x="432" y="150" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" />
                {/* <rect x="1225" y="315" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" /> */}
                {/* <rect x="1340" y="315" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" /> */}


                {/* Left side corner bracket - adjusted path to match image more closely */}
                {/* Center reference box */}
                {/* Center Box (optional for reference) */}
                <rect x="130" y="295" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />

                {/* Top-left bracket ┌ */}
                <g transform="translate(173, 340)">
                <path d="M-15,-8 H-8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Top-right bracket ┐ */}
                <g transform="translate(97, 340)">
                <path d="M14,-8 H8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-left bracket └ */}
                <g transform="translate(173, 260)">
                <path d="M-15,8 H-8 V15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-right bracket ┘ */}
                <g transform="translate(97, 260)">
                <path d="M14,8 H8 V15" fill="none" stroke="#000" strokeWidth="2"/>
                </g>
                


                {/* Left side text - adjusted position and font size */}
                <text
                    x="77" y="283"
                    fontFamily="font-mono"
                    fontSize="9"
                    fill="#000"
                >
                    V 2.5
                </text>
                <text
                    x="77" y="295"
                    fontFamily="font-mono"
                    fontSize="9"
                    fill="#000"
                >
                    7 - A5
                </text>

                {/* Left side bracket - adjusted path to match image more closely */}
                <g
                    transform="translate(45, 315)"
                >
                    <path
                        d="M8,0 L0,0 L0,-8 L8,-8"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1"
                    />
                    <path
                        d="M8,0 L0,0 L0,8 L8,8"
                        fill="none"
                        stroke="#000"
                        strokeWidth="1"
                    />
                </g>

                {/* Top center corner bracket - adjusted position */}
                <rect x="130" y="295" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />

                {/* Top-left bracket ┌ */}
                <g transform="translate(497, 200)">
                    <path d="M-15,-8 H-8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Top-right bracket ┐ */}
                <g transform="translate(381, 200)">
                    <path d="M14,-8 H8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-left bracket └ */}
                <g transform="translate(497, 117)">
                    <path d="M-15,8 H-8 V15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-right bracket ┘ */}
                <g transform="translate(381, 117)">
                    <path d="M14,8 H8 V15" fill="none" stroke="#000" strokeWidth="2"/>
                </g>

                {/* Top center text - adjusted position and font family */}
                <text
                    x="420" y="170"
                    fontFamily=""
                    fontSize="8"
                    fill="#000"
                    className='font-mono'
                >
                    M 24x1.5
                </text>

                {/* Top center arrow - adjusted position */}
                <g transform="translate(436, 143)">
                    <path d="M0,0 L-16,-6 L-16,6 Z" className='fill-zinc-800' />
                    <path d="M0,0 L16,-6 L16,6 Z" className='fill-zinc-800'/>
                </g>

                {/* Top center body text - adjusted position and font family */}
                <g transform="translate(728, 178)">
                    <rect x="-10" y="-20" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="-19" width="4" height="14" className='fill-zinc-800' />

                    <rect x="-5" y="-6" width="9" height="7" className='fill-zinc-800' />

                    <rect x="-10" y="0.5" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="0.5" width="4" height="14" className='fill-zinc-800' />
                </g>

                <g
                    transform="translate(745, 175)"
                >
                    <text
                        x="0" y="-2"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        ROOT //
                    </text>
                    <text
                        x="0" y="12"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        LOCATE OPEN
                    </text>
                </g>

                {/* Bottom center corner bracket - adjusted position */}
                <rect x="990" y="412" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />

                {/* Top-left bracket ┌ */}
                <g transform="translate(1050, 460)">
                    <path d="M-15,-8 H-8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Top-right bracket ┐ */}
                <g transform="translate(935, 460)">
                    <path d="M14,-8 H8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-left bracket └ */}
                <g transform="translate(1050, 375)">
                    <path d="M-15,8 H-8 V15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-right bracket ┘ */}
                <g transform="translate(935, 375)">
                    <path d="M14,8 H8 V15" fill="none" stroke="#000" strokeWidth="2"/>
                </g>

                {/* Top center text - adjusted position and font family */}
                <text
                    x="978" y="431"
                    fontFamily=""
                    fontSize="8"
                    fill="#000"
                    className='font-mono'
                >
                    M 24x1.5
                </text>

                {/* Top center arrow - adjusted position */}
                <g transform="translate(995, 402)">
                    <path d="M0,0 L-16,-6 L-16,6 Z" className='fill-zinc-800' />
                    <path d="M0,0 L16,-6 L16,6 Z" className='fill-zinc-800'/>
                </g>

                {/* Bottom center body text - adjusted position and font family */}
                <g transform="translate(848, 508)">
                    <rect x="-10" y="-20" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="-19" width="4" height="14" className='fill-zinc-800' />

                    <rect x="-5" y="-6" width="9" height="7" className='fill-zinc-800' />

                    <rect x="-10" y="0.5" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="0.5" width="4" height="14" className='fill-zinc-800' />
                </g>

                <g
                    transform="translate(867, 505)"
                >
                    <text
                        x="0" y="-2"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        ROOT //
                    </text>
                    <text
                        x="0" y="12"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        LOCATE OPEN
                    </text>
                </g>

                {/* Left center body text - adjusted position and font family */}
                <g transform="translate(435, 414)">
                    <rect x="-10" y="-20" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="-19" width="4" height="14" className='fill-zinc-800' />

                    <rect x="-5" y="-6" width="9" height="7" className='fill-zinc-800' />

                    <rect x="-10" y="0.5" width="4" height="14" className='fill-zinc-800' />
                    <rect x="5" y="0.5" width="4" height="14" className='fill-zinc-800' />
                </g>

                <g
                    transform="translate(452, 408)"
                >
                    <text
                        x="0" y="-2"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        ROOT //
                    </text>
                    <text
                        x="0" y="12"
                        fontFamily="font-mono"
                        fontSize="10"
                        fill="#000"
                    >
                        LOCATE OPEN
                    </text>
                </g>

                {/* Right side corner bracket - adjusted path and position */}
                <rect x="1200" y="295" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />

                {/* Top-left bracket ┌ */}
                <g transform="translate(1243, 340)">
                    <path d="M-15,-8 H-8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Top-right bracket ┐ */}
                <g transform="translate(1167, 340)">
                    <path d="M14,-8 H8 V-15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-left bracket └ */}
                <g transform="translate(1243, 260)">
                    <path d="M-15,8 H-8 V15" fill="none" stroke="#000" strokeWidth="2" />
                </g>

                {/* Bottom-right bracket ┘ */}
                <g transform="translate(1167, 260)">
                    <path d="M14,8 H8 V15" fill="none" stroke="#000" strokeWidth="2"/>
                </g>

                {/* Right side text - adjusted position and font family */}
               <text
                    x="1277" y="283"
                    fontFamily="font-mono"
                    fontSize="9"
                    fill="#000"
                >
                    V 2.5
                </text>
                <text
                    x="1277" y="295"
                    fontFamily="font-mono"
                    fontSize="9"
                    fill="#000"
                >
                    7 - A5
                </text>

                {/* Measurement annotations - Adjusted to match the image's style and placement */}
                {/* These annotations now include small outlined squares and lines to connect to text,
            mimicking the image's measurement indicators. */}

                {/* Top left measurement */}
                <rect x="285" y="155" width="5" height="5" stroke="#000" strokeWidth="1" className='fill-zinc-800'/>
                <rect x="250" y="230" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" className='fill-zinc-800'/>
                <text x="295" y="160" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

                {/* Top right measurement */}
                <rect x="1125" y="230" width="10" height="10" className='fill-zinc-800' stroke="#000" strokeWidth="1" />
                <rect x="1125" y="295" width="10" height="10" className='fill-none' stroke="#000" strokeWidth="0.5" />
                <rect x="1125" y="355" width="10" height="10" className='fill-zinc-800' stroke="#000" strokeWidth="1" />

                <rect x="940" y="220" width="5" height="5" className='fill-zinc-800' stroke="#000" strokeWidth="1" />
                <text x="948" y="225" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

                {/* Middle left measurement */}
                <rect x="248" y="295" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />
                {/* <line x1="155" y1="290" x2="155" y2="310" stroke="#000" strokeWidth="1" strokeDasharray="2,2" /> */}
                {/* <text x="165" y="315" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text> */}

                {/* Middle right measurement */}
                <rect x="1360" y="295" width="10" height="10" fill="none" stroke="#000" strokeWidth="0.5" />
                <line x1="1220" y1="300" x2="1345" y2="300" strokeWidth="1.5" strokeDasharray="0" className='stroke-zinc-500'/>
                {/* <text x="1265" y="315" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text> */}

                {/* Bottom left measurement */}
                <rect x="250" y="358" width="10" height="10" fill="none" stroke="#000" strokeWidth="1" className='fill-zinc-800'/>
                {/* <line x1="255" y1="460" x2="255" y2="480" stroke="#000" strokeWidth="1" strokeDasharray="2,2" /> */}
                <text x="365" y="409" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

                {/* Bottom right measurement */}
                <rect x="856" y="380" width="5" height="5" className='fill-zinc-800' stroke="#000" strokeWidth="0.5" />
                <text x="865" y="385" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

                {/* Central horizontal measurement */}
                <rect x="605" y="215" width="5" height="5" className='fill-zinc-800' stroke="#000" strokeWidth="1" />
                <text x="615" y="220" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

                {/* Central vertical measurement */}
                <rect x="781" y="230" width="5" height="5" className='fill-zinc-800' />
                <text x="790" y="235" fontFamily="font-mono" fontSize="11" fill="#000">7 - A5</text>

            </svg>
        </div>
    );
};

export default TechnicalDrawing;
