import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="shell py-6 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <AdminSidebar />
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
