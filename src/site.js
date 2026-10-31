import { alerts, distribution, formatRupees, riskTrend, routeOptions, shipments, suppliers } from "./data.js";

const root = document.getElementById("root");
const paths = {
  shield: '<path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  overview: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="8" height="7" rx="1.5"/>',
  package: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.5 7.5 4 7.5-4M12 12v9"/>',
  cloud: '<path d="M20 15.5a4.5 4.5 0 0 0-3.8-4.45A6 6 0 0 0 4.5 12a3.5 3.5 0 0 0 .5 7h14a3 3 0 0 0 1-3.5Z"/><path d="m9 15 1.5 1.5L14 13"/>',
  supplier: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M7 7V4h10v3M8 11h2m4 0h2m-8 4h2m4 0h2M10 21v-3h4v3"/>',
  flask: '<path d="M9 3h6m-5 0v6l-5.5 9.2A1.8 1.8 0 0 0 6 21h12a1.8 1.8 0 0 0 1.5-2.8L14 9V3"/><path d="M8 15h8"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h5a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/>',
  report: '<path d="M7 3h8l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M15 3v6h5M9 14h6m-6 3h6"/>',
  bot: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4m-4 5h.01M16 12h.01M8 16h8"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.5 1.5c-1.2 1.4-2.1 1.4-2.1 3m0 3h.01"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  down: '<path d="m7 10 5 5 5-5"/>',
  activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  alert: '<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 14 4-5m-8 9h8"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 19v2h16v-2"/>',
  plus: '<path d="M12 5v14m-7-7h14"/>',
  filter: '<path d="M4 6h16M7 12h10m-7 6h4"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-7.5a4 4 0 0 1 0 7.8M20 21v-2a4 4 0 0 0-3-3.9"/>',
  truck: '<path d="M3 6h12v12H3zM15 10h4l3 4v4h-7z"/><circle cx="7.5" cy="18.5" r="2"/><circle cx="18.5" cy="18.5" r="2"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
};
const state = {
  page: "overview", query: "", filter: "All shipments", drawer: null,
  notifications: false, sidebar: false, scenario: "heavy_rainfall",
  intensity: 74, result: null, zoom: 1,
  messages: [{ role: "assistant", text: "Hi Alex. I can look up shipment status, explain sample risk signals, and compare illustrative recovery options. I’ll show the tools I use and call out when data is simulated or unavailable.", tools: [] }],
};

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const icon = (name, size = 16) => '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.activity) + "</svg>";
const riskTone = (risk) => risk >= 70 ? "high" : risk >= 40 ? "medium" : "low";
const riskName = (risk) => riskTone(risk)[0].toUpperCase() + riskTone(risk).slice(1);
const findShipment = (id) => shipments.find((shipment) => shipment.id === id);

function riskPill(risk, label) {
  return '<span class="risk-pill risk-' + riskTone(risk) + '"><span class="risk-dot"></span>' + esc(label || riskName(risk)) + "</span>";
}
function statusPill(status) {
  const tone = status === "Delayed" ? "status-delayed" : status === "Monitoring" ? "status-monitoring" : status === "On track" ? "status-good" : "status-transit";
  return '<span class="status-pill ' + tone + '"><span class="status-dot"></span>' + esc(status) + "</span>";
}
function sectionTitle(eyebrow, title, action, page, iconName) {
  return '<div class="section-title"><div class="section-title-main">' + (iconName ? '<span class="section-icon">' + icon(iconName, 16) + "</span>" : "") +
    '<div><div class="eyebrow">' + esc(eyebrow) + '</div><h2>' + esc(title) + "</h2></div></div>" +
    (action ? '<button class="link-button" data-page="' + esc(page) + '">' + esc(action) + icon("chevron", 14) + "</button>" : "") + "</div>";
}
function button(label, iconName, action, type = "secondary") {
  return '<button class="button button-' + type + '" data-action="' + action + '">' + icon(iconName, 15) + label + "</button>";
}
function navItem(item) {
  return '<button class="nav-item ' + (state.page === item.page ? "nav-active" : "") + '" data-page="' + item.page + '">' + icon(item.icon, 17) + "<span>" + item.label + "</span>" +
    (item.count ? '<span class="nav-count">' + item.count + "</span>" : "") + (item.badge ? '<span class="nav-badge">' + item.badge + "</span>" : "") + "</button>";
}
function sidebar() {
  const work = [
    { label: "Overview", icon: "overview", page: "overview" },
    { label: "Shipments", icon: "package", page: "shipments", count: "8" },
    { label: "Disruption intelligence", icon: "cloud", page: "intelligence", badge: "3" },
    { label: "Supplier network", icon: "supplier", page: "suppliers" },
  ];
  const planning = [
    { label: "What-if simulator", icon: "flask", page: "simulator" },
    { label: "Recovery planner", icon: "route", page: "recovery" },
    { label: "Reports & analytics", icon: "report", page: "reports" },
  ];
  return (state.sidebar ? '<button class="sidebar-scrim" data-action="close-sidebar" aria-label="Close navigation"></button>' : "") +
    '<aside class="sidebar ' + (state.sidebar ? "sidebar-open" : "") + '">' +
    '<button class="brand-lockup" data-page="overview"><span class="brand-mark">' + icon("shield", 21) + '</span><span class="brand-copy"><strong>SupplyShield<span>AI</span></strong><small>SUPPLY CHAIN INTELLIGENCE</small></span></button>' +
    '<div class="workspace-select"><span class="workspace-avatar">N</span><span class="workspace-copy"><strong>Northstar Group</strong><small>Demo workspace</small></span>' + icon("down", 14) + "</div>" +
    '<div class="nav-label">WORKSPACE</div><nav class="nav-list">' + work.map(navItem).join("") + "</nav>" +
    '<div class="nav-label nav-label-spaced">PLANNING</div><nav class="nav-list">' + planning.map(navItem).join("") + "</nav>" +
    '<div class="sidebar-assistant"><div class="assistant-glow">' + icon("spark", 15) + '</div><div><strong>Ask SupplyShield</strong><p>Get a grounded answer from your shipment data.</p></div><button data-page="assistant" aria-label="Open assistant">' + icon("arrow", 15) + "</button></div>" +
    '<div class="sidebar-footer"><div class="connection-row"><span class="connection-indicator"></span><span>Demo environment</span><span class="connection-label">LOCAL</span></div><button class="nav-item sidebar-settings" data-page="overview">' + icon("supplier", 16) + "<span>Settings</span></button>" +
    '<button class="profile-row"><span class="profile-avatar">A</span><span><strong>Alex</strong><small>Supply chain analyst</small></span><span>···</span></button></div></aside>';
}
const pageTitles = { overview: "Overview", shipments: "Shipments", intelligence: "Disruption intelligence", suppliers: "Supplier network", simulator: "What-if simulator", recovery: "Recovery planner", reports: "Reports & analytics", assistant: "AI supply chain assistant" };
function header() {
  return '<header class="topbar"><button class="mobile-menu icon-button" data-action="toggle-sidebar" aria-label="Open navigation">☰</button><div class="breadcrumb"><span>SupplyShield</span>' + icon("chevron", 14) + "<strong>" + pageTitles[state.page] + "</strong></div>" +
    '<div class="topbar-actions"><label class="global-search">' + icon("search", 16) + '<input data-global-search value="' + esc(state.query) + '" placeholder="Search shipments, suppliers..." /><kbd>⌘ K</kbd></label><span class="topbar-divider"></span>' +
    '<button class="icon-button notification-button ' + (state.notifications ? "icon-button-active" : "") + '" data-action="notifications" aria-label="Notifications">' + icon("bell", 18) + "<i></i></button><span class=\"topbar-divider topbar-divider-small\"></span><button class=\"help-button\" aria-label=\"Help\">" + icon("help", 17) + "</button></div></header>";
}
function intro(title, description, actions) {
  return '<div class="page-intro"><div><div class="page-kicker"><span class="kicker-line"></span> SUPPLY CHAIN CONTROL TOWER</div><h1>' + title + "</h1><p>" + description + '</p></div><div class="page-actions">' + (actions || "") + "</div></div>";
}
function shipmentTable(rows, compact = false) {
  const body = rows.map((item) => '<tr data-shipment="' + item.id + '" tabindex="0"><td><div class="shipment-id-cell"><span class="shipment-mini-icon">' + icon("truck", 14) + '</span><span><strong>' + item.id + "</strong><small>" + item.mode + " · " + item.distance + '</small></span></div></td>' +
    '<td><div class="route-cell"><span>' + item.origin + "</span>" + icon("arrow", 12) + "<span>" + item.destination + '</span></div><small class="route-code">' + item.route + "</small></td><td><span class=\"supplier-cell\">" + item.supplier + "</span></td>" +
    '<td><div class="risk-score-cell"><div class="risk-track"><i class="risk-fill risk-fill-' + riskTone(item.risk) + '" style="width:' + item.risk + '%"></i></div><strong>' + item.risk + "%</strong></div></td><td>" + statusPill(item.status) + "</td>" +
    '<td><span class="eta-cell">' + item.eta + '</span><small class="updated-cell">' + item.updated + '</small></td><td><button class="row-more" data-shipment="' + item.id + '">' + icon("chevron", 15) + "</button></td></tr>").join("");
  return '<div class="table-scroll ' + (compact ? "table-compact" : "") + '"><table class="shipment-table"><thead><tr><th>SHIPMENT</th><th>ROUTE</th><th>SUPPLIER</th><th>RISK SCORE</th><th>STATUS</th><th>ETA</th><th></th></tr></thead><tbody>' + (body || '<tr><td colspan="7" class="empty-table">No shipments match this search.</td></tr>') + "</tbody></table></div>";
}
function mapView(compact = false) {
  return '<div class="route-map ' + (compact ? "route-map-compact" : "") + '"><div class="map-grid"></div><svg class="india-map" style="transform:scale(' + state.zoom + ')" viewBox="0 0 720 390" role="img" aria-label="Schematic Bengaluru to Mumbai route">' +
    '<path d="M153 53 L225 35 L274 55 L315 45 L347 73 L395 73 L429 99 L474 98 L514 121 L548 112 L581 139 L575 165 L597 189 L579 212 L595 242 L562 260 L550 297 L520 304 L504 333 L476 325 L461 356 L437 348 L417 321 L399 308 L390 278 L369 255 L352 229 L330 212 L305 195 L278 176 L251 160 L225 142 L195 132 L176 110 L147 100 L133 77Z" fill="#142a37" stroke="#294452" stroke-width="1.5"/>' +
    '<path d="M235 64 C286 89 314 125 368 140 S451 188 497 216M185 100 C249 120 287 155 335 181 S419 224 523 275M267 65 C280 123 291 160 333 205 S373 267 417 328M161 112 C220 145 267 166 331 187 S426 200 565 177" class="map-road"/>' +
    '<path d="M373 275 C359 247 347 225 332 205 C317 185 306 165 295 142" class="route-line"/><path d="M373 275 C348 257 331 230 323 202 C317 180 307 163 295 142" class="route-pulse"/>' +
    '<circle cx="373" cy="275" r="11" class="route-halo"/><circle cx="373" cy="275" r="5" class="route-point-origin"/><circle cx="295" cy="142" r="11" class="route-halo route-halo-alert"/><circle cx="295" cy="142" r="5" class="route-point-destination"/><circle cx="337" cy="219" r="3" class="vehicle-dot"/>' +
    '<text x="384" y="280" class="map-label">BENGALURU</text><text x="253" y="133" class="map-label">MUMBAI</text><text x="340" y="203" class="map-label map-label-small">PUNE</text><text x="250" y="227" class="map-label map-label-muted">KARNATAKA</text><text x="442" y="166" class="map-label map-label-muted">MAHARASHTRA</text>' +
    '</svg><div class="map-label-chip"><span class="live-dot"></span>Route exposure<span class="chip-divider"></span>2 signals</div><div class="map-control-stack"><button data-action="zoom-in">+</button><button data-action="zoom-out">−</button><button data-action="zoom-reset">⌖</button></div>' +
    '<button class="map-marker-card" data-shipment="SH001"><span class="map-marker-icon">' + icon("pin", 13) + '</span><span><strong>SH001</strong><small>Bengaluru → Mumbai</small></span><span class="map-marker-risk">28%</span></button><div class="map-attribution">Schematic route view · Demo data</div></div>';
}
function trendChart() {
  const W = 700, H = 175, left = 32, top = 10, cw = W - 42, ch = H - 32;
  const point = (i, v) => ({ x: left + i / (riskTrend.length - 1) * cw, y: top + ch - v / 60 * ch });
  const line = (key) => riskTrend.map((d, i) => { const p = point(i, d[key]); return (i ? "L" : "M") + p.x + " " + p.y; }).join(" ");
  const path = line("risk"), first = point(0, riskTrend[0].risk), last = point(riskTrend.length - 1, riskTrend[riskTrend.length - 1].risk);
  const area = path + " L" + last.x + " " + (top + ch) + " L" + first.x + " " + (top + ch) + " Z";
  const grid = [0, 20, 40, 60].map((value) => { const y = top + ch - value / 60 * ch; return '<g><line x1="' + left + '" y1="' + y + '" x2="' + (W - 6) + '" y2="' + y + '" stroke="#1c303b"/><text x="1" y="' + (y + 3) + '" fill="#768a97" font-size="9">' + value + '%</text></g>'; }).join("");
  const dots = riskTrend.map((d, i) => { const p = point(i, d.risk); return '<g><circle cx="' + p.x + '" cy="' + p.y + '" r="4" fill="#42c7f6" stroke="#101e28" stroke-width="2"><title>' + d.day + " " + d.risk + '% network risk</title></circle><text x="' + p.x + '" y="' + (H - 5) + '" text-anchor="middle" fill="#768a97" font-size="9">' + d.day + "</text></g>"; }).join("");
  return '<svg class="risk-chart-svg" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" role="img" aria-label="Illustrative weekly disruption risk trend"><defs><linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#31bdf4" stop-opacity=".2"/><stop offset="100%" stop-color="#31bdf4" stop-opacity="0"/></linearGradient></defs>' + grid + '<path d="' + area + '" fill="url(#riskFill)"/><path d="' + line("baseline") + '" fill="none" stroke="#60717c" stroke-width="1.5" stroke-dasharray="4 5"/><path d="' + path + '" fill="none" stroke="#42c7f6" stroke-width="2.5"/>' + dots + "</svg>";
}
function metric(label, value, change, symbol, color, note, page) {
  return '<button class="metric-card" data-page="' + page + '"><div class="metric-top"><span class="metric-icon ' + color + '">' + icon(symbol, 17) + '</span><span class="metric-menu">···</span></div><div class="metric-label">' + label + '</div><div class="metric-value-row"><strong>' + value + '</strong><span class="metric-change">' + change + '</span></div><div class="metric-note">' + note + "</div></button>";
}
function alertRow(item) {
  return '<button class="alert-row" data-shipment="' + item.shipment + '"><span class="alert-symbol alert-symbol-' + item.level.toLowerCase() + '">' + icon(item.level === "High" ? "alert" : "cloud", 16) + '</span><span class="alert-copy"><strong>' + esc(item.title) + '</strong><small>' + esc(item.detail) + '</small><em>' + item.source + '</em></span><span class="alert-time">' + item.time + "</span></button>";
}
function supplierRow(supplier) {
  const initials = supplier.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return '<button class="supplier-health-row" data-page="suppliers"><span class="supplier-avatar">' + initials + '</span><span class="supplier-health-name"><strong>' + supplier.name + '</strong><small>' + supplier.shipments + " shipments · " + supplier.location + '</small></span><span class="supplier-health-score"><strong>' + supplier.score + '%</strong><small>on-time</small></span><span class="supplier-trend ' + (supplier.trend === "up" ? "trend-up" : "trend-down") + '">' + icon("activity", 13) + "</span></button>";
}
function overviewPage() {
  const high = shipments.filter((item) => item.risk >= 70).length, delayed = shipments.filter((item) => item.status === "Delayed").length;
  const exposure = shipments.reduce((sum, item) => sum + item.impact, 0);
  const low = distribution[0].value / shipments.length * 100, mid = low + distribution[1].value / shipments.length * 100;
  const donut = "conic-gradient(from 0deg,#41d6a3 0% " + low + "%,#f2b75b " + low + "% " + mid + "%,#ff6e75 " + mid + "% 100%)";
  const attention = shipments.filter((item) => item.risk >= 50).slice(0, 4);
  return intro("Good morning, Alex", "Here’s what’s happening across your supply chain today.", button("Export report", "download", "export") + button("Run a scenario", "plus", "go-simulator", "primary")) +
    '<div class="snapshot-strip"><span class="snapshot-dot"></span><span>Demo snapshot</span><i></i>Updated just now<i></i><span>8 shipments · 4 suppliers</span><button data-page="shipments">View data source ' + icon("chevron", 12) + "</button></div>" +
    '<div class="metric-grid">' + metric("Total shipments", "08", "12% this week", "package", "blue", "Across active transport lanes", "shipments") + metric("Active disruptions", "03", "2 new today", "alert", "orange", "Signals requiring attention", "intelligence") + metric("High-risk shipments", String(high).padStart(2, "0"), "−1 vs. yesterday", "activity", "red", "Risk score above 70%", "shipments") + metric("Delayed shipments", String(delayed).padStart(2, "0"), "2.4 hrs avg. delay", "clock", "purple", "Estimated from demo status", "shipments") + metric("Estimated exposure", formatRupees(exposure), "Illustrative", "gauge", "cyan", "Based on demo shipment values", "reports") + "</div>" +
    '<div class="analytics-grid"><section class="panel chart-panel"><div class="panel-heading"><div><div class="panel-overline">RISK MONITORING</div><h2>Disruption risk trend</h2><p>Average shipment risk over the last 7 days</p></div><button class="select-button">Last 7 days ' + icon("down", 13) + '</button></div><div class="chart-legend"><span><i class="legend-risk"></i>Network risk</span><span><i class="legend-baseline"></i>Baseline</span><span class="chart-demo-label"><span class="tiny-demo-dot"></span>Demo data</span></div><div class="risk-chart">' + trendChart() + "</div></section>" +
    '<section class="panel distribution-panel"><div class="panel-heading panel-heading-tight"><div><div class="panel-overline">CURRENT SNAPSHOT</div><h2>Risk distribution</h2><p>Across 8 demo shipments</p></div></div><div class="donut-wrap"><div class="donut-ring" style="background:' + donut + '"></div><div class="donut-center"><strong>08</strong><span>SHIPMENTS</span></div></div><div class="distribution-legend">' + distribution.map((item) => '<div><span class="distribution-name"><i style="background:' + item.color + '"></i>' + item.name + '</span><strong>' + item.value + '<small> shipments</small></strong></div>').join("") + "</div></section></div>" +
    '<div class="content-grid content-grid-map"><section class="panel shipment-panel">' + sectionTitle("CONTROL TOWER", "Shipments needing attention", "View all shipments", "shipments", "package") + shipmentTable(attention, true) +
    '<div class="panel-footnote"><span class="demo-pill"><span></span>DEMO DATA</span><span>Risk score combines the sample signal set.</span></div></section><section class="panel network-panel">' + sectionTitle("ROUTE MONITOR", "Network exposure", "Open map", "shipments", "route") + mapView(true) +
    '<div class="route-summary"><span class="route-summary-dot"></span><span><strong>Bengaluru ' + icon("arrow", 12) + ' Mumbai</strong><small>SH001 · Schematic route · Simulated position</small></span>' + riskPill(28) + "</div></section></div>" +
    '<div class="content-grid lower-grid"><section class="panel alerts-panel">' + sectionTitle("NEEDS YOUR ATTENTION", "Recent alerts", "View intelligence", "intelligence", "alert") + '<div class="alert-list">' + alerts.map(alertRow).join("") + '</div><div class="panel-bottom-link"><button data-page="intelligence">Review all signals ' + icon("arrow", 13) + '</button><span>Illustrative data</span></div></section><section class="panel supplier-health-panel">' + sectionTitle("SUPPLIER HEALTH", "Reliability overview", "Open network", "suppliers", "supplier") + '<div class="supplier-health-list">' + suppliers.map(supplierRow).join("") + "</div></section></div>";
}
function shipmentsPage() {
  const filtered = shipments.filter((item) => {
    const text = (item.id + " " + item.origin + " " + item.destination + " " + item.supplier + " " + item.carrier).toLowerCase();
    return text.includes(state.query.toLowerCase()) && (state.filter === "All shipments" || (state.filter === "High risk" ? item.risk >= 70 : item.status === "Delayed"));
  });
  const filters = ["All shipments", "High risk", "Delayed"];
  return intro("Shipment control tower", "Every active shipment, with its current status and risk signals.", button("Filters", "filter", "noop") + button("Add shipment", "plus", "noop", "primary")) +
    '<div class="shipment-summary-row"><div><strong>8</strong><span>Active shipments</span></div><div><strong>3</strong><span>Delayed</span></div><div><strong>2</strong><span>High risk</span></div><div><strong>4</strong><span>Transport modes</span></div><div class="summary-demo">' + icon("database", 13) + "Demo dataset · refreshed now</div></div>" +
    '<section class="panel full-table-panel"><div class="table-toolbar"><div class="filter-tabs">' + filters.map((filter) => '<button class="filter-tab ' + (state.filter === filter ? "filter-tab-active" : "") + '" data-filter="' + filter + '">' + filter + (filter === "High risk" ? "<span>2</span>" : "") + "</button>").join("") +
    '</div><label class="table-search">' + icon("search", 14) + '<input data-table-search value="' + esc(state.query) + '" placeholder="Search by ID, route, supplier..." />' + icon("filter", 14) + "</label></div>" + shipmentTable(filtered) +
    '<div class="table-footer"><span>Showing <strong>' + filtered.length + "</strong> of 8 demo shipments</span><div><button disabled>Previous</button><button class=\"pagination-active\">1</button><button disabled>Next</button></div></div></section>" +
    '<div class="notice-card">' + icon("shield", 16) + '<span><strong>About these risk scores</strong> Risk scores use illustrative demo data and are not live predictions.</span></div>';
}
function intelligencePage() {
  const signals = [
    ["cloud", "Weather exposure", "1 signal", "Rainfall scenario · Mumbai corridor", "Simulated", "blue", "Updated 12 min ago"],
    ["truck", "Transport & traffic", "1 signal", "Congestion notice · Ahmedabad–Mumbai", "Demo data", "amber", "Updated 18 min ago"],
    ["supplier", "Supplier performance", "2 suppliers", "Below preferred on-time threshold", "Demo data", "red", "Snapshot · 09:30"],
    ["package", "Inventory coverage", "Unavailable", "No verified inventory feed connected", "Not connected", "muted", "Connect a source to view"],
    ["route", "Port & logistics", "1 signal", "Illustrative handling delay · Mumbai", "Demo data", "amber", "Updated 1 hr ago"],
    ["activity", "Market & geopolitical", "Unavailable", "No verified provider configured", "Not connected", "muted", "Connect a source to view"],
  ];
  return intro("Disruption intelligence", "A unified view of signals that can affect your shipments and suppliers.", '<button class="button button-secondary">' + icon("clock", 14) + "Last 7 days " + icon("down", 13) + "</button>") +
    '<div class="signal-notice"><span class="signal-notice-icon">' + icon("activity", 16) + '</span><div><strong>Demo signal environment</strong><p>External feeds are not connected. Signals below are sample or simulated.</p></div><span class="demo-pill"><span></span>DEMO MODE</span></div>' +
    '<div class="signal-grid">' + signals.map((s) => '<section class="panel signal-card"><div class="signal-icon signal-' + s[5] + '">' + icon(s[0], 19) + '</div><div class="signal-card-top"><span class="panel-overline">INTELLIGENCE SOURCE</span><button class="row-more">···</button></div><h3>' + s[1] + '</h3><strong class="signal-count">' + s[2] + '</strong><p>' + s[3] + '</p><div class="signal-card-foot"><span class="source-status source-' + s[5] + '">' + s[4] + '</span><small>' + s[6] + "</small></div></section>").join("") + "</div>" +
    '<section class="panel intelligence-events">' + sectionTitle("SIGNAL CORRELATION", "Events and potentially affected shipments", "Open shipments", "shipments", "activity") + '<div class="event-list">' +
    alerts.map((item) => '<button class="event-row" data-shipment="' + item.shipment + '"><span class="event-rail event-' + item.level.toLowerCase() + '"></span><span class="event-time">' + item.time + '</span><span class="event-main"><strong>' + item.title + '</strong><small>' + item.detail + '</small></span><span class="event-source">' + item.source + '</span><span class="event-affected">' + icon("package", 13) + item.shipment + '</span>' + icon("chevron", 15) + "</button>").join("") + "</div></section>";
}
function suppliersPage() {
  const average = Math.round(suppliers.reduce((sum, item) => sum + item.score, 0) / suppliers.length * 10) / 10;
  const card = (supplier) => '<section class="panel supplier-card"><div class="supplier-card-head"><span class="supplier-avatar supplier-avatar-large">' + supplier.name.split(" ").map((part) => part[0]).slice(0, 2).join("") + '</span><button class="row-more">···</button></div><span class="supplier-state ' + (supplier.score < 85 ? "supplier-state-watch" : "supplier-state-good") + '"><i></i>' + supplier.status + '</span><h3>' + supplier.name + '</h3><p>' + supplier.category + " · " + supplier.location + '</p><div class="supplier-score-line"><span>On-time delivery</span><strong>' + supplier.onTime + '%</strong></div><div class="supplier-score-track"><i class="' + (supplier.score < 85 ? "score-watch" : "") + '" style="width:' + supplier.score + '%"></i></div><div class="supplier-card-stats"><span><strong>' + supplier.shipments + '</strong> linked shipments</span><span class="' + (supplier.trend === "up" ? "trend-up" : "trend-down") + '">' + icon("activity", 13) + (supplier.trend === "up" ? "Improving" : "Needs review") + "</span></div></section>";
  return intro("Supplier network", "Understand reliability and where delivery dependencies are concentrated.", button("Add supplier", "plus", "noop", "primary")) +
    '<div class="supplier-overview-grid"><div class="supplier-summary-card"><span class="summary-icon summary-blue">' + icon("supplier", 17) + '</span><span>Tracked suppliers</span><strong>04</strong><small>Across the demo network</small></div><div class="supplier-summary-card"><span class="summary-icon summary-green">' + icon("activity", 17) + '</span><span>Average on-time delivery</span><strong>' + average + '%</strong><small>Illustrative performance</small></div><div class="supplier-summary-card"><span class="summary-icon summary-amber">' + icon("alert", 17) + '</span><span>Suppliers to watch</span><strong>02</strong><small>Below 85% threshold</small></div></div>' +
    '<div class="supplier-card-grid">' + suppliers.map(card).join("") + '</div><section class="panel supplier-table-panel">' + sectionTitle("PERFORMANCE", "Supplier reliability", "", "", "supplier") +
    '<div class="supplier-table-scroll"><table class="supplier-table"><thead><tr><th>SUPPLIER</th><th>CATEGORY</th><th>ON-TIME RATE</th><th>SHIPMENTS</th><th>RISK STATUS</th></tr></thead><tbody>' +
    suppliers.map((supplier) => '<tr><td><div class="supplier-table-name"><span class="supplier-avatar">' + supplier.name.split(" ").map((part) => part[0]).slice(0, 2).join("") + '</span><span><strong>' + supplier.name + '</strong><small>' + supplier.id + '</small></span></div></td><td>' + supplier.category + '</td><td><strong>' + supplier.onTime + '%</strong><div class="tiny-progress"><i class="' + (supplier.score < 85 ? "score-watch" : "") + '" style="width:' + supplier.onTime + '%"></i></div></td><td>' + supplier.shipments + '</td><td><span class="source-status ' + (supplier.score < 85 ? "source-amber" : "source-blue") + '">' + supplier.status + "</span></td></tr>").join("") +
    '</tbody></table></div></section><p class="source-footnote">' + icon("database", 13) + " Sample metrics only. Supplier capacity and alternatives are not verified.</p>";
}
function simulatorPage() {
  const options = [
    ["heavy_rainfall", "cloud", "Heavy rainfall", "Severe precipitation along a shipment corridor"],
    ["port_closure", "route", "Port closure", "Temporary closure at a destination port"],
    ["traffic_congestion", "truck", "Traffic congestion", "Reduced road speed on a route segment"],
    ["supplier_failure", "supplier", "Supplier failure", "A supplier cannot fulfill a planned dispatch"],
    ["fuel_price_increase", "activity", "Fuel price increase", "Higher transport costs for exposed shipments"],
    ["inventory_shortage", "package", "Inventory shortage", "Insufficient available stock at a linked location"],
  ];
  const affectedMap = { heavy_rainfall: ["SH001", "SH031"], port_closure: ["SH063"], traffic_congestion: ["SH001", "SH031", "SH071"], supplier_failure: ["SH014", "SH058"], fuel_price_increase: ["SH001", "SH031", "SH058"], inventory_shortage: ["SH022", "SH063"] };
  const result = state.result, affected = result ? result.affected : affectedMap[state.scenario];
  const selected = options.find((item) => item[0] === state.scenario);
  return intro("What-if simulator", "Explore possible disruptions without changing actual shipment records.", '<span class="demo-pill"><span></span>SIMULATION ONLY</span>') +
    '<div class="simulator-layout"><section class="panel simulator-config">' + sectionTitle("SCENARIO BUILDER", "Configure a disruption", "", "", "flask") +
    '<div class="field-label">Disruption scenario</div><div class="scenario-select-grid">' + options.map((item) => '<button class="scenario-option ' + (state.scenario === item[0] ? "scenario-selected" : "") + '" data-scenario="' + item[0] + '"><span class="scenario-option-icon">' + icon(item[1], 16) + '</span><span><strong>' + item[2] + '</strong><small>' + item[3] + '</small></span>' + (state.scenario === item[0] ? icon("check", 14) : "") + "</button>").join("") + "</div>" +
    '<div class="form-row"><label><span class="field-label">Affected scope</span><select><option>Bengaluru → Mumbai corridor</option><option>All demo shipments</option></select></label><label><span class="field-label">Time window</span><select><option>Next 24 hours</option><option>Next 48 hours</option></select></label></div>' +
    '<div class="intensity-header"><label class="field-label">Scenario intensity</label><strong>' + state.intensity + '% <small>Severe</small></strong></div><input class="intensity-slider" data-intensity type="range" min="20" max="100" value="' + state.intensity + '"><div class="range-labels"><span>Low impact</span><span>High impact</span></div>' +
    '<div class="simulation-notice">' + icon("flask", 15) + "<span>This creates a separate scenario record. Actual shipment and event records are not modified.</span></div><button class=\"button button-primary run-simulation\" data-action=\"run-simulation\">" + icon("activity", 15) + "Run simulation" + icon("arrow", 14) + "</button></section>" +
    '<div class="simulator-results"><section class="panel scenario-summary-panel"><div class="scenario-summary-head"><div><div class="panel-overline">SCENARIO OUTPUT</div><h2>' + (result ? "Simulation complete" : "Ready to simulate") + '</h2><p>' + (result ? "Compared with the current demo baseline." : "Configure an event to see its potential impact.") + '</p></div><span class="sim-round-icon">' + icon("flask", 18) + '</span></div>' +
    (result ? '<div class="scenario-results-body"><div class="risk-comparison"><div><span>Baseline risk</span><strong>' + result.baseline + '%</strong><small>SH001 · Demo baseline</small></div>' + icon("arrow", 17) + '<div class="scenario-risk-value"><span>Scenario risk</span><strong>' + result.risk + '%</strong><small>Illustrative score</small></div></div><div class="comparison-track"><i style="width:' + result.baseline + '%"></i><i style="width:' + result.risk + '%"></i></div><div class="scenario-facts"><div><span>Potentially affected</span><strong>' + result.affected.length + ' shipments</strong></div><div><span>Estimated delay</span><strong>' + result.delay + '</strong></div><div><span>Estimated exposure</span><strong>' + result.impact + "</strong></div></div></div>" :
      '<div class="scenario-empty"><div class="empty-orbit">' + icon("activity", 20) + '</div><strong>Your scenario results will appear here</strong><span>Risk delta, affected shipments, and estimated impact.</span></div>') +
    (result ? '<div class="scenario-result-foot"><span><span class="tiny-demo-dot"></span>Simulated result · no live prediction updated</span><button data-action="reset-scenario">Reset scenario ' + icon("close", 12) + "</button></div>" : "") + "</section>" +
    '<section class="panel sim-impact-panel">' + sectionTitle("IMPACTED SHIPMENTS", "Potentially affected", "View shipments", "shipments", "package") +
    affected.map((id) => findShipment(id)).filter(Boolean).map((item) => '<div class="impact-shipment-row"><span class="shipment-mini-icon">' + icon("truck", 13) + '</span><span class="impact-route"><strong>' + item.id + " · " + item.origin + " → " + item.destination + '</strong><small>' + item.carrier + " · " + item.mode + '</small></span><span class="impact-score"><strong>' + item.risk + '%</strong><small>current</small></span></div>').join("") +
    '<div class="sim-assumption">' + icon("help", 13) + "<span>" + selected[2] + " impact is illustrative; provider data is not connected.</span></div></section></div></div>";
}
function recoveryPage() {
  return intro("Recovery planner", "Compare possible response paths using available facts and explicit assumptions.", '<span class="demo-pill"><span></span>ILLUSTRATIVE OPTIONS</span>') +
    '<div class="recovery-focus"><div class="recovery-focus-icon">' + icon("truck", 17) + '</div><div><span class="panel-overline">SELECTED SHIPMENT</span><strong>SH001 <span>·</span> Bengaluru → Mumbai</strong><small>On track · baseline risk 28% · simulated tracking</small></div><button class="select-button">Change shipment ' + icon("down", 13) + "</button></div>" +
    '<div class="recovery-top-grid"><section class="panel recovery-map-panel">' + sectionTitle("ROUTE CONTEXT", "Current route") + mapView(false) + '<div class="route-context-note">' + icon("pin", 13) + '<span>Schematic view only. Candidate routes require a configured routing provider.</span></div></section>' +
    '<section class="panel recovery-advice-panel"><div class="advice-icon">' + icon("spark", 17) + '</div><div class="panel-overline">PLANNER SUMMARY</div><h2>Keep options ready</h2><p>SH001 is on track in the demo baseline. If you run the rainfall scenario, review an alternate route estimate and confirm current road conditions with your carrier.</p><div class="advice-separation"></div><div class="advice-points"><div>' + icon("check", 14) + "<span>Baseline ETA is within planned window</span></div><div>" + icon("alert", 14) + "<span>Route feasibility has not been verified</span></div><div>" + icon("help", 14) + "<span>Live traffic and inventory feeds are unavailable</span></div></div>" + button("Run a what-if scenario", "flask", "go-simulator") + "</section></div>" +
    '<section class="panel options-panel"><div class="options-heading">' + sectionTitle("OPTION COMPARISON", "Potential recovery options") + '<span class="option-notice">' + icon("database", 13) + 'Estimates are illustrative demo values</span></div><div class="recovery-table-wrap"><table class="recovery-table"><thead><tr><th>OPTION</th><th>EST. TRANSIT</th><th>EST. COST</th><th>TRADE-OFF</th><th>STATUS</th><th></th></tr></thead><tbody>' +
    routeOptions.map((option) => '<tr><td><div class="option-name"><span class="option-icon option-' + option.type + '">' + icon(option.type === "priority" ? "activity" : "route", 14) + '</span><span><strong>' + option.name + '</strong><small>' + option.via + '</small></span></div></td><td><strong>' + option.time + '</strong></td><td><strong>' + option.cost + '</strong></td><td>' + option.delay + '</td><td><span class="option-badge option-badge-' + option.type + '">' + option.badge + '</span></td><td><button class="button button-small" disabled>' + (option.type === "current" ? "Selected" : "Review") + "</button></td></tr>").join("") +
    '</tbody></table></div><div class="recommendation-disclaimer">' + icon("shield", 13) + "Decision support only. Confirm availability, costs, and capacity before acting.</div></section>";
}
function reportsPage() {
  const total = shipments.reduce((sum, item) => sum + item.impact, 0);
  return intro("Reports & analytics", "Share a clear snapshot of risk, shipments, and supplier performance.", button("Export CSV", "download", "export", "primary")) +
    '<div class="report-summary-strip"><div><span class="summary-icon summary-blue">' + icon("package", 17) + '</span><span><small>SHIPMENTS</small><strong>08</strong></span></div><div><span class="summary-icon summary-red">' + icon("alert", 17) + '</span><span><small>ACTIVE ALERTS</small><strong>03</strong></span></div><div><span class="summary-icon summary-green">' + icon("users", 17) + '</span><span><small>SUPPLIERS</small><strong>04</strong></span></div><div><span class="summary-icon summary-amber">' + icon("gauge", 17) + '</span><span><small>EST. EXPOSURE</small><strong>' + formatRupees(total) + "</strong></span></div></div>" +
    '<div class="report-grid"><section class="panel report-card report-card-wide"><div class="report-card-top"><span class="report-icon report-icon-blue">' + icon("activity", 18) + '</span><span class="source-status source-blue">UPDATED NOW</span></div><h3>Shipment risk summary</h3><p>Risk distribution and current alerts for this demo snapshot.</p><div class="mini-bars">' + distribution.map((item) => '<div><span>' + item.name + '</span><div><i style="width:' + item.value / shipments.length * 100 + '%;background:' + item.color + '"></i></div><strong>' + item.value + "</strong></div>").join("") + '</div><button class="report-action" data-action="export">Download CSV ' + icon("download", 14) + "</button></section>" +
    '<section class="panel report-card"><div class="report-card-top"><span class="report-icon report-icon-purple">' + icon("supplier", 18) + '</span><span class="source-status source-amber">DEMO DATA</span></div><h3>Supplier performance</h3><p>On-time delivery and supplier watchlist with sample counts.</p><div class="report-mini-stat"><strong>87.5%</strong><span>average on-time rate</span></div><button class="report-action" data-page="suppliers">View supplier report ' + icon("arrow", 14) + "</button></section>" +
    '<section class="panel report-card"><div class="report-card-top"><span class="report-icon report-icon-orange">' + icon("cloud", 18) + '</span><span class="source-status source-blue">SIMULATION</span></div><h3>Disruption scenario</h3><p>Illustrative rainfall event on the Bengaluru–Mumbai corridor.</p><div class="report-mini-stat"><strong>+46 pts</strong><span>scenario risk delta</span></div><button class="report-action" data-page="simulator">Open simulator ' + icon("arrow", 14) + "</button></section></div><div class=\"report-notice\">" + icon("help", 15) + "<span><strong>Reports use demo data.</strong> No live SAP, carrier, market, or weather source is connected.</span></div>";
}
function assistantAnswer(question) {
  const lower = question.toLowerCase(), id = (question.toUpperCase().match(/SH\d{3}/) || [])[0];
  if (lower.includes("supplier")) {
    const watch = suppliers.filter((supplier) => supplier.score < 85);
    return { tools: ["analyse_supplier_risk"], text: "Two suppliers are below the 85% on-time threshold in this demo snapshot: " + watch.map((supplier) => supplier.name + " (" + supplier.score + "%)").join(" and ") + ". These sample figures do not verify alternative capacity or availability." };
  }
  if (lower.includes("rain") || lower.includes("weather")) return { tools: ["get_weather_conditions", "identify_affected_shipments", "predict_disruption_risk"], text: "The demo includes a simulated heavy-rainfall event on the Bengaluru–Mumbai corridor. SH001 is the matching shipment. Its baseline risk is 28%; the simulator returns an illustrative scenario score based on event intensity. This is not a live forecast or ML prediction." };
  if (lower.includes("high risk") || lower.includes("at risk")) {
    const high = shipments.filter((shipment) => shipment.risk >= 70);
    return { tools: ["get_shipment_details", "predict_disruption_risk"], text: "There are " + high.length + " high-risk shipments in the demo data: " + high.map((shipment) => shipment.id + " (" + shipment.risk + "%, " + shipment.origin + " → " + shipment.destination + ")").join("; ") + ". SH014 has stale status and a lower supplier on-time rate; SH022 has elevated dwell time and a supplier signal." };
  }
  if (id) {
    const item = findShipment(id);
    return { tools: ["get_shipment_details", "predict_disruption_risk"], text: item ? item.id + " is " + item.status.toLowerCase() + " from " + item.origin + " to " + item.destination + ", with a " + item.risk + "% " + riskName(item.risk).toLowerCase() + " demo risk score. " + item.reason + " Evidence: " + item.factors.map((factor) => factor.label + " (" + factor.value + ")").join(", ") + "." : "I could not find " + id + " in the current demo shipment records." };
  }
  if (lower.includes("recover") || lower.includes("route") || lower.includes("alternative")) return { tools: ["compare_alternative_routes", "generate_recovery_plan"], text: "For SH001, the demo planner shows the current road plan, an illustrative Hubballi route option, and a hypothetical air-priority option. Transit and cost values are illustrative. Road conditions, route feasibility, and carrier capacity are not connected or verified." };
  return { tools: ["get_shipment_details"], text: "I can look up demo shipment status and risk, summarize supplier signals, explain the simulated rainfall scenario, or outline illustrative recovery options. The assistant uses local demo tools; Joule is not connected." };
}
function assistantPage() {
  const suggestions = ["Which shipments are at high risk?", "Why is shipment SH014 delayed?", "What happens if heavy rainfall affects SH001?", "Which suppliers need attention?"];
  const messages = state.messages.map((message) => '<div class="chat-message-row ' + (message.role === "user" ? "chat-message-user" : "") + '">' +
    (message.role === "assistant" ? '<span class="chat-small-avatar">' + icon("spark", 13) + "</span>" : "") +
    '<div class="chat-message-content"><div class="chat-bubble">' + esc(message.text) + "</div>" +
    (message.tools && message.tools.length ? '<div class="tool-call-list">' + message.tools.map((tool) => '<span>' + icon("check", 11) + esc(tool) + "<small>called</small></span>").join("") + "</div>" : "") +
    "</div>" + (message.role === "user" ? '<span class="chat-user-avatar">A</span>' : "") + "</div>").join("");
  return intro("AI supply chain assistant", "Ask a question and get an answer grounded in shipment and supplier records.", '<span class="local-agent-status"><span></span>LOCAL DEMO AGENT</span>') +
    '<div class="assistant-workspace"><section class="panel assistant-chat-panel"><div class="chat-header"><span class="chat-agent-icon">' + icon("spark", 17) + '</span><span><strong>SupplyShield assistant</strong><small><i></i>Local demo tools · Joule not connected</small></span></div>' +
    '<div class="chat-messages"><div class="chat-date-divider"><span>Today · Demo workspace</span></div>' + messages + '</div><div class="suggested-prompts"><span>TRY ASKING</span>' + suggestions.map((prompt) => '<button data-prompt="' + esc(prompt) + '">' + esc(prompt) + icon("arrow", 11) + "</button>").join("") + "</div>" +
    '<form class="chat-input-row" data-chat-form><input name="message" placeholder="Ask about shipments, risks, or recovery options..." /><button class="chat-send" aria-label="Send message">' + icon("send", 15) + '</button></form><div class="chat-disclaimer">' + icon("shield", 12) + "Answers use illustrative demo data. Review recommendations before acting.</div></section>" +
    '<div class="assistant-side"><section class="panel agent-capabilities"><div class="panel-overline">AGENT CAPABILITIES</div><h3>What I can help with</h3>' +
    [["package", "Shipment monitoring", "Status, ETA, and delay signals"], ["activity", "Risk explanations", "Model and sample evidence"], ["supplier", "Supplier intelligence", "Reliability and dependencies"], ["route", "Recovery planning", "Compare available options"]].map((item) => '<div class="capability-row"><span>' + icon(item[0], 14) + '</span><div><strong>' + item[1] + '</strong><small>' + item[2] + '</small></div>' + icon("check", 13) + "</div>").join("") +
    '</section><section class="panel agent-source-panel"><div class="panel-overline">DATA SOURCES</div><h3>Grounded in your workspace</h3><div class="agent-source-row">' + icon("database", 14) + '<span><strong>Demo shipment data</strong><small>8 shipments · 4 suppliers</small></span><span class="source-status source-amber">LOCAL</span></div><div class="agent-source-row">' + icon("cloud", 14) + '<span><strong>External feeds</strong><small>Weather / traffic / inventory</small></span><span class="source-status source-muted">OFFLINE</span></div><div class="agent-source-row">' + icon("shield", 14) + '<span><strong>SAP Joule</strong><small>Tenant not configured</small></span><span class="source-status source-muted">OFFLINE</span></div></section></div></div>';
}
function detailDrawer() {
  const item = state.drawer;
  if (!item) return "";
  return '<div class="drawer-scrim" data-action="outside-close"><aside class="shipment-drawer"><div class="drawer-header"><div><span class="panel-overline">SHIPMENT DETAILS</span><button class="drawer-close" data-action="close-drawer">' + icon("close", 16) + '</button></div><h2>' + item.id + '</h2><div class="drawer-route">' + item.origin + icon("arrow", 14) + item.destination + '<span>' + item.mode + "</span></div></div>" +
    '<div class="drawer-badges">' + statusPill(item.status) + riskPill(item.risk, riskName(item.risk) + " risk · " + item.risk + "%") + '</div><div class="drawer-progress"><div><span>Transit progress</span><strong>' + item.progress + '%</strong></div><div class="progress-track"><i style="width:' + item.progress + '%"></i></div><small>Last update ' + item.updated + " · Demo feed</small></div>" +
    '<div class="drawer-info-grid"><div><span>Estimated arrival</span><strong>' + item.eta + '</strong></div><div><span>Distance</span><strong>' + item.distance + '</strong></div><div><span>Carrier</span><strong>' + item.carrier + '</strong></div><div><span>Supplier</span><strong>' + item.supplier + '</strong></div></div>' +
    '<div class="drawer-section"><div class="drawer-section-title"><h3>Risk explanation</h3><span class="demo-pill"><span></span>DEMO</span></div><p>' + item.reason + '</p><div class="factor-list">' + item.factors.map((factor) => '<div><span>' + factor.label + '</span><strong class="factor-' + factor.tone + '">' + factor.value + "</strong></div>").join("") + "</div></div>" +
    '<div class="drawer-section drawer-map-section"><div class="drawer-section-title"><h3>Route overview</h3><span class="source-status source-amber">SCHEMATIC</span></div>' + mapView(true) + "</div>" +
    '<div class="drawer-actions"><button class="button button-secondary" data-action="go-simulator">' + icon("flask", 14) + "Simulate</button><button class=\"button button-primary\" data-action=\"go-recovery\">" + icon("spark", 14) + "Recovery options</button></div></aside></div>";
}
function notifications() {
  if (!state.notifications) return "";
  return '<div class="notification-popover"><div class="notification-heading"><div><strong>Notifications</strong><small>3 items need attention</small></div><button data-action="notifications">' + icon("close", 14) + '</button></div>' +
    alerts.map((item) => '<button class="notification-row" data-shipment="' + item.shipment + '"><span class="notification-icon notification-' + item.level.toLowerCase() + '">' + icon("alert", 13) + '</span><span><strong>' + item.title + '</strong><small>' + item.time + " · " + item.source + "</small></span></button>").join("") +
    '<button class="notification-footer" data-page="intelligence">View all notifications ' + icon("arrow", 13) + "</button></div>";
}
function content() {
  const pages = { overview: overviewPage, shipments: shipmentsPage, intelligence: intelligencePage, suppliers: suppliersPage, simulator: simulatorPage, recovery: recoveryPage, reports: reportsPage, assistant: assistantPage };
  return (pages[state.page] || overviewPage)();
}
function render() {
  root.innerHTML = '<div class="app-shell">' + sidebar() + '<div class="main-shell">' + header() + '<main class="main-content">' + content() +
    '<footer class="page-footer"><span>© 2026 SupplyShield AI</span><span><i class="footer-status-dot"></i>DEMO ENVIRONMENT</span><span>Detect early. Predict smartly. Recover faster.</span></footer></main></div></div>' + notifications() + detailDrawer();
}
function exportCsv() {
  const headers = ["shipment_id", "origin", "destination", "supplier", "mode", "status", "risk_score_percent", "eta", "data_status"];
  const rows = shipments.map((item) => [item.id, item.origin, item.destination, item.supplier, item.mode, item.status, item.risk, item.eta, "demo"]);
  const csv = [headers, ...rows].map((row) => row.map((cell) => '"' + String(cell).replace(/"/g, '""') + '"').join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = "supplyshield-demo-shipments.csv"; link.click(); URL.revokeObjectURL(url);
}
function sendMessage(text) {
  const question = String(text || "").trim();
  if (!question) return;
  const result = assistantAnswer(question);
  state.messages.push({ role: "user", text: question }, { role: "assistant", text: result.text, tools: result.tools });
  state.page = "assistant"; render();
  const area = document.querySelector(".chat-messages");
  if (area) area.scrollTop = area.scrollHeight;
}
root.addEventListener("click", (event) => {
  const prompt = event.target.closest("[data-prompt]");
  if (prompt) { sendMessage(prompt.dataset.prompt); return; }
  const filter = event.target.closest("[data-filter]");
  if (filter) { state.filter = filter.dataset.filter; render(); return; }
  const scenario = event.target.closest("[data-scenario]");
  if (scenario) { state.scenario = scenario.dataset.scenario; state.result = null; render(); return; }
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === "toggle-sidebar") state.sidebar = true;
    else if (action === "close-sidebar") state.sidebar = false;
    else if (action === "notifications") state.notifications = !state.notifications;
    else if (action === "close-drawer" || (action === "outside-close" && event.target === actionTarget)) state.drawer = null;
    else if (action === "go-simulator") { state.page = "simulator"; state.drawer = null; }
    else if (action === "go-recovery") { state.page = "recovery"; state.drawer = null; }
    else if (action === "run-simulation") {
      const affected = { heavy_rainfall: ["SH001", "SH031"], port_closure: ["SH063"], traffic_congestion: ["SH001", "SH031", "SH071"], supplier_failure: ["SH014", "SH058"], fuel_price_increase: ["SH001", "SH031", "SH058"], inventory_shortage: ["SH022", "SH063"] }[state.scenario];
      state.result = { baseline: 28, risk: Math.min(96, Math.round(28 + state.intensity * .62)), affected, delay: state.scenario === "heavy_rainfall" ? "+3.5 hrs*" : "Unavailable", impact: state.scenario === "heavy_rainfall" ? "₹1.8L*" : "Unavailable" };
    } else if (action === "reset-scenario") state.result = null;
    else if (action === "export") exportCsv();
    else if (action === "zoom-in") state.zoom = Math.min(1.2, state.zoom + .05);
    else if (action === "zoom-out") state.zoom = Math.max(.9, state.zoom - .05);
    else if (action === "zoom-reset") state.zoom = 1;
    render(); return;
  }
  const page = event.target.closest("[data-page]");
  if (page) { state.page = page.dataset.page; state.sidebar = false; state.notifications = false; render(); return; }
  const shipment = event.target.closest("[data-shipment]");
  if (shipment) { state.drawer = findShipment(shipment.dataset.shipment); render(); }
});
root.addEventListener("input", (event) => {
  if (event.target.matches("[data-intensity]")) {
    state.intensity = Number(event.target.value);
    const label = document.querySelector(".intensity-header > strong");
    if (label) label.innerHTML = state.intensity + '% <small>Severe</small>';
  }
  if (event.target.matches("[data-global-search], [data-table-search]")) {
    state.query = event.target.value;
    if (state.query) state.page = "shipments";
    const position = event.target.selectionStart;
    const selector = event.target.matches("[data-table-search]") ? "[data-table-search]" : "[data-global-search]";
    render();
    const field = document.querySelector(selector);
    if (field) { field.focus(); field.setSelectionRange(position, position); }
  }
});
root.addEventListener("keydown", (event) => {
  if (event.target.matches("[data-global-search]") && event.key === "Enter") { state.page = "shipments"; render(); document.querySelector("[data-table-search]")?.focus(); }
  if (event.target.matches("[data-shipment]") && event.key === "Enter") { state.drawer = findShipment(event.target.dataset.shipment); render(); }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); document.querySelector("[data-global-search]")?.focus(); }
});
root.addEventListener("submit", (event) => {
  if (!event.target.matches("[data-chat-form]")) return;
  event.preventDefault();
  sendMessage(new FormData(event.target).get("message"));
});
render();
