import { ArrowLeft, MapPin, Navigation, Clock, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import busImg from "@/assets/bus.png";

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
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Bus Travel</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="px-5">
        {/* Search Form */}
        <Card variant="default" className="p-4 mb-4 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Navigation size={18} className="text-success" />
              </div>
              <Input
                variant="pill"
                inputSize="default"
                placeholder="From city"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
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
                placeholder="To city"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar size={18} className="text-primary" />
              </div>
              <Input
                type="date"
                variant="pill"
                inputSize="default"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </Card>

        {/* Map */}
        <Card variant="default" className="h-48 mb-6 overflow-hidden animate-fade-in">
          <MapBox pickup={fromCoords} destination={toCoords} />
        </Card>

        {/* Best Value Card */}
        <Card variant="elevated" className="p-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="bestValue">BEST VALUE</Badge>
            <span className="text-muted-foreground text-sm">AI Recommended</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-16 bg-secondary/30 rounded-xl overflow-hidden">
              <img src={selectedTravel.image} alt={selectedTravel.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{selectedTravel.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedTravel.type}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-foreground">{selectedTravel.departure}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-sm text-foreground">{selectedTravel.arrival}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">₹{selectedTravel.price}</p>
              <p className="text-sm text-muted-foreground line-through">₹{selectedTravel.oldPrice}</p>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card variant="default" className="p-4 mb-6 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-3">AI INSIGHTS</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">Best price-to-comfort ratio among all options</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">High rating (4.5★) with good reviews</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">💳</span>
              <p className="text-sm text-muted-foreground">Pay with Paytm for extra ₹50 cashback</p>
            </div>
          </div>
        </Card>

        {/* All Bus Options */}
        <h2 className="text-xl font-bold text-foreground mb-4">All Buses</h2>
        
        <div className="space-y-3 mb-6">
          {travelOptions.map((travel) => (
            <Card 
              key={travel.id}
              variant="default"
              className={`p-4 cursor-pointer transition-all animate-fade-in ${
                selectedTravel.id === travel.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedTravel(travel)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-secondary/30 rounded-lg overflow-hidden">
                  <img src={travel.image} alt={travel.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{travel.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{travel.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{travel.departure}</span>
                    <span>→</span>
                    <span>{travel.arrival}</span>
                    <span>•</span>
                    <span>{travel.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Users size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{travel.seats} seats left</span>
                    <span className="text-xs text-muted-foreground">• {travel.platform}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">₹{travel.price}</p>
                  <p className="text-xs text-muted-foreground line-through">₹{travel.oldPrice}</p>
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
            <p className="text-sm text-muted-foreground">{selectedTravel.name} • {selectedTravel.type}</p>
            <p className="text-2xl font-bold text-foreground">₹{selectedTravel.price}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground">{selectedTravel.departure} → {selectedTravel.arrival}</p>
            <p className="text-xs text-muted-foreground">{selectedTravel.seats} seats available</p>
          </div>
        </div>
        <Button variant="checkout" size="xl" className="w-full">
          BOOK ON {selectedTravel.platform.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

export default Travel;
