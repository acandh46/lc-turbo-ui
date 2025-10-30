import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AgentItem } from "@/types/agent.types";
import { BadgeCheckIcon, GlobeIcon, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface AgentItemCardProps {
   agent: AgentItem;
   onEdit?: (agent: AgentItem) => void;
   onView?: (agent: AgentItem) => void;
}

export function AgentItemCard({ agent, onEdit, onView }: AgentItemCardProps) {
   const router = useRouter();
   return (
      <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-md  hover:bg-blue-200  transition-shadow duration-200 cursor-pointer">
         <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <Avatar className="h-12 w-12 rounded-full">
               <AvatarImage src={agent.avatar} alt={agent.agentName} />
               <AvatarFallback>{agent.agentName.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
               <CardTitle>{agent.agentName}</CardTitle>
               <CardDescription>
                  <div className="flex flex-row gap-2 items-center mt-2.5">
                     <Badge>
                        <GlobeIcon className="h-2 w-2" />
                        {agent.tenant.toUpperCase()}
                     </Badge>
                     <Badge
                        variant="secondary"
                        className={cn(
                           "text-white ",
                           agent.actived ? "bg-blue-500" : "bg-red-500"
                        )}
                     >
                        {agent.actived ? (
                           <BadgeCheckIcon className="h-2 w-2" />
                        ) : null}
                        {agent.actived ? "Actived" : "Disabled"}
                     </Badge>
                  </div>
               </CardDescription>
            </div>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                     <MoreVertical className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuItem
                     className="cursor-pointer"
                     onClick={() =>
                        router.push(`/settings/agent/configuration/${agent.id}`)
                     }
                  >
                     <span>Customize Widget</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                     <span>Install Code</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </CardHeader>
      </Card>
   );
}
