import { ArrowLeft, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import laptopImg from "@/assets/laptop.png";
import mobileImg from "@/assets/mobile.png";
import clothesImg from "@/assets/clothes.png";

const categories = [
  { name: "All", icon: "🛒" },
  { name: "Mobiles", icon: "📱" },
  { name: "Laptops", icon: "💻" },
  { name: "TVs", icon: "📺" },
  { name: "Headphones", icon: "🎧" },
  { name: "Watches", icon: "⌚" },
  { name: "Cameras", icon: "📷" },
  { name: "Clothes", icon: "👕" },
];

const getProductImage = (category: string) => {
  switch (category) {
    case "Mobiles": return mobileImg;
    case "Laptops": return laptopImg;
    case "Clothes": return clothesImg;
    default: return laptopImg;
  }
};

const allProducts = [
  { id: 1, name: "iPhone 15 Pro", category: "Mobiles", price: 129999, oldPrice: 149999, rating: 4.8, brand: "Apple", platform: "Flipkart" },
  { id: 2, name: "Samsung Galaxy S24", category: "Mobiles", price: 79999, oldPrice: 89999, rating: 4.6, brand: "Samsung", platform: "Amazon" },
  { id: 3, name: "MacBook Air M3", category: "Laptops", price: 114999, oldPrice: 129999, rating: 4.9, brand: "Apple", platform: "Flipkart" },
  { id: 4, name: "Dell XPS 15", category: "Laptops", price: 159999, oldPrice: 179999, rating: 4.7, brand: "Dell", platform: "Dell" },
  { id: 5, name: "Sony Bravia 55\"", category: "TVs", price: 89999, oldPrice: 109999, rating: 4.5, brand: "Sony", platform: "Amazon" },
  { id: 6, name: "AirPods Pro 2", category: "Headphones", price: 24999, oldPrice: 29999, rating: 4.7, brand: "Apple", platform: "Flipkart" },
  { id: 7, name: "Apple Watch Series 9", category: "Watches", price: 44999, oldPrice: 49999, rating: 4.6, brand: "Apple", platform: "Amazon" },
  { id: 8, name: "Levi's Denim Jacket", category: "Clothes", price: 3999, oldPrice: 5999, rating: 4.4, brand: "Levi's", platform: "Myntra" },
  { id: 9, name: "Nike Air Max", category: "Clothes", price: 12999, oldPrice: 15999, rating: 4.5, brand: "Nike", platform: "Nike" },
  { id: 10, name: "Canon EOS R50", category: "Cameras", price: 74999, oldPrice: 84999, rating: 4.6, brand: "Canon", platform: "Amazon" },
  { id: 11, name: "OnePlus 12", category: "Mobiles", price: 64999, oldPrice: 74999, rating: 4.5, brand: "OnePlus", platform: "Amazon" },
  { id: 12, name: "HP Pavilion 15", category: "Laptops", price: 69999, oldPrice: 79999, rating: 4.3, brand: "HP", platform: "Flipkart" },
];

const Electronics = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(allProducts[0]);

  const filteredProducts = allProducts.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 max-w-4xl mx-auto w-full">
        <Link to="/" className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-xl font-bold text-foreground">E-commerce Search</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="px-5 max-w-4xl mx-auto w-full">
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={20} />
          </div>
          <Input 
            variant="search"
            inputSize="lg"
            placeholder="Search mobiles, laptops, clothes..."
            className="pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="overflow-x-auto scrollbar-hide -mx-5 px-5 mb-6">
          <div className="flex gap-2 pb-2">
            {categories.map((cat) => (
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
            <Badge variant="bestValue">BEST DEAL</Badge>
            <span className="text-muted-foreground text-sm">AI Recommended</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-16 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0">
              <img src={getProductImage(selectedProduct.category)} alt={selectedProduct.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground">{selectedProduct.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedProduct.brand}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star size={12} className="fill-accent text-accent" />
                <span className="text-xs text-muted-foreground">{selectedProduct.rating}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-bold text-foreground">₹{selectedProduct.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground line-through">₹{selectedProduct.oldPrice.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card variant="default" className="p-4 mb-6 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground tracking-wide mb-3">AI INSIGHTS</p>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">Lowest price across Amazon, Flipkart & Croma</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-success">✓</span>
              <p className="text-sm text-muted-foreground">10% off with HDFC Credit Card (Max ₹2,000)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary">📈</span>
              <p className="text-sm text-muted-foreground">Lowest price in last 30 days!</p>
            </div>
          </div>
        </Card>

        {/* Products - Rectangular Bars */}
        <h2 className="text-xl font-bold text-foreground mb-4">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>
        
        <div className="space-y-3 mb-6">
          {filteredProducts.map((item) => (
            <Card 
              key={item.id}
              variant="default"
              className={`p-4 cursor-pointer transition-all animate-fade-in ${
                selectedProduct.id === item.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={getProductImage(item.category)} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{item.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.brand} • ⭐ {item.rating}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-foreground">₹{item.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item.platform}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Best price on {selectedProduct.platform}</p>
              <p className="text-2xl font-bold text-foreground">₹{selectedProduct.price.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-success font-medium">Save ₹{(selectedProduct.oldPrice - selectedProduct.price).toLocaleString()}</p>
              <p className="text-sm text-foreground">Free Delivery</p>
            </div>
          </div>
          <Button variant="checkout" size="xl" className="w-full">
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
