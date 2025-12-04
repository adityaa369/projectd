import { Search, Mic, User, Bell, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import burgerImg from "@/assets/burger.png";
import pizzaImg from "@/assets/pizza.png";
import taxiImg from "@/assets/taxi.png";
import busImg from "@/assets/bus.png";
import laptopImg from "@/assets/laptop.png";

const categories = [
  {
    icon: "🛒",
    label: "E-commerce",
    image: laptopImg,
    description: "Find me the cheapest iPhone 15 Pro today",
    link: "/electronics",
    keywords: ["electronics", "e-commerce", "phone", "laptop", "iphone", "shopping"]
  },
  {
    icon: "🍕",
    label: "Food",
    image: pizzaImg,
    description: "Order pizza under ₹300",
    link: "/food-search",
    keywords: ["food", "pizza", "burger", "eat", "order", "restaurant"]
  },
  {
    icon: "🚗",
    label: "Rides",
    image: taxiImg,
    description: "Book the cheapest ride to Airport",
    link: "/rides",
    keywords: ["rides", "taxi", "cab", "uber", "ola", "ride", "car"]
  },
  {
    icon: "🚌",
    label: "Travel",
    image: busImg,
    description: "Find a bus Bangalore under ₹1,000",
    link: "/travel",
    keywords: ["travel", "bus", "train", "flight", "trip", "journey"]
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      // Check for hotel-related searches
      if (query.includes("hotel") || query.includes("stay") || query.includes("room")) {
        navigate("/hotel-finder");
        return;
      }
      
      // Check categories
      for (const category of categories) {
        if (category.keywords.some(keyword => query.includes(keyword))) {
          navigate(category.link);
          return;
        }
      }
      
      // Default to food search if no match
      navigate("/food-search");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xl font-bold">⬡</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
            <User size={22} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
            <Bell size={22} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pb-8 flex-1 flex flex-col items-center max-w-2xl mx-auto w-full">
        {/* Hero Title */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            AI cost-saving<br />assistant
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={20} />
          </div>
          <Input 
            variant="search"
            inputSize="lg"
            placeholder="Ask me anything..."
            className="pl-12 pr-20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
              <Mic size={20} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-icon-grey hover:bg-secondary transition-colors">
              <Mic size={20} />
            </button>
          </div>
        </div>

        {/* Hint Text */}
        <p className="text-center text-muted-foreground text-sm mb-10">
          (Find a phone, Order pizza, Book a ride, Plan a trip)
        </p>

        {/* Category Cards */}
        <div className="overflow-x-auto scrollbar-hide w-full">
          <div className="flex gap-4 pb-4 justify-center">
            {categories.map((category) => (
              <Link 
                key={category.label} 
                to={category.link}
                className="flex-shrink-0"
              >
                <Card variant="default" className="w-44 p-4 hover:shadow-elevated transition-shadow cursor-pointer animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-semibold text-foreground">{category.label}</span>
                  </div>
                  <div className="w-full h-28 rounded-xl bg-secondary/50 mb-3 overflow-hidden flex items-center justify-center">
                    <img 
                      src={category.image} 
                      alt={category.label}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <p className="text-sm text-foreground leading-snug">
                    {category.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/hotel-finder">
            <Card variant="flat" className="px-4 py-2 cursor-pointer hover:bg-secondary transition-colors">
              <span className="text-sm font-medium">🏨 Hotel Finder</span>
            </Card>
          </Link>
          <Link to="/food-search">
            <Card variant="flat" className="px-4 py-2 cursor-pointer hover:bg-secondary transition-colors">
              <span className="text-sm font-medium">🍔 Food Search</span>
            </Card>
          </Link>
          <Link to="/history">
            <Card variant="flat" className="px-4 py-2 cursor-pointer hover:bg-secondary transition-colors">
              <span className="text-sm font-medium">📋 Booking History</span>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
