type IconProps = {
  className?: string;
  isActive?: boolean;
  onClick?: ({ isActive, className }: IconProps) => void;
  stokeWidth?: number;

};

export function Home({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

export function Kaps({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function Photo({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

export function Notification({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

export function User({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function Settings({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function Cross({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function Check({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function Chervon({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export function Loop({ isActive, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive ? 'black' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function AddCommunity({ isActive, className }: IconProps) {
  return (
    <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 20.75H24V18.75C24 18.1265 23.8057 17.5186 23.4441 17.0106C23.0826 16.5027 22.5718 16.12 21.9827 15.9158C21.3937 15.7115 20.7556 15.6959 20.1573 15.871C19.5589 16.0462 19.03 16.4034 18.644 16.893M19 20.75H9M19 20.75V18.75C19 18.094 18.874 17.467 18.644 16.893M18.644 16.893C18.2726 15.965 17.6318 15.1695 16.804 14.6091C15.9762 14.0488 14.9996 13.7493 14 13.7493C13.0004 13.7493 12.0238 14.0488 11.196 14.6091C10.3682 15.1695 9.72736 15.965 9.356 16.893M9 20.75H4V18.75C4.00005 18.1265 4.19434 17.5186 4.55586 17.0106C4.91739 16.5027 5.42819 16.12 6.01725 15.9158C6.60632 15.7115 7.24438 15.6959 7.84274 15.871C8.4411 16.0462 8.97003 16.4034 9.356 16.893M9 20.75V18.75C9 18.094 9.126 17.467 9.356 16.893M17 7.75C17 8.54565 16.6839 9.30871 16.1213 9.87132C15.5587 10.4339 14.7956 10.75 14 10.75C13.2044 10.75 12.4413 10.4339 11.8787 9.87132C11.3161 9.30871 11 8.54565 11 7.75C11 6.95435 11.3161 6.19129 11.8787 5.62868C12.4413 5.06607 13.2044 4.75 14 4.75C14.7956 4.75 15.5587 5.06607 16.1213 5.62868C16.6839 6.19129 17 6.95435 17 7.75ZM23 10.75C23 11.2804 22.7893 11.7891 22.4142 12.1642C22.0391 12.5393 21.5304 12.75 21 12.75C20.4696 12.75 19.9609 12.5393 19.5858 12.1642C19.2107 11.7891 19 11.2804 19 10.75C19 10.2196 19.2107 9.71086 19.5858 9.33579C19.9609 8.96071 20.4696 8.75 21 8.75C21.5304 8.75 22.0391 8.96071 22.4142 9.33579C22.7893 9.71086 23 10.2196 23 10.75ZM9 10.75C9 11.2804 8.78929 11.7891 8.41421 12.1642C8.03914 12.5393 7.53043 12.75 7 12.75C6.46957 12.75 5.96086 12.5393 5.58579 12.1642C5.21071 11.7891 5 11.2804 5 10.75C5 10.2196 5.21071 9.71086 5.58579 9.33579C5.96086 8.96071 6.46957 8.75 7 8.75C7.53043 8.75 8.03914 8.96071 8.41421 9.33579C8.78929 9.71086 9 10.2196 9 10.75Z" />
      <path d="M4 1.25V4.25M4 4.25V7.25M4 4.25H7M4 4.25H1" />
    </svg>

  )
}
