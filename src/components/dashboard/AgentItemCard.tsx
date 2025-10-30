"use client";

import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Agent } from "@/types/agent.type"; // Menggunakan tipe dari file yang Anda sebutkan
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface AgentItemCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
}

export function AgentItemCard({ agent, onEdit, onDelete }: AgentItemCardProps) {
  const handleEdit = () => {
    onEdit(agent);
  };

  const handleDelete = () => {
    onDelete(agent);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={agent.avatarUrl} alt={agent.name} />
          <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{agent.name}</CardTitle>
          <CardDescription>{agent.role}</CardDescription>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="text-red-500 focus:text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {agent.description}
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          Created on: {new Date(agent.createdAt).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
