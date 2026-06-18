import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <div className="min-w-0 flex-1 flex flex-col">
          <AdminHeader />
          <main className="px-6 py-6 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
