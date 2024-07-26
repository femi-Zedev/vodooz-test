

import { IconProps } from "@/utils/types";

export function SearchIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 18L12.6667 12.6667M14.4444 8.22222C14.4444 9.03934 14.2835 9.84845 13.9708 10.6034C13.6581 11.3583 13.1998 12.0442 12.622 12.622C12.0442 13.1998 11.3583 13.6581 10.6034 13.9708C9.84845 14.2835 9.03934 14.4444 8.22222 14.4444C7.40511 14.4444 6.596 14.2835 5.84108 13.9708C5.08617 13.6581 4.40023 13.1998 3.82245 12.622C3.24466 12.0442 2.78633 11.3583 2.47364 10.6034C2.16094 9.84845 2 9.03934 2 8.22222C2 6.57199 2.65555 4.98934 3.82245 3.82245C4.98934 2.65555 6.57199 2 8.22222 2C9.87246 2 11.4551 2.65555 12.622 3.82245C13.7889 4.98934 14.4444 6.57199 14.4444 8.22222Z" stroke={props.stroke} strokeOpacity="0.48" strokeWidth="2.20088" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  );
}