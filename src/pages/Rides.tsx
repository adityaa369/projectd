import { ArrowLeft, MapPin, Navigation, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import taxiImg from "@/assets/taxi.png";

const rideModes = [
  { id: "uber", name: "Uber", icon: "🚗" },
  { id: "ola", name: "Ola", icon: "🚕" },
  { id: "rapido", name: "Rapido", icon: "🏍️" },
];

const rideOptions = [
  { id: 1, name: "Uber Go", type: "Economy", price: 209, time: "4 min away", eta: "25 min", platform: "Uber", image: taxiImg },
  { id: 2, name: "Ola Mini", type: "Economy", price: 189, time: "3 min away", eta: "28 min", platform: "Ola", image: taxiImg },
  { id: 3, name: "Uber Premier", type: "Premium", price: 349, time: "6 min away", eta: "22 min", platform: "Uber", image: taxiImg },
  { id: 4, name: "Ola Prime", type: "Premium", price: 329, time: "5 min away", eta: "24 min", platform: "Ola", image: taxiImg },
  { id: 5, name: "Rapido Bike", type: "Bike", price: 79, time: "2 min away", eta: "20 min", platform: "Rapido", image: taxiImg },
  { id: 6, name: "Rapido Auto", type: "Auto", price: 119, time: "3 min away", eta: "30 min", platform: "Rapido", image: taxiImg },
  { id: 7, name: "Ola Auto", type: "Auto", price: 129, time: "4 min away", eta: "32 min", platform: "Ola", image: taxiImg },
];

const Rides = () => {
  const [pickup, setPickup] = useState("Current Location");
  const [destination, setDestination] = useState("Kempegowda International Airport");
  const [selectedMode, setSelectedMode] = useState("uber");
  const [selectedRide, setSelectedRide] = useState(rideOptions[1]);

  const pickupCoords = { lat: 12.9716, lng: 77.5946, label: pickup };
  const destCoords = { lat: 13.1989, lng: 77.7068, label: destination };

  const filteredRides = rideOptions.filter(ride => 
    selectedMode === "uber" ? ride.platform === "Uber" :
    selectedMode === "ola" ? ride.platform === "Ola" :
    ride.platform === "Rapido"
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-4xl mx-auto w-full">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Book a Ride</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="px-5 max-w-4xl mx-auto w-full">
        {/* Mode Switch */}
        <div className="flex gap-2 mb-4">
          {rideModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                selectedMode === mode.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              <span>{mode.icon}</span>
              <span className="font-medium">{mode.name}</span>
            </button>
          ))}
        </div>

        {/* Location Inputs */}
        <Card variant="default" className="p-4 mb-4 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
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
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
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

        {/* Map */}
        <Card variant="default" className="h-48 mb-6 overflow-hidden animate-fade-in">
          <MapBox pickup={pickupCoords} destination={destCoords} />
        </Card>

        {/* Best Value Recommendation */}
        <Card variant="elevated" className="p-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="bestValue">BEST VALUE</Badge>
            <span className="text-muted-foreground text-sm">AI Recommended</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-16 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0">
              <img src={selectedRide.image} alt={selectedRide.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
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
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-foreground">₹{selectedRide.price}</p>
              <p className="text-xs text-muted-foreground">{selectedRide.platform}</p>
            </div>
          </div>
        </Card>

        {/* All Ride Options */}
        <h2 className="text-xl font-bold text-foreground mb-4">Compare Rides</h2>
        
        <div className="space-y-3 mb-6">
          {filteredRides.map((ride) => (
            <Card 
              key={ride.id}
              variant="default"
              className={`p-4 cursor-pointer transition-all animate-fade-in ${
                selectedRide.id === ride.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedRide(ride)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={ride.image} alt={ride.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{ride.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{ride.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{ride.time} • {ride.eta}</p>
                </div>
                <div className="text-right flex-shrink-0">
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
        <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default Rides;
