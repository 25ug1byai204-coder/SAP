export const shipments = [
  {
    id: "SH001", origin: "Bengaluru", destination: "Mumbai", route: "BLR → BOM",
    supplier: "Vardhan Components", carrier: "BlueDart Freight", mode: "Road",
    status: "On track", risk: 28, eta: "09 Nov · 16:40", progress: 54,
    distance: "984 km", impact: 0, updated: "8 min ago",
    reason: "Baseline conditions are stable. A rainfall scenario is available for this corridor.",
    factors: [
      { label: "Weather exposure", value: "Low", tone: "good" },
      { label: "Supplier reliability", value: "94%", tone: "good" },
      { label: "Route variance", value: "+12 min", tone: "neutral" },
    ],
  },
  {
    id: "SH014", origin: "Chennai", destination: "Hyderabad", route: "MAA → HYD",
    supplier: "Aster Electronics", carrier: "Northstar Logistics", mode: "Road",
    status: "Delayed", risk: 82, eta: "10 Nov · 11:20", progress: 68,
    distance: "626 km", impact: 640000, updated: "4 min ago",
    reason: "A late departure and two missed status updates raise the estimated delay risk.",
    factors: [
      { label: "Status freshness", value: "6.2 hrs", tone: "risk" },
      { label: "Supplier on-time rate", value: "78%", tone: "risk" },
      { label: "Route variance", value: "+3.8 hrs", tone: "risk" },
    ],
  },
  {
    id: "SH022", origin: "Pune", destination: "Delhi", route: "PNQ → DEL",
    supplier: "Meridian Industrial", carrier: "SwiftHaul", mode: "Rail",
    status: "Monitoring", risk: 71, eta: "11 Nov · 08:15", progress: 36,
    distance: "1,472 km", impact: 420000, updated: "12 min ago",
    reason: "A supplier performance signal and longer-than-planned dwell time increase exposure.",
    factors: [
      { label: "Supplier on-time rate", value: "81%", tone: "risk" },
      { label: "Dwell time", value: "+2.1 hrs", tone: "risk" },
      { label: "Weather exposure", value: "Low", tone: "good" },
    ],
  },
  {
    id: "SH031", origin: "Ahmedabad", destination: "Mumbai", route: "AMD → BOM",
    supplier: "Vardhan Components", carrier: "Western Transit Co.", mode: "Road",
    status: "Delayed", risk: 54, eta: "09 Nov · 21:05", progress: 76,
    distance: "523 km", impact: 285000, updated: "18 min ago",
    reason: "A simulated congestion notice near the destination corridor may extend transit time.",
    factors: [
      { label: "Traffic signal", value: "Moderate", tone: "watch" },
      { label: "Supplier reliability", value: "94%", tone: "good" },
      { label: "Route variance", value: "+1.4 hrs", tone: "watch" },
    ],
  },
  {
    id: "SH046", origin: "Kolkata", destination: "Bengaluru", route: "CCU → BLR",
    supplier: "Nexus Packaging", carrier: "Eastline Cargo", mode: "Air",
    status: "In transit", risk: 22, eta: "10 Nov · 06:30", progress: 62,
    distance: "1,563 km", impact: 0, updated: "2 min ago",
    reason: "No current disruption signal. Shipment status is recent and within planned transit.",
    factors: [
      { label: "Status freshness", value: "2 min", tone: "good" },
      { label: "Supplier reliability", value: "97%", tone: "good" },
      { label: "Route variance", value: "-8 min", tone: "good" },
    ],
  },
  {
    id: "SH058", origin: "Nagpur", destination: "Pune", route: "NAG → PNQ",
    supplier: "Aster Electronics", carrier: "SwiftHaul", mode: "Road",
    status: "On track", risk: 46, eta: "10 Nov · 17:50", progress: 43,
    distance: "710 km", impact: 125000, updated: "21 min ago",
    reason: "A moderate supplier signal is present, but current shipment timing remains within plan.",
    factors: [
      { label: "Supplier on-time rate", value: "78%", tone: "watch" },
      { label: "Weather exposure", value: "Low", tone: "good" },
      { label: "Route variance", value: "+34 min", tone: "watch" },
    ],
  },
  {
    id: "SH063", origin: "Mumbai", destination: "Chennai", route: "BOM → MAA",
    supplier: "Meridian Industrial", carrier: "Coastal Link", mode: "Sea",
    status: "Delayed", risk: 63, eta: "12 Nov · 14:10", progress: 28,
    distance: "1,034 km", impact: 370000, updated: "32 min ago",
    reason: "A port-handling delay is included in the illustrative demo feed.",
    factors: [
      { label: "Port signal", value: "Elevated", tone: "watch" },
      { label: "Dwell time", value: "+2.7 hrs", tone: "watch" },
      { label: "Supplier reliability", value: "81%", tone: "watch" },
    ],
  },
  {
    id: "SH071", origin: "Delhi", destination: "Jaipur", route: "DEL → JAI",
    supplier: "Nexus Packaging", carrier: "Northstar Logistics", mode: "Road",
    status: "On track", risk: 18, eta: "09 Nov · 19:25", progress: 82,
    distance: "281 km", impact: 0, updated: "6 min ago",
    reason: "No active disruption signals. Shipment status and route timing are within plan.",
    factors: [
      { label: "Weather exposure", value: "Low", tone: "good" },
      { label: "Supplier reliability", value: "97%", tone: "good" },
      { label: "Route variance", value: "-16 min", tone: "good" },
    ],
  },
];

export const suppliers = [
  { id: "SUP-01", name: "Vardhan Components", category: "Electronics", location: "Bengaluru, IN", score: 94, shipments: 18, onTime: 94, trend: "up", status: "Stable" },
  { id: "SUP-02", name: "Aster Electronics", category: "Components", location: "Chennai, IN", score: 78, shipments: 12, onTime: 78, trend: "down", status: "Watch" },
  { id: "SUP-03", name: "Meridian Industrial", category: "Industrial", location: "Pune, IN", score: 81, shipments: 15, onTime: 81, trend: "down", status: "Watch" },
  { id: "SUP-04", name: "Nexus Packaging", category: "Packaging", location: "Kolkata, IN", score: 97, shipments: 9, onTime: 97, trend: "up", status: "Stable" },
];

export const alerts = [
  { id: "ALT-2401", title: "Heavy rainfall scenario · Mumbai corridor", detail: "Illustrative event intersects the Bengaluru → Mumbai route.", time: "12 min ago", level: "High", source: "Simulated", shipment: "SH001" },
  { id: "ALT-2398", title: "Supplier performance below threshold", detail: "Aster Electronics on-time delivery is 78% in the demo snapshot.", time: "34 min ago", level: "High", source: "Demo data", shipment: "SH014" },
  { id: "ALT-2394", title: "Port handling delay · Mumbai", detail: "An illustrative handling notice may affect one shipment.", time: "1 hr ago", level: "Medium", source: "Demo data", shipment: "SH063" },
];

export const riskTrend = [
  { day: "Mon", risk: 24, baseline: 19 },
  { day: "Tue", risk: 31, baseline: 22 },
  { day: "Wed", risk: 27, baseline: 21 },
  { day: "Thu", risk: 42, baseline: 25 },
  { day: "Fri", risk: 36, baseline: 28 },
  { day: "Sat", risk: 49, baseline: 31 },
  { day: "Sun", risk: 44, baseline: 34 },
];

export const activity = [
  { time: "09:42", title: "SH014 risk moved to High", detail: "Supplier performance and stale status", tone: "risk" },
  { time: "09:18", title: "Rainfall scenario added", detail: "Bengaluru → Mumbai corridor · simulated", tone: "blue" },
  { time: "08:56", title: "SH046 status refreshed", detail: "Carrier update · 2 minutes ago", tone: "good" },
];

export const routeOptions = [
  { name: "Current plan", via: "Bengaluru → Mumbai", time: "18h 20m", cost: "₹42,800", delay: "Baseline", badge: "Recommended", type: "current" },
  { name: "Route option A", via: "Via Hubballi · illustrative", time: "20h 05m", cost: "₹46,200", delay: "+1h 45m", badge: "Lower exposure", type: "alternate" },
  { name: "Priority transfer", via: "Air freight · estimate only", time: "5h 40m", cost: "₹1,18,000", delay: "−12h 40m", badge: "Fastest", type: "priority" },
];

export const distribution = [
  { name: "Low", value: 3, color: "#41d6a3" },
  { name: "Medium", value: 3, color: "#f2b75b" },
  { name: "High", value: 2, color: "#ff6e75" },
];

export const formatRupees = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
