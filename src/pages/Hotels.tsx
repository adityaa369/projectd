import { ArrowLeft, MapPin, Navigation, Star, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapBox from "@/components/MapBox";
import hotelImg from "@/assets/hotel.png";
import hotelDelhi from "@/assets/hotel-delhi.jpg";
import hotelJaipur from "@/assets/hotel-jaipur.jpg";
import hotelBangalore from "@/assets/hotel-bangalore.jpg";

const hotelOptions = [
  { id: 1, name: "Aranya Residency", type: "Budget", price: 999, oldPrice: 1699, rating: 4.2, reviews: 234, location: "Near City Center", amenities: "Free WiFi, AC, TV", platform: "OYO", image: hotelDelhi },
  { id: 2, name: "Galaxy Inn", type: "Standard", price: 1499, oldPrice: 2199, rating: 4.0, reviews: 156, location: "MG Road", amenities: "Free Breakfast, Pool", platform: "MakeMyTrip", image: hotelJaipur },
  { id: 3, name: "Hotel Lotus", type: "Premium", price: 2499, oldPrice: 3499, rating: 4.5, reviews: 312, location: "Airport Road", amenities: "Spa, Gym, Restaurant", platform: "Booking.com", image: hotelBangalore },
  { id: 4, name: "The Grand Palace", type: "Luxury", price: 4999, oldPrice: 6999, rating: 4.8, reviews: 567, location: "Central Business District", amenities: "All Inclusive", platform: "Agoda", image: hotelDelhi },
  { id: 5, name: "Budget Stay", type: "Economy", price: 599, oldPrice: 899, rating: 3.8, reviews: 89, location: "Railway Station Area", amenities: "Basic Amenities", platform: "OYO", image: hotelJaipur },
  { id: 6, name: "Comfort Suites", type: "Standard", price: 1899, oldPrice: 2499, rating: 4.3, reviews: 198, location: "Tech Park", amenities: "Free Parking, WiFi", platform: "Goibibo", image: hotelBangalore },
];

const Hotels = () => {
  const [location, setLocation] = useState("Bangalore");
  const [checkIn, setCheckIn] = useState("2025-12-15");
  const [checkOut, setCheckOut] = useState("2025-12-16");
  const [selectedHotel, setSelectedHotel] = useState(hotelOptions[0]);

  const locationCoords = { lat: 12.9716, lng: 77.5946, label: location };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto w-full">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Hotel Finder</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="px-5 max-w-2xl mx-auto w-full">
        {/* Search Form */}
        <Card variant="default" className="p-4 mb-4 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <Input
                variant="pill"
                inputSize="default"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-success" />
                </div>
                <Input
                  type="date"
                  variant="pill"
                  inputSize="default"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-destructive" />
                </div>
                <Input
                  type="date"
                  variant="pill"
                  inputSize="default"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Map */}
        <Card variant="default" className="h-48 mb-6 overflow-hidden animate-fade-in">
          <MapBox pickup={locationCoords} />
        </Card>

        {/* Best Value Card */}
        <Card variant="elevated" className="p-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="bestValue">BEST VALUE</Badge>
            <span className="text-muted-foreground text-sm">AI Recommended</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-24 h-20 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0">
              <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground">{selectedHotel.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedHotel.location}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star size={12} className="fill-accent text-accent" />
                <span className="text-xs text-muted-foreground">{selectedHotel.rating} ({selectedHotel.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-foreground">₹{selectedHotel.price}</p>
              <p className="text-sm text-muted-foreground line-through">₹{selectedHotel.oldPrice}</p>
              <p className="text-xs text-muted-foreground">per night</p>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card variant="default" className="p-4 mb-6 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-3">AI INSIGHTS</p>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">Best price across OYO, MakeMyTrip & Booking.com</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">{selectedHotel.amenities}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">💳</span>
              <p className="text-sm text-muted-foreground">Extra 10% off with HDFC Credit Card</p>
            </div>
          </div>
        </Card>

        {/* All Hotels */}
        <h2 className="text-xl font-bold text-foreground mb-4">Hotels Near You</h2>
        
        <div className="space-y-3 mb-6">
          {hotelOptions.map((hotel) => (
            <Card 
              key={hotel.id}
              variant="default"
              className={`p-4 cursor-pointer transition-all animate-fade-in ${
                selectedHotel.id === hotel.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedHotel(hotel)}
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{hotel.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{hotel.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{hotel.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={12} className="fill-accent text-accent" />
                    <span className="text-xs text-muted-foreground">{hotel.rating}</span>
                    <span className="text-xs text-muted-foreground">• {hotel.platform}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-foreground">₹{hotel.price}</p>
                  <p className="text-xs text-muted-foreground line-through">₹{hotel.oldPrice}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">{selectedHotel.name} • {selectedHotel.type}</p>
              <p className="text-2xl font-bold text-foreground">₹{selectedHotel.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-success font-medium">Save ₹{selectedHotel.oldPrice - selectedHotel.price}</p>
              <p className="text-xs text-muted-foreground">{selectedHotel.amenities}</p>
            </div>
          </div>
          <Button variant="checkout" size="xl" className="w-full">
            BOOK ON {selectedHotel.platform.toUpperCase()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
