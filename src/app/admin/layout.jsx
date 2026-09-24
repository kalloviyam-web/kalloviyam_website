export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Portal | Kalloviyam",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return <div className="admin-portal-root">{children}</div>;
}
