import { AsideNavbar } from "@components";

type Props = {
  children: React.ReactNode;
};

export default function PrivateLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AsideNavbar />

      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
