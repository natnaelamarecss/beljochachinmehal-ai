import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PRODUCT_MODELS, getProductModel, type ProductModelId } from "@/lib/ai/models";

export function ModelSelector({
  value,
  onChange,
}: {
  value: ProductModelId;
  onChange: (id: ProductModelId) => void;
}) {
  const active = getProductModel(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full">
          <span aria-hidden>{active.emoji}</span>
          <span className="font-medium">{active.name}</span>
          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Choose your AI
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            FREE
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PRODUCT_MODELS.map((m) => (
          <DropdownMenuItem
            key={m.id}
            onSelect={() => onChange(m.id)}
            className="flex items-start gap-3 py-2.5"
          >
            <span className="text-lg" aria-hidden>
              {m.emoji}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium">{m.name}</span>
              <span className="block text-xs text-muted-foreground">{m.description}</span>
            </span>
            {m.id === value && <Check className="mt-1 h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}