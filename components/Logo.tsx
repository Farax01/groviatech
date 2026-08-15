export default function Logo({ size = 40, color = "#0d3b52" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top T */}
      <line x1="50" y1="60" x2="50" y2="20" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="30" y1="20" x2="70" y2="20" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      {/* Bottom-left T */}
      <line x1="50" y1="60" x2="18" y2="88" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="7" y1="79" x2="29" y2="97" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      {/* Bottom-right T */}
      <line x1="50" y1="60" x2="82" y2="88" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <line x1="71" y1="97" x2="93" y2="79" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}
