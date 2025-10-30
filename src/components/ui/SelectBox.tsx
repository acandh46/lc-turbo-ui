import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Option {
   value: string;
   label: string;
}

interface SelectBoxProps {
   options: Option[];
   value?: string[] | string;
   onChange?: (values: string[] | string) => void;
   placeholder?: string;
   inputPlaceholder?: string;
   emptyPlaceholder?: string;
   className?: string;
   multiple?: boolean;
   disabled?: boolean; // Tambahan: support disabled
}

const SelectBox = React.forwardRef<HTMLInputElement, SelectBoxProps>(
   (
      {
         inputPlaceholder,
         emptyPlaceholder,
         placeholder,
         className,
         options,
         value,
         onChange,
         multiple,
         disabled = false, // default false
      },
      ref
   ) => {
      const [searchTerm, setSearchTerm] = React.useState<string>("");
      const [isOpen, setIsOpen] = React.useState(false);

      const handleSelect = (selectedValue: string) => {
         if (disabled) return;
         if (multiple) {
            const newValue =
               Array.isArray(value) && value.includes(selectedValue)
                  ? value.filter((v) => v !== selectedValue)
                  : [...(Array.isArray(value) ? value : []), selectedValue];
            onChange?.(newValue);
         } else {
            onChange?.(selectedValue);
            setIsOpen(false);
         }
      };

      const handleClear = () => {
         if (disabled) return;
         onChange?.(multiple ? [] : "");
      };

      return (
         <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
               <div
                  className={cn(
                     "flex min-h-[36px] cursor-pointer items-center justify-between rounded-md border px-3 py-1 data-[state=open]:border-ring",
                     disabled &&
                        "opacity-50 cursor-not-allowed bg-muted pointer-events-none",
                     className
                  )}
                  tabIndex={disabled ? -1 : 0}
                  aria-disabled={disabled}
                  onClick={disabled ? (e) => e.preventDefault() : undefined}
               >
                  <div
                     className={cn(
                        "items-center gap-1 overflow-hidden text-sm",
                        multiple
                           ? "flex flex-grow flex-wrap "
                           : "inline-flex whitespace-nowrap"
                     )}
                  >
                     {value && value.length > 0 ? (
                        multiple ? (
                           options
                              .filter(
                                 (option) =>
                                    Array.isArray(value) &&
                                    value.includes(option.value)
                              )
                              .map((option) => (
                                 <span
                                    key={option.value}
                                    className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                 >
                                    <span>{option.label}</span>
                                    <span
                                       onClick={(e) => {
                                          e.preventDefault();
                                          if (!disabled)
                                             handleSelect(option.value);
                                       }}
                                       className={cn(
                                          "flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground",
                                          disabled &&
                                             "pointer-events-none opacity-50"
                                       )}
                                    >
                                       <Cross2Icon />
                                    </span>
                                 </span>
                              ))
                        ) : (
                           options.find((opt) => opt.value === value)?.label
                        )
                     ) : (
                        <span className="mr-auto text-muted-foreground">
                           {placeholder}
                        </span>
                     )}
                  </div>
                  <div
                     className={cn(
                        "flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch",
                        disabled && "pointer-events-none opacity-50"
                     )}
                  >
                     {value && value.length > 0 ? (
                        <div
                           onClick={(e) => {
                              e.preventDefault();
                              if (!disabled) handleClear();
                           }}
                        >
                           <Cross2Icon className="size-4" />
                        </div>
                     ) : (
                        <div>
                           <CaretSortIcon className="size-4" />
                        </div>
                     )}
                  </div>
               </div>
            </PopoverTrigger>
            <PopoverContent
               className="w-[var(--radix-popover-trigger-width)] p-0"
               align="start"
               // Kalau disabled, jangan render popover
               hidden={disabled}
            >
               <Command>
                  <div className="relative">
                     <CommandInput
                        value={searchTerm}
                        onValueChange={(e) => setSearchTerm(e)}
                        ref={ref}
                        placeholder={inputPlaceholder ?? "Search..."}
                        className="h-9"
                        disabled={disabled}
                     />
                     {searchTerm && (
                        <div
                           className={cn(
                              "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground",
                              disabled && "pointer-events-none opacity-50"
                           )}
                           onClick={() => !disabled && setSearchTerm("")}
                        >
                           <Cross2Icon className="size-4" />
                        </div>
                     )}
                  </div>
                  <CommandEmpty>
                     {emptyPlaceholder ?? "No results found."}
                  </CommandEmpty>
                  <CommandGroup>
                     <ScrollArea>
                        <div className="max-h-64">
                           {options.map((option) => {
                              const isSelected =
                                 Array.isArray(value) &&
                                 value.includes(option.value);
                              return (
                                 <CommandItem
                                    key={option.value}
                                    // value={option.value}
                                    onSelect={() =>
                                       !disabled && handleSelect(option.value)
                                    }
                                    disabled={disabled}
                                    className={
                                       disabled
                                          ? "pointer-events-none opacity-50"
                                          : ""
                                    }
                                 >
                                    {multiple && (
                                       <div
                                          className={cn(
                                             "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                             isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                          )}
                                       >
                                          <CheckIcon />
                                       </div>
                                    )}
                                    <span>{option.label}</span>
                                    {!multiple && option.value === value && (
                                       <CheckIcon
                                          className={cn(
                                             "ml-auto",
                                             option.value === value
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                    )}
                                 </CommandItem>
                              );
                           })}
                        </div>
                     </ScrollArea>
                  </CommandGroup>
               </Command>
            </PopoverContent>
         </Popover>
      );
   }
);

SelectBox.displayName = "SelectBox";

export default SelectBox;
