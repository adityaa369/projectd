import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, TrendingDown, TrendingUp, Utensils, Zap, MapPin, Calendar, Clock, Car, Bus, Plane } from "lucide-react";
import Image from "next/image";

interface ResultCardProps {
    item: any;
    type: "electronics" | "food" | "travel" | "ride" | "hotel";
}

export function RichResultCard({ item, type }: ResultCardProps) {
    const isFood = type === "food";
    const isTravel = type === "travel";
    const isRide = type === "ride";
    const isHotel = type === "hotel";
    const isElectronics = type === "electronics";

    const getBadgeLabel = () => {
        if (isFood) return "Best Value";
        if (isTravel) return "Fastest";
        if (isRide) return "Quickest";
        if (isHotel) return "Top Rated";
        return "Best Deal";
    };

    const getPlatformLabel = () => {
        if (isFood) return "Swiggy";
        if (isTravel) return item.platform || "RedBus";
        if (isRide) return item.platform || "Uber";
        if (isHotel) return "Booking.com";
        return "Flipkart";
    };

    return (
        <Card className="w-full max-w-4xl overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
                {/* Left Section: Product/Food Image & Basic Info */}
                <div className="md:w-5/12 p-6 flex flex-col relative border-b md:border-b-0 md:border-r border-border/40">
                    <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-3 py-1 text-xs uppercase font-bold tracking-wider">
                            {getBadgeLabel()}
                        </Badge>
                    </div>

                    <div className="flex-1 flex items-center justify-center py-6">
                        <div className="relative w-full aspect-square max-w-[200px] md:max-w-[240px]">
                            {/* Simple fallback img tag if Image component issues arise with quick prototyping */}
                            <img
                                src={item.image?.src || item.image}
                                alt={item.name}
                                className="w-full h-full object-contain drop-shadow-xl"
                            />
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                                {item.brand || item.restaurant || item.type || item.location}
                            </p>
                            <h3 className="text-xl md:text-2xl font-bold leading-tight text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.description || item.review || item.amenities || `${item.departure} - ${item.arrival}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section: AI Insights */}
                <div className="md:w-7/12 p-6 bg-secondary/5 space-y-6">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">AI Insights</span>
                    </div>

                    {isFood && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">AI Review Summary</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Taste, Hygiene. Great taste and quick delivery. Consistent quality reported by 95% of users.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Bundle Suggestion</h4>
                                <p className="text-sm text-muted-foreground">Add Coke + Fries for ₹80 extra, save ₹40.</p>
                            </div>
                        </div>
                    )}

                    {isElectronics && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold">Price Comparison</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center pb-2 border-b border-border/40">
                                        <span className="text-muted-foreground">Amazon</span>
                                        <span className="font-medium">₹{(item.price * 1.05).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-border/40">
                                        <span className="text-green-600 font-bold">Flipkart</span>
                                        <span className="text-green-600 font-bold">₹{item.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Croma</span>
                                        <span className="font-medium">₹{(item.price * 1.08).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isTravel && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Departure</p>
                                    <p className="font-semibold">{item.departure}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Arrival</p>
                                    <p className="font-semibold">{item.arrival}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Why this bus?</h4>
                                <p className="text-sm text-muted-foreground">Most punctual in this route with 98% on-time record.</p>
                            </div>
                        </div>
                    )}

                    {isRide && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-secondary/50 rounded-lg">
                                    <Clock size={20} className="text-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Pickup in</p>
                                    <p className="font-bold">{item.time}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Ride Stats</h4>
                                <p className="text-sm text-muted-foreground">Driver rating: 4.9 ★ • 2,000+ trips</p>
                            </div>
                        </div>
                    )}

                    {isHotel && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Location Highlight</h4>
                                <p className="text-sm text-muted-foreground">{item.location} • Close to Metro Station</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold">Amenities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {item.amenities.split(',').map((amenity: string) => (
                                        <Badge key={amenity} variant="outline" className="bg-background">{amenity.trim()}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Meta Info (Ratings/Delivery) */}
                    <div className="flex gap-4 pt-4 mt-auto">
                        <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold">{item.rating}</span>
                        </div>
                        {(isFood || isRide) && (
                            <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border shadow-sm">
                                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs font-medium">{item.time}</span>
                            </div>
                        )}
                        {isTravel && (
                            <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border shadow-sm">
                                <Bus className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="text-xs font-medium">{item.duration}</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="bg-background border-t border-border p-4 md:px-6 md:py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Best price on</span>
                        <Badge variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md px-2">
                            {getPlatformLabel()}
                        </Badge>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-bold block">₹{item.price.toLocaleString()}</span>
                        {(isTravel || isHotel) && <span className="text-[10px] text-muted-foreground line-through">₹{item.oldPrice.toLocaleString()}</span>}
                    </div>
                </div>

                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 h-12 text-sm font-bold uppercase tracking-wider rounded-xl">
                    Universal Checkout
                </Button>
            </div>
        </Card>
    );
}
