"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-background relative">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
                <Sidebar className="w-64 fixed top-0 left-0 h-full z-50 border-r bg-background" />
            </div>

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                {/* Mobile Header Trigger - Only visible on mobile */}
                <div className="md:hidden absolute top-4 left-4 z-50">
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                </div>

                <SheetContent side="left" className="p-0 w-72">
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} className="border-none" />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 w-full relative">
                {children}
            </main>
        </div>
    );
}
