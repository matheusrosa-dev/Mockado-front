import { AsideNavbar } from "@/components";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen">
      <AsideNavbar />

      <main className="flex-1 ">
        <header className="bg-[#010409] p-4 text-2xl font-medium border-l border-[#0d1117]">
          GET - Buscar itens
        </header>

        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
