"use client";

import { Search, IndianRupee, Coffee, Home, Star } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import hotelDelhi from "@/assets/hotel-delhi.jpg";
import hotelJaipur from "@/assets/hotel-jaipur.jpg";
import hotelBangalore from "@/assets/hotel-bangalore.jpg";

const destinations = [
    { name: "New Delhi", image: hotelDelhi },
    { name: "Jaipur", image: hotelJaipur },
    { name: "Bengaluru", image: hotelBangalore },
    { name: "Mumbai", image: hotelDelhi },
];

const quickSearches = [
    { icon: IndianRupee, label: "Hotels under", subLabel: "₹ 4,000" },
    { icon: Coffee, label: "Free breakfast", subLabel: "" },
    { icon: Home, label: "Villa stays", subLabel: "" },
    { icon: Star, label: "Best rated", subLabel: "" },
];

const HotelFinder = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="px-5 pt-8 pb-4">
                <h1 className="text-3xl font-bold text-foreground text-center">
                    Your AI Hotel Finder 🏨
                </h1>
            </header>

            {/* Main Content */}
            <main className="px-5 pb-8">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Search size={20} />
                    </div>
                    <Input
                        variant="search"
                        inputSize="lg"
                        placeholder="Search hotels or destinations..."
                        className="pl-12"
                    />
                </div>

                {/* Top Destinations */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-1">Top Destinations</h2>
                    <p className="text-muted-foreground text-sm mb-4">Most popular locations to explore</p>

                    <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
                        <div className="flex gap-4 pb-2">
                            {destinations.map((dest) => (
                                <Link key={dest.name} href={`/hotel-results?city=${dest.name}`}>
                                    <Card variant="default" className="w-44 overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-elevated transition-shadow animate-fade-in">
                                        <div className="w-full h-32 overflow-hidden">
                                            <img
                                                src={dest.image.src}
                                                alt={dest.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-foreground">{dest.name}</h3>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Searches */}
                <section>
                    <h2 className="text-xl font-bold text-foreground mb-4">Quick Searches</h2>

                    <div className="grid grid-cols-2 gap-3">
                        {quickSearches.map((item) => (
                            <Card
                                key={item.label}
                                variant="flat"
                                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-secondary transition-colors animate-fade-in"
                            >
                                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                                    <item.icon size={20} className="text-icon-grey" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground text-sm">{item.label}</p>
                                    {item.subLabel && (
                                        <p className="text-foreground font-semibold">{item.subLabel}</p>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-primary font-medium hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default HotelFinder;
