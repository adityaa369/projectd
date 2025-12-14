"use client";

import { ArrowLeft, MapPin, Navigation, Clock, IndianRupee } from "lucide-react";
import Link from "next/link";
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

    // Auto-select best value when mode changes (lowest price in category)
    const bestValueRide = filteredRides.reduce((prev, curr) => prev.price < curr.price ? prev : curr, filteredRides[0]);

    const [selectedRide, setSelectedRide] = useState(filteredRides[0]);

    // Update selected ride when mode changes
    if (selectedRide.category !== selectedMode) {
        setSelectedRide(bestValueRide);
    }

    const pickupCoords = { lat: 12.9716, lng: 77.5946, label: pickup };
    const destCoords = { lat: 13.1989, lng: 77.7068, label: destination };

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4">
                <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                    <ArrowLeft size={22} />
                </Link>
                <h1 className="text-xl font-bold text-foreground">Book a Ride</h1>
                <div className="w-10" />
            </header>

            {/* Main Content */}
            <main className="px-5">
                {/* Map */}
                <Card variant="default" className="h-64 mb-4 overflow-hidden animate-fade-in">
                    <MapBox pickup={pickupCoords} destination={destCoords} />
                </Card>

                {/* Mode Switcher */}
                <div className="flex p-1 bg-secondary/50 rounded-xl mb-6">
                    {["Bike", "Auto", "Cab"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setSelectedMode(mode)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${selectedMode === mode
                                    ? "bg-background shadow-sm text-foreground"
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

                {/* Location Inputs */}
                <Card variant="default" className="p-4 mb-4 animate-fade-in">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                                <Navigation size={18} className="text-success" />
                            </div>
                            <Input
                                variant="pill"
                                inputSize="default"
                                placeholder="Enter pickup location"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                className="flex-1"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                                <MapPin size={18} className="text-destructive" />
                            </div>
                            <Input
                                variant="pill"
                                inputSize="default"
                                placeholder="Enter destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </Card>

                {/* Best Value Recommendation */}
                <Card variant="elevated" className="p-4 mb-6 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-success text-success-foreground text-xs font-bold rounded">BEST VALUE</span>
                        <span className="text-muted-foreground text-sm">AI Recommended</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-20 h-16 bg-secondary/30 rounded-xl overflow-hidden">
                            <img src={selectedRide.image.src} alt={selectedRide.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground">{selectedRide.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {selectedRide.time}
                                </span>
                                <span>•</span>
                                <span>{selectedRide.eta} trip</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">₹{selectedRide.price}</p>
                            <p className="text-xs text-muted-foreground">{selectedRide.platform}</p>
                        </div>
                    </div>
                </Card>

                {/* All Ride Options */}
                <h2 className="text-xl font-bold text-foreground mb-4">Compare {selectedMode}s</h2>

                <div className="space-y-3 mb-6">
                    {filteredRides.map((ride) => (
                        <Card
                            key={ride.id}
                            variant="default"
                            className={`p-4 cursor-pointer transition-all animate-fade-in ${selectedRide.id === ride.id ? "ring-2 ring-primary" : ""
                                }`}
                            onClick={() => setSelectedRide(ride)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-secondary/30 rounded-lg overflow-hidden">
                                    <img src={ride.image.src} alt={ride.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-foreground">{ride.name}</h3>
                                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{ride.type}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{ride.time} • {ride.eta}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-foreground">₹{ride.price}</p>
                                    <p className="text-xs text-muted-foreground">{ride.platform}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Footer Booking Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-sm text-muted-foreground">Best price on {selectedRide.platform}</p>
                        <p className="text-2xl font-bold text-foreground">₹{selectedRide.price}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">{selectedRide.time}</p>
                        <p className="text-sm text-foreground">{selectedRide.eta} trip time</p>
                    </div>
                </div>
                <Button variant="checkout" size="xl" className="w-full">
                    BOOK {selectedRide.name.toUpperCase()}
                </Button>
            </div>
        </div>
    );
};

export default Rides;
