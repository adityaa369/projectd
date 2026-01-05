"use client";

import { cn } from "@/lib/utils";
import {
    Archive,
    Bus,
    Car,
    Home,
    Hotel,
    LayoutDashboard,
    LogOut,
    Pizza,
    Plus,
    Settings,
    ShoppingBag,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

export function Sidebar({ className, isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();

    const routes = [
        {
            label: "Home",
            icon: Home,
            href: "/",
            active: pathname === "/",
        },
        {
            label: "History",
            icon: Archive,
            href: "/history",
            active: pathname === "/history",
        },
        {
            label: "Ecommerce",
            icon: ShoppingBag,
            href: "/electronics",
            active: pathname === "/electronics",
        },
        {
            label: "Food",
            icon: Pizza,
            href: "/food-search",
            active: pathname === "/food-search",
        },
        {
            label: "Rides",
            icon: Car,
            href: "/rides",
            active: pathname === "/rides",
        },
        {
            label: "Travel",
            icon: Bus,
            href: "/travel",
            active: pathname === "/travel",
        },
        {
            label: "Hotels",
            icon: Hotel,
            href: "/hotel-finder",
            active: pathname === "/hotel-finder",
        },
    ];

    return (
        <div
            className={cn(
                "pb-12 min-h-screen border-r bg-sidebar-background text-sidebar-foreground",
                className
            )}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mb-2 px-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-lg font-bold">⬡</span>
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            Deepenk
                        </h2>
                    </div>
                    <div className="space-y-1 mt-6">
                        <Link href="/" onClick={() => setIsOpen?.(false)}>
                            <Button variant="outline" className="w-full justify-start gap-2 border-dashed border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground mb-4">
                                <Plus className="h-4 w-4" />
                                New Chat
                            </Button>
                        </Link>

                        <div className="px-2 mb-2">
                            <p className="text-xs font-medium text-muted-foreground/70 mb-2">DASHBOARD</p>
                        </div>

                        {routes.map((route) => (
                            <Link key={route.href} href={route.href} onClick={() => setIsOpen?.(false)}>
                                <Button
                                    variant={route.active ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-2",
                                        route.active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    )}
                                >
                                    <route.icon className="h-4 w-4" />
                                    {route.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="border-t border-sidebar-border pt-4 space-y-2">

                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                    <div className="flex items-center justify-between px-2 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">User</p>
                                <p className="text-xs text-muted-foreground">Free Plan</p>
                            </div>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}
