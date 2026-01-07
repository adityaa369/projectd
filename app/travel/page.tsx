"use client";

import { MapPin, Navigation, Calendar, Users, Star } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import busImg from "@/assets/bus.png";
import Image from "next/image";

const travelOptions = [
    {
        id: 1,
        name: "VRL Travels",
        type: "AC Sleeper",
        price: 899,
        oldPrice: 1199,
        departure: "9:00 PM",
        arrival: "6:00 AM",
        duration: "9h",
        rating: 4.5,
        seats: 23,
        platform: "RedBus",
        image: busImg,
    },
    {
        id: 2,
        name: "SRS Travels",
        type: "AC Seater",
        price: 699,
        oldPrice: 899,
        departure: "10:30 PM",
        arrival: "7:30 AM",
        duration: "9h",
        rating: 4.2,
        seats: 15,
        platform: "MakeMyTrip",
        image: busImg,
    },
    {
        id: 3,
        name: "Orange Tours",
        type: "Volvo Multi-Axle",
        price: 1099,
        oldPrice: 1399,
        departure: "8:00 PM",
        arrival: "5:00 AM",
        duration: "9h",
        rating: 4.7,
        seats: 8,
        platform: "AbhiBus",
        image: busImg,
    },
    {
        id: 4,
        name: "KPN Travels",
        type: "Non-AC Sleeper",
        price: 549,
        oldPrice: 749,
        departure: "11:00 PM",
        arrival: "8:00 AM",
        duration: "9h",
        rating: 3.9,
        seats: 32,
        platform: "RedBus",
        image: busImg,
    },
    {
        id: 5,
        name: "KSRTC Airavat",
        type: "AC Sleeper",
        price: 799,
        oldPrice: 999,
        departure: "9:30 PM",
        arrival: "6:30 AM",
        duration: "9h",
        rating: 4.4,
        seats: 18,
        platform: "KSRTC",
        image: busImg,
    },
];

const Travel = () => {
    const [from, setFrom] = useState("Bangalore");
    const [to, setTo] = useState("Chennai");
    const [date, setDate] = useState("2025-12-10");
    const [selectedTravel, setSelectedTravel] = useState(travelOptions[0]);

    const fromCoords = { lat: 12.9716, lng: 77.5946, label: from };
    const toCoords = { lat: 13.0827, lng: 80.2707, label: to };

    return (
        <div className="min-h-screen bg-background pb-32">
            <div className="px-5 py-6 max-w-5xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-6 tracking-tight">Bus Travel</h1>

                {/* Map Section */}
                <div className="rounded-2xl overflow-hidden border border-border/60 mb-6 h-48 md:h-64 shadow-sm">
                    <MapBox pickup={fromCoords} destination={toCoords} />
                </div>

                {/* Search Form */}
                <Card className="p-4 mb-8 bg-card border-border/60 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Navigation size={14} className="text-primary" />
                            </div>
                            <Input
                                placeholder="From city"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="pl-12 h-12 bg-background"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <MapPin size={14} className="text-primary" />
                            </div>
                            <Input
                                placeholder="To city"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="pl-12 h-12 bg-background"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Calendar size={14} className="text-primary" />
                            </div>
                            <Input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="pl-12 h-12 bg-background"
                            />
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column: List */}
                    <div className="flex-1 space-y-4">
                        <h2 className="text-lg font-semibold px-1">Available Buses</h2>
                        {travelOptions.map((travel) => (
                            <div
                                key={travel.id}
                                onClick={() => setSelectedTravel(travel)}
                                className={`group p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col sm:flex-row gap-4 ${selectedTravel.id === travel.id
                                        ? "bg-secondary border-primary/30 shadow-md ring-1 ring-primary/20"
                                        : "bg-card border-border/40 hover:bg-secondary/50 hover:border-border/80"
                                    }`}
                            >
                                <div className="w-full sm:w-24 h-24 bg-white rounded-lg p-2 flex items-center justify-center border border-border/10">
                                    <img src={travel.image.src} alt={travel.name} className="w-full h-full object-contain" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-foreground truncate">{travel.name}</h3>
                                            <p className="text-xs text-muted-foreground">{travel.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold">₹{travel.price}</span>
                                            <span className="text-xs text-muted-foreground line-through">₹{travel.oldPrice}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mt-3 text-sm">
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">{travel.departure}</span>
                                            <span className="text-muted-foreground text-xs">→</span>
                                            <span className="font-medium">{travel.arrival}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">• {travel.duration}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="bg-background font-normal text-xs gap-1">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {travel.rating}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{travel.seats} seats left</span>
                                        </div>
                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{travel.platform}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Selected Details & AI Insights (Sticky on Desktop) */}
                    <div className="md:w-80 space-y-4">
                        <div className="sticky top-6 space-y-4">
                            {/* AI Insights */}
                            <Card className="p-5 border-border/60 shadow-sm bg-gradient-to-br from-card to-secondary/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">✨</span>
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">AI Insights</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                        <p className="text-sm text-muted-foreground leading-snug">Best price-to-comfort ratio available right now.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                        <p className="text-sm text-muted-foreground leading-snug">Rated 4.0+ by over 500 travelers.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        <p className="text-sm text-muted-foreground leading-snug">Use <strong>PAYTM50</strong> for ₹50 cashback.</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Booking Action */}
                            <Card className="p-5 bg-card border-border/60 shadow-md">
                                <div className="mb-4">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Selected</p>
                                    <h3 className="font-bold text-lg mt-1">{selectedTravel.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedTravel.departure} - {selectedTravel.arrival}</p>
                                </div>
                                <div className="flex items-end justify-between mb-6">
                                    <div>
                                        <span className="text-3xl font-bold">₹{selectedTravel.price}</span>
                                    </div>
                                </div>
                                <Button className="w-full h-12 text-sm font-bold uppercase tracking-wider">
                                    Book on {selectedTravel.platform}
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Mobile Floating Action (Visible only on small screens) */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/40 p-4 pb-6 z-20">
                    <Button className="w-full h-12 text-sm font-bold uppercase tracking-wider">
                        Book for ₹{selectedTravel.price}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Travel;
