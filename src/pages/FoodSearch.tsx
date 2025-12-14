import { ArrowLeft, Search, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import burgerImg from "@/assets/burger.png";
import pizzaImg from "@/assets/pizza.png";
import biryaniImg from "@/assets/biryani.png";
import chineseImg from "@/assets/chinese.png";
import dosaImg from "@/assets/dosa.png";

const menuCategories = [
  { name: "All", icon: "🍽️" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Biryani", icon: "🍚" },
  { name: "Chinese", icon: "🥡" },
  { name: "South Indian", icon: "🥘" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" },
];

const allFoodItems = [
  { id: 1, name: "Cheeseburger", category: "Burger", price: 199, oldPrice: 259, rating: 4.2, time: "25 min", restaurant: "Burger Palace", platform: "Swiggy", image: burgerImg },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 249, oldPrice: 349, rating: 4.5, time: "30 min", restaurant: "Pizza Hut", platform: "Zomato", image: pizzaImg },
  { id: 3, name: "Pepperoni Pizza", category: "Pizza", price: 349, oldPrice: 449, rating: 4.6, time: "35 min", restaurant: "Dominos", platform: "Swiggy", image: pizzaImg },
  { id: 4, name: "Chicken Burger", category: "Burger", price: 179, oldPrice: 229, rating: 4.0, time: "20 min", restaurant: "McDonalds", platform: "Zomato", image: burgerImg },
  { id: 5, name: "Hyderabadi Biryani", category: "Biryani", price: 299, oldPrice: 399, rating: 4.7, time: "40 min", restaurant: "Paradise", platform: "Swiggy", image: biryaniImg },
  { id: 6, name: "Chicken Fried Rice", category: "Chinese", price: 199, oldPrice: 249, rating: 4.1, time: "25 min", restaurant: "Wok Express", platform: "Zomato", image: chineseImg },
  { id: 7, name: "Masala Dosa", category: "South Indian", price: 129, oldPrice: 169, rating: 4.4, time: "20 min", restaurant: "Saravana Bhavan", platform: "Swiggy", image: dosaImg },
  { id: 8, name: "Veg Biryani", category: "Biryani", price: 249, oldPrice: 329, rating: 4.3, time: "35 min", restaurant: "Meghana Foods", platform: "Zomato", image: biryaniImg },
  { id: 9, name: "Hakka Noodles", category: "Chinese", price: 179, oldPrice: 219, rating: 4.0, time: "20 min", restaurant: "Chowman", platform: "Swiggy", image: chineseImg },
  { id: 10, name: "Cheese Burst Pizza", category: "Pizza", price: 399, oldPrice: 499, rating: 4.8, time: "40 min", restaurant: "Dominos", platform: "Zomato", image: pizzaImg },
];

const FoodSearch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(allFoodItems[0]);

  const filteredItems = allFoodItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-2xl mx-auto w-full">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Food Search</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="px-5 max-w-2xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={20} />
          </div>
          <Input 
            variant="search"
            inputSize="lg"
            placeholder="Search pizza, burger, biryani..."
            className="pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Menu Categories */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 px-5 mb-6">
          <div className="flex gap-2 pb-2">
            {menuCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                <span>{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Best Value Card */}
        <Card variant="elevated" className="p-4 mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="bestValue">BEST VALUE</Badge>
            <span className="text-muted-foreground text-sm">AI Recommended</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-16 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0">
              <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground">{selectedFood.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedFood.restaurant}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{selectedFood.time}</span>
                <Star size={12} className="fill-accent text-accent" />
                <span className="text-xs text-muted-foreground">{selectedFood.rating}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-foreground">₹{selectedFood.price}</p>
              <p className="text-sm text-muted-foreground line-through">₹{selectedFood.oldPrice}</p>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card variant="default" className="p-4 mb-6 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-3">AI INSIGHTS</p>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">Best price across Swiggy, Zomato & Uber Eats</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">Add Coke + Fries for ₹80 extra, save ₹40</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">💳</span>
              <p className="text-sm text-muted-foreground">Pay via Paytm UPI → Extra 20% cashback</p>
            </div>
          </div>
        </Card>

        {/* Food Items - Rectangular Bars */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {selectedCategory === "All" ? "All Items" : selectedCategory}
        </h2>
        
        <div className="space-y-3 mb-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id}
              variant="default"
              className={`p-4 cursor-pointer transition-all animate-fade-in ${
                selectedFood.id === item.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedFood(item)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{item.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.restaurant} • {item.time}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-foreground">₹{item.price}</p>
                  <p className="text-xs text-muted-foreground">{item.platform}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Best price on {selectedFood.platform}</p>
              <p className="text-2xl font-bold text-foreground">₹{selectedFood.price}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{selectedFood.restaurant}</p>
              <p className="text-sm text-foreground">{selectedFood.time} delivery</p>
            </div>
          </div>
          <Button variant="checkout" size="xl" className="w-full">
            ORDER NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;
