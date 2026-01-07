"use client";

import { MapPin, Navigation, Clock, } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import taxiImg from "@/assets/taxi.png";

const rideOptions = [
    {
        id: 1,
        name: "Uber Cab",
        type: "Economy",
        category: "Cab",
        price: 209,
        time: "4 min away",
        eta: "25 min",
        platform: "Uber",
        image: taxiImg,
    },
    {
        id: 2,
        name: "Ola Cab",
        type: "Economy",
        category: "Cab",
        price: 189,
        time: "3 min away",
        eta: "28 min",
        platform: "Ola",
        image: taxiImg,
    },
    {
        id: 3,
        name: "Uber Premier",
        type: "Premium",
        category: "Cab",
        price: 349,
        time: "6 min away",
        eta: "22 min",
        platform: "Uber",
        image: taxiImg,
    },
    {
        id: 4,
        name: "Ola Prime",
        type: "Premium",
        category: "Cab",
        price: 329,
        time: "5 min away",
        eta: "24 min",
        platform: "Ola",
        image: taxiImg,
    },
    {
        id: 5,
        name: "Uber Bike",
        type: "Bike",
        category: "Bike",
        price: 45,
        time: "2 min away",
        eta: "20 min",
        platform: "Uber",
        image: taxiImg,
    },
    {
        id: 6,
        name: "Ola Bike",
        type: "Bike",
        category: "Bike",
        price: 42,
        time: "4 min away",
        eta: "21 min",
        platform: "Ola",
        image: taxiImg,
    },
    {
        id: 7,
        name: "Uber Auto",
        type: "Auto",
        category: "Auto",
        price: 85,
        time: "3 min away",
        eta: "26 min",
        platform: "Uber",
        image: taxiImg,
    },
    {
        id: 8,
        name: "Ola Auto",
        type: "Auto",
        category: "Auto",
        price: 82,
        time: "5 min away",
        eta: "27 min",
        platform: "Ola",
        image: taxiImg,
    },
];

const Rides = () => {
    const [pickup, setPickup] = useState("Current Location");
    const [destination, setDestination] = useState("Kempegowda International Airport");
    const [selectedMode, setSelectedMode] = useState("Cab");

    // Filter rides based on selected mode
    const filteredRides = rideOptions.filter(ride => ride.category === selectedMode);

    // Auto-select best value
    const bestValueRide = filteredRides.reduce((prev, curr) => prev.price < curr.price ? prev : curr, filteredRides[0]);
    const [selectedRide, setSelectedRide] = useState<any>(null); // Allow null effectively, or init

    // Effect-like logic for selection update
    const currentSelection = (selectedRide && selectedRide.category === selectedMode) ? selectedRide : bestValueRide;

    const pickupCoords = { lat: 12.9716, lng: 77.5946, label: pickup };
    const destCoords = { lat: 13.1989, lng: 77.7068, label: destination };

    return (
        <div className="min-h-screen bg-background pb-32">
            <div className="px-5 py-6 max-w-5xl mx-auto w-full">
                <h1 className="text-2xl font-bold mb-6 tracking-tight">Book a Ride</h1>

                {/* Map Section */}
                <div className="rounded-2xl overflow-hidden border border-border/60 mb-6 h-48 md:h-64 shadow-sm">
                    <MapBox pickup={pickupCoords} destination={destCoords} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Controls & List */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Location Inputs */}
                        <Card className="p-4 bg-card border-border/60 shadow-sm">
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Navigation size={14} className="text-primary" />
                                    </div>
                                    <Input
                                        placeholder="Pick-up location"
                                        value={pickup}
                                        onChange={(e) => setPickup(e.target.value)}
                                        className="pl-12 h-12 bg-background"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                                        <MapPin size={14} className="text-destructive" />
                                    </div>
                                    <Input
                                        placeholder="Destination"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                        className="pl-12 h-12 bg-background"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Mode Switcher */}
                        <div className="flex p-1 bg-secondary/50 rounded-xl">
                            {["Bike", "Auto", "Cab"].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setSelectedMode(mode)}
                                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${selectedMode === mode
                                        ? "bg-background shadow-sm text-foreground ring-1 ring-border/50"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <span className="text-lg">
                                        {mode === "Bike" ? "🏍️" : mode === "Auto" ? "🛺" : "🚕"}
                                    </span>
                                    {mode}
                                </button>
                            ))}
                        </div>

                        {/* Rides List */}
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold px-1">Available Rides</h2>
                            {filteredRides.map((ride) => (
                                <div
                                    key={ride.id}
                                    onClick={() => setSelectedRide(ride)}
                                    className={`group p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-4 ${currentSelection.id === ride.id
                                            ? "bg-secondary border-primary/30 shadow-md ring-1 ring-primary/20"
                                            : "bg-card border-border/40 hover:bg-secondary/50 hover:border-border/80"
                                        }`}
                                >
                                    <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center p-1 border border-border/10">
                                        <img src={ride.image.src} alt={ride.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-foreground">{ride.name}</h3>
                                            {currentSelection.id === ride.id && (
                                                <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full font-bold">SELECTED</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                            <span>{ride.time}</span>
                                            <span>•</span>
                                            <span>{ride.eta} trip</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className="block font-bold text-lg">₹{ride.price}</span>
                                        <span className="text-xs text-muted-foreground font-medium">{ride.platform}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Summary (Sticky) */}
                    <div className="hidden md:block">
                        <div className="sticky top-6">
                            <Card className="p-6 bg-card border-border/60 shadow-md">
                                <div className="mb-6">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Ready to go?</p>
                                    <h3 className="font-bold text-2xl mt-1">{currentSelection.name}</h3>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Estimated Cost</span>
                                        <span className="font-bold">₹{currentSelection.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Pickup</span>
                                        <span className="font-medium">{currentSelection.time}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Trip Time</span>
                                        <span className="font-medium">{currentSelection.eta}</span>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full font-bold uppercase tracking-wider">
                                    Confirm {currentSelection.platform}
                                </Button>
                                <p className="text-center text-xs text-muted-foreground mt-4">Safe ride verified • 24/7 Support</p>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Mobile Floating Action */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/40 p-4 pb-6 z-20">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div>
                            <p className="font-bold text-lg">{currentSelection.name}</p>
                            <p className="text-xs text-muted-foreground">{currentSelection.time}</p>
                        </div>
                        <span className="text-xl font-bold">₹{currentSelection.price}</span>
                    </div>
                    <Button className="w-full h-12 text-sm font-bold uppercase tracking-wider">
                        Confirm Ride
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Rides;
