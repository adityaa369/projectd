import { ArrowLeft, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import burgerImg from "@/assets/burger.png";

const comparisonItems = [
  {
    name: "Cheeseburger",
    price: 259,
    rating: 3,
    time: "20 min",
    review: "Taste, Hygiene",
    platform: "Zomato",
    color: "#E23744"
  },
  {
    name: "Cheeseburger",
    price: 209,
    rating: 3.5,
    time: "30 min",
    review: "Large, hygriene",
    platform: "Swiggy",
    color: "#FC8019"
  },
  {
    name: "Cheeseburger",
    price: 239,
    rating: 3.5,
    time: "Medium",
    review: "Medium taste",
    platform: "Uber Eats",
    color: "#000000"
  },
];

const FoodSearch = () => {
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Search result</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
          <Search size={22} />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-5">
        {/* Main Recommendation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left - Product Card */}
          <Card variant="elevated" className="p-5 animate-fade-in">
            <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-2">
              BEST VALUE MEAL RECOMMENDATION
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-1">Cheeseburger</h2>
            <p className="text-muted-foreground text-sm mb-4">Burger Palace</p>
            
            <div className="w-full aspect-square max-w-xs mx-auto mb-4">
              <img 
                src={burgerImg} 
                alt="Cheeseburger"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-bold text-foreground">₹199</span>
              <span className="text-muted-foreground">25 min</span>
            </div>
            
            <Button variant="cta" size="lg" className="w-full mt-4">
              ORDER NOW
            </Button>
          </Card>

          {/* Right - AI Insights Card */}
          <Card variant="default" className="p-5 animate-fade-in">
            <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-4">
              AI INSIGHTS
            </p>
            
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-foreground mb-1">AI REVIEW SUMMARY</h3>
                <p className="text-sm text-muted-foreground">
                  Taste is great, portion size is medium, delivery fast
                </p>
              </div>
              
              <div className="border-t border-border pt-4">
                <h3 className="font-bold text-foreground mb-1">BUNDLE SUGGESTION</h3>
                <p className="text-sm text-muted-foreground">
                  Add Coke + Fries for ₹80 extra, save ₹40
                </p>
              </div>
              
              <div className="border-t border-border pt-4">
                <h3 className="font-bold text-foreground mb-1">PAYMENT SUGGESTION</h3>
                <p className="text-sm text-muted-foreground">
                  Pay via Paytm UPI → Extra 20% cashback
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {comparisonItems.map((item, index) => (
            <Card key={index} variant="default" className="p-3 animate-fade-in">
              <h3 className="font-semibold text-foreground text-sm mb-2">{item.name}</h3>
              <div className="w-full aspect-square mb-2 bg-secondary/30 rounded-xl overflow-hidden">
                <img 
                  src={burgerImg} 
                  alt={item.name}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <p className="text-lg font-bold text-foreground">₹{item.price}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  {[...Array(Math.floor(item.rating))].map((_, i) => (
                    <Star key={i} size={12} className="fill-accent text-accent" />
                  ))}
                  {item.rating % 1 !== 0 && (
                    <Star size={12} className="fill-accent/50 text-accent" />
                  )}
                </div>
                <span>{item.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.review}</p>
              <button className="text-primary text-xs font-medium mt-2 hover:underline">
                View on {item.platform}
              </button>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded">zomato</span>
            <span className="text-lg font-bold">₹209</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-foreground text-background text-xs font-bold rounded">view or</span>
            <span className="text-lg font-bold">223'</span>
            <span className="text-muted-foreground text-sm">30 min delivery</span>
          </div>
        </div>
        <Button variant="checkout" size="xl" className="w-full">
          UNIVERSAL CHECKOUT<br />
          <span className="text-sm font-normal opacity-80">(AI-APPLIED BEST DISCOUNTS)</span>
        </Button>
      </div>
    </div>
  );
};

export default FoodSearch;
