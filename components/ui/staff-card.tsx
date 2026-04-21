import { classNames, getInitials } from "@/lib/utils";

type StaffCardProps = {
  firstName: string;
  lastName: string;
  title?: string;
  signature?: string;
  specialties?: readonly string[];
  avatarUrl?: string;
  className?: string;
};

export function StaffCard({
  firstName,
  lastName,
  title,
  signature,
  specialties,
  avatarUrl,
  className,
}: StaffCardProps) {
  const fullName = `${firstName} ${lastName}`;
  const initials = getInitials(fullName);

  return (
    <article className={classNames("card p-6 sm:p-7", className)}>
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="h-16 w-16 rounded-3xl object-cover shadow-subtle"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-gradient font-display text-xl text-white shadow-subtle">
            {initials}
          </div>
        )}
        <div>
          <p className="font-display text-xl leading-tight text-espresso">{fullName}</p>
          {title ? <p className="text-xs uppercase tracking-wider text-ink-400">{title}</p> : null}
        </div>
      </div>

      {signature ? (
        <p className="mt-5 text-sm leading-7 text-ink-500">{signature}</p>
      ) : null}

      {specialties && specialties.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {specialties.map((item) => (
            <span key={item} className="admin-chip">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
