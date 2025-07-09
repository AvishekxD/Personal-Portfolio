import React from 'react';

interface SchematicDisplayProps {
 className?: string;
}

const SchematicDisplay: React.FC<SchematicDisplayProps> = ({ className, ...props }) => {
  const now = new Date(); 

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}.${minutes}`;

  const day = String(now.getDate()).padStart(2, '0');
  const shortYear = String(now.getFullYear()).slice(-2);
  const formattedDateAndYear = `${day}-${shortYear}`; 

  const dateTimeDisplay = `${currentTime}/${formattedDateAndYear}`;
 return (
  <svg
   width="780"
   viewBox="0 0 1920 1080"
   xmlns="http://www.w3.org/2000/svg"
   className={`${className}  will-change-transform absolute -top-8 sm:-top-12 md:-top-15 p-3 right-1/5 sm:right-1/3 md:right-1/2`}
   {...props}
  >
   {/* Define the repeating brace-like shape in defs for reuse */}
   <defs>
    <g id="brace-shape">
     <path d="M 0,0 C 8,-12 8,-28 0,-40" strokeWidth="1.5" />
     <path d="M 0,0 C -8,-12 -8,-28 0,-40" strokeWidth="1.5" />
    </g>
   </defs>


   {/* Central dashed horizontal line */}
   <line x1="0" y1="540" x2="1920" y2="540" strokeDasharray="10 10" className="stroke-gray-700" strokeWidth="1.5" fill="none" />

   {/* Dashed border of the main container */}
   <rect x="250" y="440" width="1420" height="200" strokeDasharray="8, 8" className="stroke-gray-700" strokeWidth="1.5" fill="none" />

   {/* Shared classes for shapes and text */}
    <g className="stroke-gray-700 fill-none" strokeWidth="1.5"> 
    {[290, 330, 370, 410, 450, 530, 570, 610, 650, 730, 770, 810, 850, 930, 970, 1010, 1050, 1130, 1170, 1210, 1250, 1330, 1370, 1410, 1450, 1530, 1570, 1610, 1650].map((xPos, index) => (
        <line
        key={`vertical-line-${index}`}
        x1={xPos}
        y1="465"
        x2={xPos}
        y2="615"
        className="stroke-zinc-700/80"
        />
    ))}

    {/* Angled arrow shape - Adjusted to gray stroke */}
    <path d="M 650 745 l 15 15 l -15 15" className="stroke-zinc-600" />
    </g>
   
   {/* Small squares (markers) */}
   <g className="fill-zinc-800">
    <rect x="256" y="400" width="36" height="8" /> <rect x="386" y="400" width="18" height="8" />
    <rect x="244" y="436" width="12" height="12" /> <rect x="490" y="400" width="8" height="8" />
    <rect x="655" y="400" width="10" height="8" /> <rect x="980" y="434" width="12" height="12" /> <rect x="960" y="400" width="18" height="8" />
    <rect x="680" y="400" width="10" height="8" /> <rect x="830" y="400" width="36" height="8" />
    <rect x="1090" y="400" width="8" height="8" /> <rect x="1225" y="400" width="10" height="8" /> <rect x="1250" y="400" width="10" height="8" />
    <rect x="1510" y="400" width="12" height="8" /> <rect x="1664" y="434" width="12" height="12" /> <rect x="1390" y="400" width="18" height="8" />
    <rect x="244" y="634" width="12" height="12" /> <rect x="1620" y="400" width="36" height="8" />
    <rect x="981" y="635" width="12" height="12" /> <rect x="1665" y="634" width="12" height="12" /> 
    <rect x="245" y="534" width="12" height="12"/> <rect x="1666" y="534" width="12" height="12" />
   </g>

   {/* Corner elements */}
   <g className="stroke-black" strokeWidth="1.5" fill="none">
    <rect x="180" y="380" width="20" height="20" />
    <line x1="200" y1="400" x2="140" y2="339" />
    <g className="font-mono text-xs fill-black tracking-wider">
     <text x="210" y="390">TS-22</text>
     <text x="210" y="410">TS-22</text>
     <text x="170" y="420">TS-22</text>
     <text x="1690" y="390">TS-22</text>
     <text x="1690" y="410">TS-22</text>
    </g>
   </g>

   {/* Text blocks */}
   <g className="font-mono text-sm fill-zinc-800 tracking-[2px]">
        {/* Top-Left Text Block */}
        <text x="490" y="340" className="font-semibold">TTS</text>
        <text x="590" y="320">LOCAL</text>
        <text x="550" y="340">P-34.34-3</text>
        {/* Vertical separator line */}
        <line x1="695" y1="308" x2="695" y2="350" stroke="currentColor" strokeWidth="1.5" />
        <text x="710" y="320">CONTROL</text>
        <text x="790" y="320">P-34.34-3</text>
        <text x="900" y="320">FIX</text>
        <text x="750" y="340">W 41'24'12.2"</text>
        <text x="750" y="360">E 23"44'54.4"</text>
        <text x="750" y="380">PE-3 NVGT B</text>

        {/* Top-Right Text Block */}
        <text x="1140" y="340" className="font-semibold">TTS</text>
        <text x="1240" y="320">LOCAL</text>
        <text x="1200" y="340">P-34.34-3</text>
        {/* Vertical separator line */}
        <line x1="1345" y1="308" x2="1345" y2="350" stroke="currentColor" strokeWidth="1.5" />
        <text x="1360" y="320">CONTROL</text>
        <text x="1440" y="320">P-34.34-3</text>
        <text x="1550" y="320">FIX</text>
        <text x="1400" y="340">W 41'24'12.2"</text>
        <text x="1400" y="360">E 23"44'54.4"</text>
        <text x="1400" y="380">PE-3 NVGT B</text>

        {/* Bottom Text Blocks */}
        <text x="450" y="760" className="font-semibold">RESTORE POINT</text>
        <text x="450" y="780">FIELD FLOW CONTROL</text>
        <text x="450" y="800">P-34.34-3 FIX</text>

        <text x="450" y="850" className="font-semibold">RESTORE POINT</text>
        <text x="450" y="870">FIELD FLOW CONTROL</text>
        <text x="450" y="890">P-34.34-3 FIX</text>
      </g>


   {/* SN box */}
   <g>
    <rect x="650" y="680" width="300" height="50" className="fill-black" />
    <text x="670" y="715" className="font-mono font-bold text-[26px] tracking-[2px] fill-white">
     SN: {dateTimeDisplay}
    </text>
        <g className="stroke-black" strokeWidth="1.5" fill="none">
            <rect x="1010" y="700" width="30" height="30" />
            <line x1="1010" y1="700" x2="1090" y2="778" />
        </g>
   </g>
  </svg>
 );
};

export default SchematicDisplay;