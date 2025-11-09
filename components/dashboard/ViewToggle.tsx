"use client";

import { Button } from "@/components/ui/button";
import { ViewToggleProps } from "@/lib/type";
import { Table, Grid } from "lucide-react";

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "card" ? "default" : "outline"}
        size="sm"
        onClick={() => setView("card")}
        aria-label="Card view"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => setView("table")}
        aria-label="Table view"
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
}
