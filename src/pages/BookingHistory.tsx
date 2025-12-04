import { Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import burgerImg from "@/assets/burger.png";
import hotelDelhi from "@/assets/hotel-delhi.jpg";
import taxiImg from "@/assets/taxi.png";
import busImg from "@/assets/bus.png";

const tabs = ["Food", "E-commerce", "Rides", "Travel", "Hotels"];

const bookings = [
  {
    type: "hotel",
    name: "Radisson Blu – New Delhi",
    date: "Completed on 10 Nov 2025",
    status: "completed",
    image: hotelDelhi,
  },
  {
    type: "food",
    name: "Cheeseburger – Burger Palace",
    action: "reorder",
    image: burgerImg,
  },
  {
    type: "ride",
    name: "Yellow Cab",
    price: 209,
    status: "ongoing",
    image: taxiImg,
  },
  {
    type: "travel",
    name: "VRL Travels",
    date: "Cancelled on 20 Sep 2025",
    status: "ongoing",
    statusColor: "warning",
    image: busImg,
  },
  {
    type: "travel",
    name: "VRL Travels",
    date: "Cancelled on 20 Sep 2025",
    status: "cancelled",
    image: busImg,
  },
];

const BookingHistory = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-5 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-foreground text-center">
          Your Booking History
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-5 pb-8">
        {/* Tabs */}
        <div className="flex gap-4 justify-center mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-medium whitespace-nowrap ${
                index === tabs.length - 1 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              } transition-colors`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={20} />
          </div>
          <Input 
            variant="search"
            inputSize="default"
            placeholder="Search past orders or bookings..."
            className="pl-12"
          />
        </div>

        {/* Booking List */}
        <div className="space-y-3">
          {bookings.map((booking, index) => (
            <Card key={index} variant="default" className="p-4 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-secondary/30">
                  <img 
                    src={booking.image} 
                    alt={booking.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{booking.name}</h3>
                  {booking.date && (
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  )}
                  {booking.price && (
                    <p className="text-sm text-muted-foreground">₹{booking.price}</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {booking.action === "reorder" && (
                    <Button variant="reorder" size="sm">Reorder</Button>
                  )}
                  {booking.status === "completed" && (
                    <Badge variant="completed">Completed</Badge>
                  )}
                  {booking.status === "ongoing" && booking.statusColor !== "warning" && (
                    <Badge variant="ongoing">
                      <span className="w-2 h-2 rounded-full bg-success mr-1.5" />
                      Ongoing
                    </Badge>
                  )}
                  {booking.status === "ongoing" && booking.statusColor === "warning" && (
                    <Badge variant="ongoing" className="bg-warning/10 text-warning border-warning/30">
                      <span className="w-2 h-2 rounded-full bg-warning mr-1.5" />
                      Ongoing
                    </Badge>
                  )}
                  {booking.status === "cancelled" && (
                    <Badge variant="cancelled">
                      × Cancelled
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-primary font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BookingHistory;
