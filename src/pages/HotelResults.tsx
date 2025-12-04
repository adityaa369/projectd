import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import hotelDelhi from "@/assets/hotel-delhi.jpg";
import hotelJaipur from "@/assets/hotel-jaipur.jpg";
import hotelBangalore from "@/assets/hotel-bangalore.jpg";

const otherHotels = [
  { name: "Galaxy Inn", rating: 3, price: 949, review: "Friendly host", image: hotelDelhi },
  { name: "Hotel Lotus", rating: 3.5, price: 879, review: "Accessible area", image: hotelJaipur },
  { name: "Hotel Ashoka", rating: 3.5, price: 999, review: "Value for money", image: hotelBangalore },
  { name: "Hotel Ashoka", rating: 2, price: 999, review: "Extra 75 discount", image: hotelDelhi },
];

const HotelResults = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="flex items-center px-5 py-4">
        <Link to="/hotel-finder" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-5">
        {/* Main Recommendation Card */}
        <Card variant="elevated" className="p-5 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left - Hotel Info */}
            <div>
              <Badge variant="bestValue" className="mb-3">BEST BUDGET</Badge>
              
              <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                <img 
                  src={hotelJaipur} 
                  alt="Aranya Residency"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">Aranya Residency</h2>
              
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-bold text-foreground">₹999</span>
                <span className="text-muted-foreground line-through">₹1,699</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">1 night</p>
              
              <Button variant="success" size="lg" className="w-full">
                BOOK NOW
              </Button>
            </div>

            {/* Right - AI Insights */}
            <div className="pt-4 md:pt-0">
              <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-4">
                AI INSIGHTS
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-1">AI Review Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Good service, clean rooms, convenient location
                  </p>
                </div>
                
                <div className="border-t border-border pt-4">
                  <h3 className="font-bold text-foreground mb-1">Discount Suggestion</h3>
                  <p className="text-sm text-muted-foreground">
                    Apply promo code → Save another ₹100 off
                  </p>
                </div>
                
                <div className="border-t border-border pt-4">
                  <h3 className="font-bold text-foreground mb-1">Payment Suggestion</h3>
                  <p className="text-sm text-muted-foreground">
                    Use credit card → Extra ₹75 discount
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Hotels Section */}
        <h2 className="text-xl font-bold text-foreground mb-4">Hotels</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {otherHotels.map((hotel, index) => (
            <Card key={index} variant="default" className="p-3 animate-fade-in">
              <div className="flex gap-3">
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm truncate">{hotel.name}</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                      <Star key={i} size={12} className="fill-accent text-accent" />
                    ))}
                    {hotel.rating % 1 !== 0 && (
                      <Star size={12} className="fill-accent/50 text-accent" />
                    )}
                    {[...Array(5 - Math.ceil(hotel.rating))].map((_, i) => (
                      <Star key={i} size={12} className="text-border" />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-foreground mt-1">₹{hotel.price}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{hotel.review}</p>
            </Card>
          ))}
        </div>

        {/* Price Filter */}
        <p className="text-center text-primary font-semibold">
          All under ₹1,000
        </p>
      </main>
    </div>
  );
};

export default HotelResults;
