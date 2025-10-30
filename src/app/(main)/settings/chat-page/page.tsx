import HeaderContent from "@/components/layout/HeaderContent";

const CHAT_PAGE_DESCRIPTION =
   "Configure the appearance and behavior of your chat page.";

const ChatPageSettings = () => {
   return (
      <div className="flex flex-1 flex-col bg-slate-50 rounded-2xl overflow-hidden">
         <HeaderContent title="Chat Page" />
         <div className="flex flex-col overflow-auto p-3">
            <h2 className="text-lg font-bold">Chat Page Settings</h2>
            {/* Display instructions multiple times efficiently for demonstration */}
            {Array.from({ length: 60 }).map((_, idx) => (
               <p className="text-slate-500" key={idx}>
                  {CHAT_PAGE_DESCRIPTION}
               </p>
            ))}
            {/* Add form elements and other settings components here */}
         </div>
      </div>
   );
};

export default ChatPageSettings;
