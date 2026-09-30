"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { ProgressCard, SidebarNav } from "@/components/docs/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle>{siteConfig.shortTitle}</SheetTitle>
          <SheetDescription>Jump to any part of the tutorial.</SheetDescription>
        </SheetHeader>
        <div className="space-y-5 px-3 pb-8">
          <ProgressCard />
          <SidebarNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
