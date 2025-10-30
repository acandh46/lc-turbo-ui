interface ContentPageProps {
   showSubMenu?: boolean;
   title: string;
   children: React.ReactNode;
}

export default function ContentPage({
   children,
   title = "Settings",
   showSubMenu = false,
}: ContentPageProps) {
   return (
      <div className="flex flex-col flex-1 bg-slate-50 rounded-2xl overflow-hidden">
         {children}
      </div>
      // <div className="flex flex-col flex-1 bg-slate-50 rounded-2xl overflow-hidden mt-12">
      //    <div className="p-2 gap-2 flex items-center shadow-xs">
      //       {showSubMenu && (
      //          <Button variant="ghost" size="icon">
      //             <PanelLeftClose className="h-5 w-5" />
      //          </Button>
      //       )}
      //       <h2 className="text-lg font-semibold text-black">{title}</h2>
      //    </div>
      //    <div className=" w-full p-4 overflow-auto">{children}</div>
      // </div>
   );
}
