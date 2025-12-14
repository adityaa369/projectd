import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FoodSearch from "./pages/FoodSearch";
import Electronics from "./pages/Electronics";
import Rides from "./pages/Rides";
import Travel from "./pages/Travel";
import Hotels from "./pages/Hotels";
import HotelFinder from "./pages/HotelFinder";
import HotelResults from "./pages/HotelResults";
import BookingHistory from "./pages/BookingHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/food-search" element={<FoodSearch />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel-finder" element={<HotelFinder />} />
          <Route path="/hotel-results" element={<HotelResults />} />
          <Route path="/history" element={<BookingHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
