import React from 'react'

function IconBase({ children, className = 'h-4 w-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M10 20v-6h4v6" />
    </IconBase>
  )
}

export function UserIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </IconBase>
  )
}

export function FileTextIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </IconBase>
  )
}

export function FolderIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5Z" />
    </IconBase>
  )
}

export function MailIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </IconBase>
  )
}

export function SunIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.5 1.5M17.8 17.8l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.5-1.5M17.8 6.2l1.5-1.5" />
    </IconBase>
  )
}

export function MoonIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M19 14.8A7 7 0 1 1 9.2 5a8 8 0 1 0 9.8 9.8Z" />
    </IconBase>
  )
}

export function ArrowRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  )
}

export function ArrowUpRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </IconBase>
  )
}

export function DownloadIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 4v10" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </IconBase>
  )
}

export function CheckCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3 4.7-4.8" />
    </IconBase>
  )
}

export function AlertTriangleIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m12 4 8 14H4Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </IconBase>
  )
}

export function RefreshCcwIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </IconBase>
  )
}

export function LoaderIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M21 12a9 9 0 1 1-9-9" />
    </IconBase>
  )
}

export function MapPinIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </IconBase>
  )
}

export function GraduationCapIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m2.5 9.5 9.5-5 9.5 5-9.5 5Z" />
      <path d="M6 11.4v3.4c0 1.6 2.7 2.9 6 2.9s6-1.3 6-2.9v-3.4" />
    </IconBase>
  )
}

export function BriefcaseIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12h18" />
    </IconBase>
  )
}

export function CodeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m14 4-4 16" />
    </IconBase>
  )
}

export function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5.5 5.5v5.7c0 4.1 2.8 7.8 6.5 9.3 3.7-1.5 6.5-5.2 6.5-9.3V5.5Z" />
      <path d="m9.5 12 1.8 1.8 3.4-3.6" />
    </IconBase>
  )
}

export function CpuIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 1.5v3M15 1.5v3M9 19.5v3M15 19.5v3M1.5 9h3M1.5 15h3M19.5 9h3M19.5 15h3" />
    </IconBase>
  )
}

export function TerminalIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m7 10 3 2-3 2" />
      <path d="M12.5 15H17" />
    </IconBase>
  )
}

export function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className || 'h-4 w-4 fill-current'}>
      <path fill="currentColor" d="M12 2C6.477 2 2 6.589 2 12.25c0 4.528 2.865 8.37 6.839 9.727.5.096.682-.221.682-.492 0-.243-.009-.888-.014-1.742-2.782.617-3.369-1.371-3.369-1.371-.455-1.183-1.11-1.498-1.11-1.498-.908-.636.069-.623.069-.623 1.003.072 1.531 1.055 1.531 1.055.892 1.566 2.341 1.114 2.91.852.09-.664.349-1.114.635-1.37-2.221-.26-4.555-1.14-4.555-5.074 0-1.121.389-2.038 1.029-2.757-.103-.262-.446-1.315.098-2.741 0 0 .84-.277 2.75 1.053A9.303 9.303 0 0 1 12 6.832c.85.004 1.705.118 2.504.347 1.909-1.33 2.748-1.053 2.748-1.053.546 1.426.203 2.479.1 2.741.64.719 1.028 1.636 1.028 2.757 0 3.944-2.338 4.811-4.566 5.066.359.319.679.948.679 1.911 0 1.38-.012 2.494-.012 2.833 0 .273.18.593.688.491C19.138 20.616 22 16.776 22 12.25 22 6.589 17.523 2 12 2Z" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className || 'h-4 w-4 fill-current'}>
      <path fill="currentColor" d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.56 9.69h2.76V18.5H5.56V9.69Zm4.49 0h2.64v1.2h.04c.37-.7 1.27-1.44 2.61-1.44 2.79 0 3.31 1.88 3.31 4.33v4.72h-2.75v-4.18c0-1-.02-2.29-1.37-2.29-1.37 0-1.58 1.1-1.58 2.22v4.25h-2.9V9.69Z" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className || 'h-4 w-4 fill-current'}>
      <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className || 'h-4 w-4 fill-current'}>
      <path fill="currentColor" d="M13.5 22v-8.2h2.78l.42-3.2H13.5V8.56c0-.93.27-1.56 1.65-1.56h1.77V4.15c-.31-.04-1.36-.15-2.59-.15-2.56 0-4.31 1.54-4.31 4.36v2.24H7.1v3.2h2.92V22h3.48Z" />
    </svg>
  )
}
