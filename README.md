# SupplyShield AI

Responsive supply-chain disruption dashboard and decision-support demo.

## Run locally

Node.js 20 or newer is required. The app is dependency-free; no package installation is needed.

~~~powershell
npm run dev
~~~

Open http://127.0.0.1:4173. You can also run node server.mjs.

## Demo scope

- Eight illustrative shipments and four illustrative suppliers.
- Interactive shipment search, detail drawer, risk filters, and alert navigation.
- Schematic Bengaluru–Mumbai route view; no live map tiles or GPS feed.
- What-if scenarios are isolated demo calculations and do not modify shipment records.
- The assistant uses a deterministic local intent router and the bundled demo records.
- External provider feeds and SAP Joule are not connected.

All figures and events are demo values. Do not use them for operational decisions.
