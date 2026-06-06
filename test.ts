import { useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Search, Hotel, Car, ArrowRight, ArrowLeft, Star, MapPin, Menu, X,
  Phone, Mail, Users, IndianRupee, Check, SlidersHorizontal, Calendar,
  Clock, User,
} from "lucide-react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// ==================== IMAGES ====================
const IMAGES = {
  hero: "https://mgx-backend-cdn.metadl.com/generate/images/1112552/2026-04-13/9780f6c6-f122-4231-92ba-3f604d606101.png",
  hotelLuxury: "https://mgx-backend-cdn.metadl.com/generate/images/1112552/2026-04-13/dfb886bb-2138-4efc-a50d-71017d28e888.png",
  hotelHeritage: "https://mgx-backend-cdn.metadl.com/generate/images/1112552/2026-04-13/df84f26a-5879-4d0b-84c1-261dc4432cd3.png",
  cab: "https://mgx-backend-cdn.metadl.com/generate/images/1112552/2026-04-13/bf3f2590-10ad-45e9-a419-395cdba2697d.png",
};

// ==================== TYPES ====================
interface HotelType {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  rooms: RoomType[];
}

interface RoomType {
  type: string;
  price: number;
  capacity: number;
}

interface CabTypeData {
  id: number;
  type: string;
  name: string;
  price: number;
  image: string;
  capacity: number;
  description: string;
}

interface BookingType {
  id: string;
  type: "hotel" | "cab";
  name: string;
  date: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  details: string;
  price: number;
}

// ==================== MOCK DATA ====================
const hotels: HotelType[] = [
  {
    id: 1, name: "Mahakal Heritage Resort", location: "Near Mahakaleshwar Temple, Ujjain",
    price: 3500, rating: 4.7, image: IMAGES.hotelHeritage,
    description: "Experience the grandeur of Ujjain at Mahakal Heritage Resort. Located just minutes from the sacred Mahakaleshwar Temple, this heritage property blends traditional Malwa architecture with modern comforts. Enjoy rooftop dining with temple views, a serene courtyard garden, and warm hospitality.",
    amenities: ["Free WiFi", "AC Rooms", "Restaurant", "Parking", "Room Service", "Temple View", "Garden"],
    rooms: [{ type: "Standard Room", price: 3500, capacity: 2 }, { type: "Deluxe Room", price: 5000, capacity: 2 }, { type: "Heritage Suite", price: 8000, capacity: 4 }],
  },
  {
    id: 2, name: "Hotel Ujjain Grand", location: "Freeganj, Ujjain",
    price: 2200, rating: 4.3, image: IMAGES.hotelLuxury,
    description: "A modern business hotel in the heart of Ujjain's commercial district. Hotel Ujjain Grand offers spacious rooms, a multi-cuisine restaurant, and excellent connectivity to all major tourist attractions and the railway station.",
    amenities: ["Free WiFi", "AC Rooms", "Restaurant", "Parking", "Laundry", "24/7 Reception"],
    rooms: [{ type: "Standard Room", price: 2200, capacity: 2 }, { type: "Deluxe Room", price: 3200, capacity: 2 }, { type: "Family Suite", price: 5500, capacity: 4 }],
  },
  {
    id: 3, name: "Shipra Residency", location: "Ram Ghat Road, Ujjain",
    price: 1800, rating: 4.1, image: IMAGES.hotelHeritage,
    description: "Nestled along the banks of the holy Shipra River, this charming residency offers peaceful river views and easy access to Ram Ghat. Ideal for pilgrims and tourists seeking a tranquil stay with authentic local cuisine.",
    amenities: ["Free WiFi", "River View", "Restaurant", "Parking", "Room Service"],
    rooms: [{ type: "Standard Room", price: 1800, capacity: 2 }, { type: "River View Room", price: 2800, capacity: 2 }, { type: "Premium Suite", price: 4500, capacity: 3 }],
  },
  {
    id: 4, name: "Avantika Palace Hotel", location: "Tower Chowk, Ujjain",
    price: 4200, rating: 4.5, image: IMAGES.hotelLuxury,
    description: "A premium luxury hotel offering world-class amenities in the ancient city of Ujjain. Avantika Palace features a rooftop pool, spa, fine dining, and elegantly designed rooms inspired by the city's rich cultural heritage.",
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar", "Gym", "Parking", "Concierge"],
    rooms: [{ type: "Superior Room", price: 4200, capacity: 2 }, { type: "Executive Suite", price: 6500, capacity: 2 }, { type: "Royal Suite", price: 10000, capacity: 4 }],
  },
  {
    id: 5, name: "Kshipra Dharamshala", location: "Harsiddhi Road, Ujjain",
    price: 800, rating: 3.8, image: IMAGES.hotelHeritage,
    description: "An affordable and clean accommodation option near Harsiddhi Temple. Perfect for budget travelers and pilgrims, offering basic amenities with a warm and welcoming atmosphere.",
    amenities: ["Fan Rooms", "Shared Bathroom", "Parking", "Temple Proximity"],
    rooms: [{ type: "Dormitory Bed", price: 800, capacity: 1 }, { type: "Double Room", price: 1200, capacity: 2 }, { type: "Family Room", price: 1800, capacity: 4 }],
  },
  {
    id: 6, name: "The Ujjain Retreat", location: "Indore Road, Ujjain",
    price: 2800, rating: 4.4, image: IMAGES.hotelLuxury,
    description: "A contemporary retreat on the outskirts of Ujjain, perfect for those seeking a peaceful getaway. Features lush green surroundings, an outdoor pool, and easy highway access for day trips to nearby attractions.",
    amenities: ["Free WiFi", "Pool", "Garden", "Restaurant", "Parking", "Outdoor Seating"],
    rooms: [{ type: "Garden View Room", price: 2800, capacity: 2 }, { type: "Pool View Room", price: 3800, capacity: 2 }, { type: "Cottage", price: 5000, capacity: 4 }],
  },
];

const cabTypes: CabTypeData[] = [
  { id: 1, type: "mini", name: "Mini", price: 8, image: IMAGES.cab, capacity: 3, description: "Compact & affordable. Perfect for solo travelers or couples for short city rides." },
  { id: 2, type: "sedan", name: "Sedan", price: 12, image: IMAGES.cab, capacity: 4, description: "Comfortable sedan for families. Spacious boot for luggage, smooth ride guaranteed." },
  { id: 3, type: "suv", name: "SUV", price: 18, image: IMAGES.cab, capacity: 6, description: "Premium SUV for groups. Extra legroom, AC, and ample luggage space for temple tours." },
];

const myBookings: BookingType[] = [
  { id: "BK-1001", type: "hotel", name: "Mahakal Heritage Resort", date: "2026-04-20", status: "Confirmed", details: "Deluxe Room · 2 Guests · 2 Nights", price: 10000 },
  { id: "BK-1002", type: "cab", name: "Sedan - Airport to Hotel", date: "2026-04-20", status: "Confirmed", details: "Ujjain Airport → Mahakal Heritage Resort", price: 450 },
  { id: "BK-1003", type: "hotel", name: "Hotel Ujjain Grand", date: "2026-03-15", status: "Completed", details: "Standard Room · 1 Guest · 1 Night", price: 2200 },
  { id: "BK-1004", type: "cab", name: "SUV - Temple Tour", date: "2026-03-16", status: "Completed", details: "Full Day Temple Circuit Tour", price: 1800 },
  { id: "BK-1005", type: "hotel", name: "Shipra Residency", date: "2026-05-01", status: "Pending", details: "River View Room · 2 Guests · 3 Nights", price: 8400 },
];

// ==================== NAVBAR ====================
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Hotels", path: "/hotels" },
  { label: "Cabs", path: "/cabs" },
  { label: "My Bookings", path: "/dashboard" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useRouterLocation();
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">UjjainYatra</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}>{link.label}</Link>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>{link.label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400 flex items-center justify-center"><MapPin className="w-4 h-4 text-white" /></div>
              <span className="text-lg font-bold text-white">UjjainYatra</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Your trusted travel companion for exploring the sacred city of Ujjain. Book hotels, cabs, and plan your perfect pilgrimage or vacation.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/hotels" className="hover:text-white transition-colors">Hotels</Link></li>
              <li><Link to="/cabs" className="hover:text-white transition-colors">Cab Services</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Bookings</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400 shrink-0" /><span>Ujjain, Madhya Pradesh, India</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400 shrink-0" /><span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400 shrink-0" /><span>info@ujjainyatra.com</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">© 2026 UjjainYatra. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ==================== HOTEL CARD ====================
function HotelCard({ hotel }: { hotel: HotelType }) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /><span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-700 transition-colors">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3"><MapPin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{hotel.location}</span></div>
        <div className="flex items-end justify-between">
          <div><span className="text-2xl font-bold text-blue-700">₹{hotel.price.toLocaleString()}</span><span className="text-sm text-gray-500 ml-1">/ night</span></div>
          <Link to={`/hotels/${hotel.id}`}><Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">View Details</Button></Link>
        </div>
      </div>
    </div>
  );
}

// ==================== CAB CARD ====================
function CabCard({ cab, selected, onSelect }: { cab: CabTypeData; selected?: boolean; onSelect?: (cab: CabTypeData) => void }) {
  return (
    <div onClick={() => onSelect?.(cab)} className={`group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:-translate-y-1 ${selected ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-100"}`}>
      <div className="relative overflow-hidden h-40">
        <img src={cab.image} alt={cab.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-amber-500 text-white rounded-lg px-3 py-1 text-sm font-semibold shadow">{cab.name}</div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{cab.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500 text-sm"><Users className="w-4 h-4" /><span>Up to {cab.capacity}</span></div>
          <div className="flex items-center text-blue-700 font-bold text-lg"><IndianRupee className="w-4 h-4" /><span>{cab.price}/km</span></div>
        </div>
      </div>
    </div>
  );
}

// ==================== HOME PAGE ====================
function HomePage() {
  const [searchMode, setSearchMode] = useState<"hotel" | "cab">("hotel");
  const [locationVal, setLocationVal] = useState("Ujjain");
  const navigate = useNavigate();
  const featuredHotels = hotels.slice(0, 3);
  const handleSearch = () => { navigate(searchMode === "hotel" ? "/hotels" : "/cabs"); };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0"><img src={IMAGES.hero} alt="Ujjain Temple" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" /></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Discover Sacred <span className="text-amber-400">Ujjain</span></h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">Book hotels & cabs for an unforgettable spiritual journey to one of India's holiest cities</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
              <div className="flex gap-2 mb-5">
                <button onClick={() => setSearchMode("hotel")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${searchMode === "hotel" ? "bg-blue-700 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}><Hotel className="w-4 h-4" />Hotels</button>
                <button onClick={() => setSearchMode("cab")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${searchMode === "cab" ? "bg-blue-700 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}><Car className="w-4 h-4" />Cabs</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input value={locationVal} onChange={(e) => setLocationVal(e.target.value)} placeholder="Location" className="pl-10 h-12 rounded-xl border-gray-200" /></div>
                {searchMode === "hotel" ? (<><Input type="date" placeholder="Check-in" className="h-12 rounded-xl border-gray-200" /><Input type="date" placeholder="Check-out" className="h-12 rounded-xl border-gray-200" /></>) : (<><Input placeholder="Pickup Location" className="h-12 rounded-xl border-gray-200" /><Input placeholder="Drop Location" className="h-12 rounded-xl border-gray-200" /></>)}
              </div>
              <Button onClick={handleSearch} className="w-full mt-4 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-base font-semibold"><Search className="w-4 h-4 mr-2" />{searchMode === "hotel" ? "Search Hotels" : "Search Cabs"}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ value: "50+", label: "Hotels" }, { value: "200+", label: "Happy Guests" }, { value: "24/7", label: "Cab Service" }, { value: "4.8★", label: "Avg Rating" }].map((s) => (<div key={s.label}><div className="text-2xl font-bold text-blue-700">{s.value}</div><div className="text-sm text-gray-500">{s.label}</div></div>))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div><h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Hotels</h2><p className="text-gray-500 mt-1">Handpicked stays for your Ujjain visit</p></div>
          <Button variant="ghost" onClick={() => navigate("/hotels")} className="text-blue-700 hover:text-blue-800 hover:bg-blue-50">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{featuredHotels.map((h) => <HotelCard key={h.id} hotel={h} />)}</div>
      </section>

      {/* Cab Services */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div><h2 className="text-3xl font-bold text-gray-900 tracking-tight">Cab Services</h2><p className="text-gray-500 mt-1">Reliable rides across Ujjain and beyond</p></div>
            <Button variant="ghost" onClick={() => navigate("/cabs")} className="text-blue-700 hover:text-blue-800 hover:bg-blue-50">Book Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{cabTypes.map((c) => <CabCard key={c.id} cab={c} />)}</div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-center mb-10">Why Choose UjjainYatra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{ icon: <Star className="w-6 h-6 text-amber-500" />, title: "Trusted Reviews", desc: "Verified ratings from real travelers who've experienced Ujjain's hospitality." }, { icon: <MapPin className="w-6 h-6 text-blue-600" />, title: "Local Expertise", desc: "Curated recommendations from locals who know every temple and hidden gem." }, { icon: <Car className="w-6 h-6 text-green-600" />, title: "Seamless Rides", desc: "Reliable cab services with professional drivers for temple tours and city travel." }].map((item) => (
            <div key={item.title} className="text-center p-6 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ==================== HOTEL LISTING PAGE ====================
const LOCATIONS = [...new Set(hotels.map((h) => h.location))];

function HotelListingPage() {
  const [priceRange, setPriceRange] = useState([0, 12000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleLocation = (loc: string) => { setSelectedLocations((prev) => prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]); };
  const filtered = useMemo(() => hotels.filter((h) => { if (h.price < priceRange[0] || h.price > priceRange[1]) return false; if (h.rating < minRating) return false; if (selectedLocations.length > 0 && !selectedLocations.includes(h.location)) return false; return true; }), [priceRange, minRating, selectedLocations]);
  const clearFilters = () => { setPriceRange([0, 12000]); setMinRating(0); setSelectedLocations([]); };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h3 className="font-semibold text-gray-900">Filters</h3><button onClick={clearFilters} className="text-sm text-blue-600 hover:underline">Clear all</button></div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Price Range: ₹{priceRange[0].toLocaleString()} – ₹{priceRange[1].toLocaleString()}</label>
        <Slider min={0} max={12000} step={500} value={priceRange} onValueChange={setPriceRange} className="mt-2" />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Minimum Rating</label>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 3.5, 4, 4.5].map((r) => (<button key={r} onClick={() => setMinRating(r)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${minRating === r ? "bg-amber-100 text-amber-700 border border-amber-300" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{r === 0 ? "All" : <><Star className="w-3 h-3 fill-amber-500 text-amber-500" />{r}+</>}</button>))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Location</label>
        <div className="space-y-2">{LOCATIONS.map((loc) => (<label key={loc} className="flex items-center gap-2 cursor-pointer"><Checkbox checked={selectedLocations.includes(loc)} onCheckedChange={() => toggleLocation(loc)} /><span className="text-sm text-gray-600 truncate">{loc}</span></label>))}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hotels in Ujjain</h1><p className="text-gray-500 mt-1">{filtered.length} properties found</p></div>
        <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal className="w-4 h-4 mr-2" />Filters</Button>
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-72 shrink-0"><div className="sticky top-24 bg-white rounded-xl shadow-md border border-gray-100 p-5"><FilterPanel /></div></aside>
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-5 shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">Filters</h2><Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></Button></div>
              <FilterPanel />
            </div>
          </div>
        )}
        <div className="flex-1">
          {filtered.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{filtered.map((h) => <HotelCard key={h.id} hotel={h} />)}</div>) : (<div className="text-center py-20"><p className="text-gray-500 text-lg">No hotels match your filters.</p><Button variant="link" onClick={clearFilters} className="text-blue-600 mt-2">Clear all filters</Button></div>)}
        </div>
      </div>
    </div>
  );
}

// ==================== HOTEL DETAILS PAGE ====================
function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === Number(id));
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  if (!hotel) return (<div className="flex flex-col items-center justify-center py-32"><p className="text-xl text-gray-500 mb-4">Hotel not found</p><Button onClick={() => navigate("/hotels")}><ArrowLeft className="w-4 h-4 mr-2" /> Back to Hotels</Button></div>);

  const handleBookNow = () => {
    if (!selectedRoom || !checkIn || !checkOut) return;
    const nights = Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)));
    navigate("/booking-summary", { state: { type: "hotel", name: hotel.name, room: selectedRoom.type, checkIn, checkOut, guests, nights, pricePerNight: selectedRoom.price, totalPrice: selectedRoom.price * nights, image: hotel.image } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => navigate("/hotels")} className="mb-4 text-gray-600 hover:text-gray-900"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Hotels</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl overflow-hidden h-64 md:h-80"><img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" /></div>
        <div className="grid grid-cols-2 gap-4">{[0, 1, 2, 3].map((i) => (<div key={i} className="rounded-xl overflow-hidden"><img src={hotel.image} alt={`${hotel.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" /></div>))}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{hotel.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-gray-500"><MapPin className="w-4 h-4" /><span className="text-sm">{hotel.location}</span></div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /><span className="text-sm font-semibold text-gray-800">{hotel.rating}</span></div>
            </div>
          </div>
          <div><h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2><p className="text-gray-600 leading-relaxed">{hotel.description}</p></div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{hotel.amenities.map((a) => (<div key={a} className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500 shrink-0" />{a}</div>))}</div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Room Types</h2>
            <div className="space-y-3">{hotel.rooms.map((room) => (
              <div key={room.type} onClick={() => setSelectedRoom(room)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRoom?.type === room.type ? "border-blue-600 bg-blue-50 ring-1 ring-blue-200" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                <div><h3 className="font-semibold text-gray-900">{room.type}</h3><div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5"><Users className="w-3.5 h-3.5" />Up to {room.capacity} guests</div></div>
                <div className="text-right"><span className="text-xl font-bold text-blue-700">₹{room.price.toLocaleString()}</span><span className="text-sm text-gray-500 block">per night</span></div>
              </div>
            ))}</div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Book Your Stay</h3>
            <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Check-in</label><Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="rounded-lg" /></div>
            <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Check-out</label><Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="rounded-lg" /></div>
            <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Guests</label><Input type="number" min={1} max={6} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rounded-lg" /></div>
            {selectedRoom && (<div className="bg-blue-50 rounded-lg p-3 text-sm"><span className="text-gray-600">Selected: </span><span className="font-semibold text-blue-700">{selectedRoom.type}</span><span className="text-gray-600"> — ₹{selectedRoom.price.toLocaleString()}/night</span></div>)}
            <Button onClick={handleBookNow} disabled={!selectedRoom || !checkIn || !checkOut} className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-base font-semibold disabled:opacity-50">Book Now</Button>
            {(!selectedRoom || !checkIn || !checkOut) && <p className="text-xs text-gray-400 text-center">Please select a room and dates to proceed</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CAB BOOKING PAGE ====================
function CabBookingPage() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedCab, setSelectedCab] = useState<CabTypeData | null>(null);

  const handleBookCab = () => {
    if (!pickup || !drop || !date || !time || !selectedCab) return;
    const estimatedKm = 15;
    navigate("/booking-summary", { state: { type: "cab", name: `${selectedCab.name} Cab`, pickup, drop, date, time, cabType: selectedCab.name, pricePerKm: selectedCab.price, estimatedKm, totalPrice: selectedCab.price * estimatedKm, image: IMAGES.cab } });
  };

  return (
    <>
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src={IMAGES.cab} alt="Cab Service" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"><h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Book a Cab in Ujjain</h1><p className="text-gray-200 mt-2">Reliable rides for temple tours and city travel</p></div></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2"><Car className="w-5 h-5 text-blue-600" />Ride Details</h2>
              <div className="space-y-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Pickup Location</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" /><Input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="e.g. Ujjain Railway Station" className="pl-10 rounded-lg" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Drop Location</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" /><Input value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="e.g. Mahakaleshwar Temple" className="pl-10 rounded-lg" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Date</label><div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10 rounded-lg" /></div></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Time</label><div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="pl-10 rounded-lg" /></div></div>
                {selectedCab && (<div className="bg-blue-50 rounded-lg p-3 text-sm"><span className="text-gray-600">Selected: </span><span className="font-semibold text-blue-700">{selectedCab.name}</span><span className="text-gray-600"> — ₹{selectedCab.price}/km</span></div>)}
                <Button onClick={handleBookCab} disabled={!pickup || !drop || !date || !time || !selectedCab} className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-base font-semibold disabled:opacity-50">Book Cab</Button>
                {(!pickup || !drop || !date || !time || !selectedCab) && <p className="text-xs text-gray-400 text-center">Fill all details and select a cab type</p>}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Choose Your Ride</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{cabTypes.map((c) => <CabCard key={c.id} cab={c} selected={selectedCab?.id === c.id} onSelect={setSelectedCab} />)}</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==================== BOOKING SUMMARY PAGE ====================
interface FormErrors { name?: string; phone?: string; email?: string; }

function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state as Record<string, unknown> | null;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmed, setConfirmed] = useState(false);

  if (!booking) return (<div className="flex flex-col items-center justify-center py-32"><p className="text-xl text-gray-500 mb-4">No booking details found</p><Button onClick={() => navigate("/")}><ArrowLeft className="w-4 h-4 mr-2" /> Go Home</Button></div>);

  const isHotel = booking.type === "hotel";
  const validate = (): boolean => {
    const ne: FormErrors = {};
    if (!name.trim()) ne.name = "Name is required";
    if (!phone.trim()) ne.phone = "Phone is required"; else if (!/^\d{10}$/.test(phone.trim())) ne.phone = "Enter a valid 10-digit phone number";
    if (!email.trim()) ne.email = "Email is required"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) ne.email = "Enter a valid email address";
    setErrors(ne); return Object.keys(ne).length === 0;
  };
  const handleConfirm = () => { if (validate()) setConfirmed(true); };

  if (confirmed) return (
    <div className="flex flex-col items-center justify-center py-32 px-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-in zoom-in duration-500"><Check className="w-10 h-10 text-green-600" /></div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">Your {isHotel ? "hotel" : "cab"} booking has been confirmed. A confirmation will be sent to {email}.</p>
      <div className="flex gap-3"><Button onClick={() => navigate("/dashboard")} className="bg-blue-700 hover:bg-blue-800 text-white">View My Bookings</Button><Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-gray-900"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Booking Summary</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="h-48 overflow-hidden"><img src={booking.image as string} alt={booking.name as string} className="w-full h-full object-cover" /></div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">{isHotel ? <Hotel className="w-5 h-5 text-blue-600" /> : <Car className="w-5 h-5 text-blue-600" />}<h2 className="text-xl font-semibold text-gray-900">{booking.name as string}</h2></div>
              <div className="space-y-2 text-sm text-gray-600">
                {isHotel ? (<><p><span className="font-medium text-gray-800">Room:</span> {booking.room as string}</p><p><span className="font-medium text-gray-800">Check-in:</span> {booking.checkIn as string}</p><p><span className="font-medium text-gray-800">Check-out:</span> {booking.checkOut as string}</p><p><span className="font-medium text-gray-800">Guests:</span> {booking.guests as number}</p><p><span className="font-medium text-gray-800">Duration:</span> {booking.nights as number} night(s)</p><p><span className="font-medium text-gray-800">Rate:</span> ₹{(booking.pricePerNight as number).toLocaleString()}/night</p></>) : (<><p><span className="font-medium text-gray-800">Pickup:</span> {booking.pickup as string}</p><p><span className="font-medium text-gray-800">Drop:</span> {booking.drop as string}</p><p><span className="font-medium text-gray-800">Date:</span> {booking.date as string}</p><p><span className="font-medium text-gray-800">Time:</span> {booking.time as string}</p><p><span className="font-medium text-gray-800">Cab Type:</span> {booking.cabType as string}</p><p><span className="font-medium text-gray-800">Rate:</span> ₹{booking.pricePerKm as number}/km × ~{booking.estimatedKm as number} km</p></>)}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"><span className="text-gray-600 font-medium">Total Amount</span><span className="text-2xl font-bold text-blue-700">₹{(booking.totalPrice as number).toLocaleString()}</span></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Your Details</h3>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="pl-10 rounded-lg" /></div>{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}</div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit phone number" className="pl-10 rounded-lg" /></div>{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}</div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10 rounded-lg" /></div>{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}</div>
              <Button onClick={handleConfirm} className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-base font-semibold mt-2">Confirm Booking</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== DASHBOARD PAGE ====================
type TabType = "all" | "hotel" | "cab";
const statusColors: Record<string, string> = { Confirmed: "bg-green-100 text-green-700 border-green-200", Pending: "bg-yellow-100 text-yellow-700 border-yellow-200", Completed: "bg-blue-100 text-blue-700 border-blue-200", Cancelled: "bg-red-100 text-red-700 border-red-200" };

function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const filtered = activeTab === "all" ? myBookings : myBookings.filter((b) => b.type === activeTab);
  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [{ key: "all", label: "All Bookings", icon: null }, { key: "hotel", label: "Hotels", icon: <Hotel className="w-4 h-4" /> }, { key: "cab", label: "Cabs", icon: <Car className="w-4 h-4" /> }];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">My Bookings</h1>
      <p className="text-gray-500 mb-8">Track and manage all your travel bookings</p>
      <div className="flex gap-2 mb-8">{tabs.map((tab) => (<button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.key ? "bg-blue-700 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{tab.icon}{tab.label}</button>))}</div>
      {filtered.length > 0 ? (
        <div className="space-y-4">{filtered.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${b.type === "hotel" ? "bg-blue-100" : "bg-amber-100"}`}>{b.type === "hotel" ? <Hotel className="w-5 h-5 text-blue-600" /> : <Car className="w-5 h-5 text-amber-600" />}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{b.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{b.details}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500"><span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{b.date}</span><span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />{b.price.toLocaleString()}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end"><Badge variant="outline" className={`${statusColors[b.status]} font-medium text-xs px-3 py-1`}>{b.status}</Badge><span className="text-xs text-gray-400">{b.id}</span></div>
            </div>
          </div>
        ))}</div>
      ) : (<div className="text-center py-20"><p className="text-gray-500 text-lg">No bookings found in this category.</p></div>)}
    </div>
  );
}

// ==================== MAIN EXPORT (ROUTER SWITCH) ====================
export default function AppPage() {
  const location = useRouterLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path === "/") return <HomePage />;
    if (path === "/hotels" && !useParams) return <HotelListingPage />;
    if (path === "/cabs") return <CabBookingPage />;
    if (path === "/booking-summary") return <BookingSummaryPage />;
    if (path === "/dashboard") return <DashboardPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {renderContent()}
      <Footer />
    </div>
  );
}

// Sub-exports for router
export { HotelListingPage, HotelDetailsPage, CabBookingPage, BookingSummaryPage, DashboardPage, HomePage, Navbar, Footer };