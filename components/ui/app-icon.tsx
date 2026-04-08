import { classNames } from "@/lib/utils";

export type AppIconName =
  | "spark"
  | "calendar"
  | "users"
  | "layers"
  | "clock"
  | "shield"
  | "check"
  | "message"
  | "phone"
  | "chart"
  | "home"
  | "block"
  | "bookmark"
  | "scissors"
  | "leaf"
  | "compass"
  | "arrow";

type AppIconProps = {
  name: AppIconName;
  className?: string;
  strokeWidth?: number;
};

function IconPath({ name }: { name: AppIconName }) {
  switch (name) {
    case "calendar":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
          <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
        </>
      );
    case "users":
      return (
        <>
          <path d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M15.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M3.5 19c1.2-2.5 3.3-3.8 5.9-3.8 2.6 0 4.7 1.3 5.8 3.8" />
          <path d="M13.7 15.8c1.7.2 3.1 1.1 4.1 2.7" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="m12 3.5 8 4.5-8 4.5L4 8l8-4.5Z" />
          <path d="m4 12 8 4.5 8-4.5" />
          <path d="m4 16 8 4.5 8-4.5" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v5l3.5 2" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 3.5 5.5 6v5.7c0 3.8 2.6 7.2 6.5 8.8 3.9-1.6 6.5-5 6.5-8.8V6L12 3.5Z" />
          <path d="m9.2 12 1.8 1.8 3.8-4.2" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12.2 2.4 2.4 4.8-5.1" />
        </>
      );
    case "message":
      return (
        <>
          <path d="M5.5 6.5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4.5 3v-3H5.5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
          <path d="M8 11.5h8M8 15h5" />
        </>
      );
    case "phone":
      return (
        <>
          <path d="M7.4 4.5c-.8 0-1.5.4-1.8 1.1L4.4 8.3a2.8 2.8 0 0 0 .3 2.7c2.3 3.5 5.3 6.5 8.8 8.8.9.6 2 .7 2.9.3l2.6-1.2c.7-.3 1.1-1 1.1-1.8v-2.2c0-.9-.7-1.6-1.6-1.8l-3-.4c-.7-.1-1.4.1-1.8.7l-1.1 1.2a14.6 14.6 0 0 1-4.2-4.2l1.2-1.1c.5-.5.8-1.2.7-1.9l-.4-2.9c-.1-.9-.9-1.6-1.8-1.6H7.4Z" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M4 19.5h16" />
          <path d="M7 16V9.5" />
          <path d="M12 16V6.5" />
          <path d="M17 16v-4" />
          <path d="m5 11.5 4-4 3 2 5-4" />
        </>
      );
    case "home":
      return (
        <>
          <path d="m4 10.5 8-6 8 6" />
          <path d="M6.5 9.5v10h11V9.5" />
          <path d="M10 19.5v-5h4v5" />
        </>
      );
    case "block":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8 16 8-8" />
        </>
      );
    case "bookmark":
      return (
        <>
          <path d="M7 4.5h10a2 2 0 0 1 2 2v13l-7-4-7 4v-13a2 2 0 0 1 2-2Z" />
        </>
      );
    case "scissors":
      return (
        <>
          <circle cx="7.5" cy="7.5" r="2.5" />
          <circle cx="7.5" cy="16.5" r="2.5" />
          <path d="M20 5.5 10 12l10 6.5" />
          <path d="m10 12-2.3-1.7" />
        </>
      );
    case "leaf":
      return (
        <>
          <path d="M18.5 5.5C10 5.5 5.5 10 5.5 18.5c8.5 0 13-4.5 13-13Z" />
          <path d="M8 16c1.8-2.8 4.2-5.2 7-7" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m14.8 9.2-2.2 5.6-5.4 2.2 2.2-5.6 5.4-2.2Z" />
        </>
      );
    case "arrow":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 7 6 5-6 5" />
        </>
      );
    case "spark":
    default:
      return (
        <>
          <path d="m12 3.5 1.8 4.7L18.5 10l-4.7 1.8L12 16.5l-1.8-4.7L5.5 10l4.7-1.8L12 3.5Z" />
          <path d="m18.5 4 .7 1.8L21 6.5l-1.8.7-.7 1.8-.7-1.8L16 6.5l1.8-.7.7-1.8Z" />
          <path d="m5.5 15 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
        </>
      );
  }
}

export function AppIcon({ name, className, strokeWidth = 1.8 }: AppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classNames("h-5 w-5", className)}
      aria-hidden="true"
    >
      <IconPath name={name} />
    </svg>
  );
}
