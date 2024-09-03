import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, EyeOff, LucideIcon } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@stackframe/stack-ui";
import { cn } from "../..";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  columnTitle: React.ReactNode;
}

function Item(props: { icon: LucideIcon; onClick: () => void; children: React.ReactNode }) {
  return (
    <DropdownMenuItem onClick={props.onClick}>
      <div className="flex items-center">
        <props.icon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
        {props.children}
      </div>
    </DropdownMenuItem>
  );
}

export function DataTableColumnHeader<TData, TValue>({ column, columnTitle, className }: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
            <span>{columnTitle}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <Item icon={ArrowUp} onClick={() => column.toggleSorting(false)}>
                Asc
              </Item>
              <Item icon={ArrowDown} onClick={() => column.toggleSorting(true)}>
                Desc
              </Item>
            </>
          )}
          <Item icon={EyeOff} onClick={() => column.toggleVisibility(false)}>
            Hide
          </Item>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
