import ManagerNavBar from "@/components/Manager-Ui/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-full w-full mx-auto flex flex-col items-center max-w-7xl">
      <ManagerNavBar />
      {children}
    </div>
  );
}

