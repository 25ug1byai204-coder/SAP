# Smart Supply Chain Disruption Detection System

**Tagline:** Detect Early. Predict Smartly. Recover Faster.  
**Brand:** SupplyShield AI  
**Status:** Proposed specification for an SAP hackathon MVP

> Workspace inspection found only an empty app.cpp. No README, dataset, or existing spec.md was present. The requested global_supply_chain_risk_2026.csv was not found. All dataset- and integration-specific recommendations below are conditional.

## 1. Project Overview

The Smart Supply Chain Disruption Detection System is an enterprise decision-support platform for detecting shipment and supplier risks, explaining the evidence, and comparing recovery options. SupplyShield AI is its dashboard and assistant brand.

The MVP combines a React dashboard, Python API, dataset-dependent ML model, optional weather and route enrichment, what-if simulation, and one tool-calling assistant. SAP Joule Studio, SAP BTP, SAP Integration Suite, SAP S/4HANA, and SAP Business Network are proposed integration targets; none is assumed configured. Mark all data as live, imported, provider-derived, SAP-derived, cached, or simulated.

Initial assumptions: use SQLite for a single-instance hackathon deployment; use a small synthetic fixture only when clearly labeled; provider accounts, SAP entitlements, GPS feeds, and credentials are not known to be available. No implementation files exist beyond the empty app.cpp.

## 2. Problem Statement

Supply chain teams monitor shipments, suppliers, weather, inventory, transport routes, and market signals across separate systems. Delays can become costly before planners understand the downstream exposure. Alerts alone often fail to explain causes or compare practical actions.

The system joins records only through trustworthy identifiers or explicit geographic, temporal, and business mappings. It returns a risk estimate with evidence and freshness, identifies affected shipments, and helps a planner compare options. It is advisory; users remain accountable for operational decisions.

## 3. Proposed Solution

1. Ingest shipment, supplier, inventory, and disruption records from validated uploads, configured providers, or approved SAP APIs.
2. Normalize identifiers, timestamps, units, locations, and provenance.
3. Enrich with weather and route context only when configured; missing data remains missing.
4. Produce a validated ML estimate, clearly labeled rules-based estimate, or unknown result.
5. Generate deduplicated, explainable alerts.
6. Support isolated simulations and evidence-backed recovery comparisons.
7. Use one Smart Supply Chain Risk & Recovery Agent with bounded backend tools. Require human approval for any future SAP write or operational change.

## 4. Project Objectives

- Detect potential disruptions early and explain risk factors and data freshness.
- Identify impacted shipments and supplier dependencies without guessed joins.
- Compare response options using explicit inputs and trade-offs.
- Demonstrate an end-to-end route/weather scenario.
- Provide an SAP-ready boundary without claiming an unconfigured connection.
- Finish a thin working MVP before optional streaming, multi-agent, or write-back features.

## 5. Target Users

| User | Need |
|---|---|
| Control tower analyst | Find at-risk shipments and understand evidence |
| Logistics planner | Compare route, timing, and priority options |
| Procurement analyst | Review supplier performance and dependencies |
| Operations manager | Understand exposure and response status |
| SAP/BTP administrator | Govern identity, destinations, APIs, and permissions |
| Hackathon evaluator | See a credible demo with live and illustrative data distinguished |

## 6. Core Innovation

- Shipment risk prediction combined with operational and external signals.
- Traceable explanations from source data to alert and recommendation.
- Joule-oriented agent tools with a working local fallback.
- Interactive shipment mapping and isolated what-if comparison.
- Explicit distinction between observed facts, model estimates, provider estimates, and illustrative values.
- Governed integration path to SAP business information.

## 7. Functional Requirements

### MVP

- Load validated sample or user-provided shipment/supplier data.
- Show shipment totals, risk counts, active alerts, supplier summaries, and trends.
- Search/filter by shipment ID, status, carrier/mode, supplier, and risk.
- Show shipment details, origin/destination, route if available, ETA, status, evidence, and provenance.
- Return a prediction or a transparent “model unavailable/insufficient data” result.
- Find affected shipments using explicit event, route, time, supplier, or location matching.
- Run a what-if scenario without modifying observed data.
- Compare recovery options only using available route, inventory, supplier, cost, and timing evidence.
- Make the assistant call backend tools and ground claims in their results.
- Export filtered CSV reports; PDF is a later feature.
- Show source and “as of” timestamps for material data.

### Boundaries

No real-time GPS, traffic, port, geopolitical, inventory, market-price, supplier-alternative, or SAP feed is presumed. MVP recommendations do not reserve inventory, reroute freight, create orders, or modify SAP records. Never label a rule score as an ML result or a route estimate as a live ETA.

## 8. Non-Functional Requirements

- Responsive, accessible UI with keyboard use, clear focus, useful empty/error/loading states, and reduced-motion support.
- Dashboard and shipment reads target under 2 seconds on demo data; bound provider calls with timeout and caching.
- External provider failure degrades only that enrichment and shows freshness or unavailability.
- Record model version, input snapshot/hash, source timestamps, scenario assumptions, and recommendation evidence.
- Keep secrets server-side; validate and authorize all inputs; minimize sensitive data sent to LLMs.
- Separate UI, API, domain logic, provider adapters, SAP adapters, and model code.
- Surface uncertainty, missing features, model validation limits, and human decision points.

## 9. Website Modules

### 9.1 Overview Dashboard

Show total, delayed, high-risk, and disrupted shipments; supplier risk; estimated financial impact only when costs exist; risk distribution; trends; recent alerts; and data freshness. Define calculations in the UI. Missing cost is “Not available,” not zero.

### 9.2 Live Shipment Tracking

Provide map filters, ID search, endpoints, route geometry, ETA, and risk. GPS requires a real feed, coordinate timestamp, and accuracy. Otherwise label positions as simulated and routes as estimates. OSRM route duration is not live traffic or closure data.

### 9.3 AI Disruption Prediction

Compare Logistic Regression and Random Forest only if the inspected dataset has a valid target and enough labels. Show probability, risk band, model/version, feature evidence, missing fields, validation metrics, and confusion matrix. Do not display invented metrics. Balance precision and recall against missed disruptions and alert fatigue.

### 9.4 Disruption Intelligence

Represent weather, traffic, supplier, market, inventory, geopolitical, port, and transport signals with source, scope, observed/forecast time, severity, freshness, and verification state. Unconfigured feeds are unavailable; scenario events are simulated.

### 9.5 Supplier Network

Show supplier reliability and dependencies only when backed by records. Show dependency edges only for explicit relationships. Alternative suppliers need verified qualification, capacity, product fit, lead time, and availability; otherwise state unknown or omit them.

### 9.6 What-if Simulator

Support heavy rainfall, port closure, traffic congestion, supplier failure, fuel-price increase, and inventory shortage. Show baseline/scenario risk, affected shipments, delay/cost only where calculable, assumptions, and response options. Keep simulation separate from actual predictions/events.

### 9.7 AI Recovery Planner

Compare routes, arrival estimates, costs, and delay reduction only where evidenced. Route geometry does not prove feasibility. Inventory and supplier availability must be verified. Return partial options and missing facts where evidence is incomplete.

### 9.8 Reports and Analytics

Offer shipment, disruption, supplier, and historical reports. CSV is MVP; PDF later. Include generated time, filters, freshness, model/scenario version, and illustrative/live labels.

### 9.9 AI Supply Chain Assistant

Support questions such as high-risk shipments, why SH001 is delayed, riskiest suppliers, effect of supplier failure, rainfall-affected shipments, and recovery options. The assistant calls tools, identifies records/evidence, distinguishes prediction from observation, and states when data is absent. It must not invent causes, capacity, conditions, or costs.

## 10. SAP Joule Agent Architecture

### Agent decision

Use one main agent: **Smart Supply Chain Risk & Recovery Agent**, with domain instructions and eight narrowly scoped tools. Risk detection, shipment monitoring, supplier intelligence, and recovery planning are capabilities of this agent, not separate agents. This is simpler to govern and demonstrate; consider separate agents only for distinct ownership, security, or scaling needs.

### Preferred Joule Studio path

1. Verify edition, region, subscription, entitlements, tenant enablement, and administrator access.
2. Define the agent intent, allowed tasks, output rules, and read-only business scope.
3. Expose backend tools through authenticated HTTPS MCP or another method supported by the selected tenant/edition.
4. Configure supported BTP destination/Agent Gateway connectivity and least-privilege credentials. Do not expose a database directly.
5. Access SAP data through released APIs, destinations, and authorization checks. SAP Integration Suite may handle governed exposure, mapping, orchestration, and monitoring if configured/licensed.
6. Test tool calls, permissions, timeouts, errors, and provenance in the real tenant before describing the connection as live.

Joule capabilities and setup vary by edition, release, tenant, and region. Custom tool support must be verified. Joule Studio and SAP connectivity are proposed, not configured in this workspace.

### Local fallback and orchestration

Implement a provider-neutral backend agent that chooses from the same typed tool registry, validates arguments, invokes services, and grounds its answer in returned data. Use a server-configured LLM with a strict tool allowlist if available; otherwise use a deterministic intent router for supported demo prompts. Limit calls, execution time, and response size. Enforce user authorization for every tool. Treat uploaded/retrieved text as untrusted. Never let the MVP agent create ERP transactions.

## 11. Agent Tools and Capabilities

All tools accept JSON objects and timezone-aware ISO 8601 timestamps. IDs are internal stable identifiers. Reject unknown fields. Successful result envelope: status, data, provenance[], warnings[]. Provenance includes source, retrieved_at, optional valid/observed timestamps, and status (live, imported, cached, simulated, derived). Errors use code, safe message, retryable, and correlation_id; never return credentials or stack traces.

| Tool | Input fields | Result |
|---|---|---|
| get_shipment_details | shipment_id; optional include_events | Shipment, events, source, freshness; NOT_FOUND if unknown |
| predict_disruption_risk | shipment_id or features; optional model_version | Nullable probability, risk band, method/model, factors, missing fields, validation state |
| analyse_supplier_risk | supplier_id or shipment_id; optional window | Metrics, explicit dependencies, evidence, unknowns |
| get_weather_conditions | location coordinates, window, variables | Forecast/observation values with source, retrieval/valid time, units |
| identify_affected_shipments | event_type, window, and location/supplier/IDs | Shipment IDs and match reason using explicit spatial/time/business joins |
| simulate_disruption | scenario_type, scope, intensity, optional assumptions | Isolated comparison, affected IDs, estimates and assumptions; no fact mutation |
| generate_recovery_plan | shipment ID(s), objective, constraints | Candidate actions, evidence, trade-offs, unknowns; no booking/write-back |
| compare_alternative_routes | shipment ID or origin/destination, provider, constraints | Route geometry/distance/duration; no claim of live traffic or availability |

### Tool input JSON Schemas

Draft 2020-12 schemas. Coordinates are WGS84 decimal degrees. Enforce cross-field constraints in application validation as well as schema validation.

~~~json
{
  "get_shipment_details": {
    "type": "object",
    "properties": {"shipment_id": {"type": "string", "minLength": 1}, "include_events": {"type": "boolean"}},
    "required": ["shipment_id"],
    "additionalProperties": false
  },
  "predict_disruption_risk": {
    "type": "object",
    "properties": {
      "shipment_id": {"type": "string"},
      "features": {"type": "object"},
      "model_version": {"type": "string"}
    },
    "oneOf": [{"required": ["shipment_id"]}, {"required": ["features"]}],
    "additionalProperties": false
  },
  "analyse_supplier_risk": {
    "type": "object",
    "properties": {"supplier_id": {"type": "string"}, "shipment_id": {"type": "string"}, "window": {"type": "object"}},
    "oneOf": [{"required": ["supplier_id"]}, {"required": ["shipment_id"]}],
    "additionalProperties": false
  },
  "get_weather_conditions": {
    "type": "object",
    "properties": {
      "location": {"type": "object", "properties": {"latitude": {"type": "number", "minimum": -90, "maximum": 90}, "longitude": {"type": "number", "minimum": -180, "maximum": 180}}, "required": ["latitude", "longitude"], "additionalProperties": false},
      "window": {"type": "object", "properties": {"from": {"type": "string", "format": "date-time"}, "to": {"type": "string", "format": "date-time"}}, "required": ["from", "to"], "additionalProperties": false},
      "variables": {"type": "array", "items": {"type": "string", "enum": ["precipitation", "temperature_2m", "wind_speed_10m", "weather_code"]}}
    },
    "required": ["location", "window"],
    "additionalProperties": false
  },
  "identify_affected_shipments": {
    "type": "object",
    "properties": {
      "event_type": {"type": "string", "enum": ["weather", "traffic", "port", "supplier", "inventory", "market", "transport", "geopolitical"]},
      "window": {"type": "object"},
      "location": {"type": "object"},
      "radius_km": {"type": "number", "exclusiveMinimum": 0, "maximum": 1000},
      "supplier_id": {"type": "string"},
      "shipment_ids": {"type": "array", "items": {"type": "string"}, "maxItems": 500}
    },
    "required": ["event_type", "window"],
    "anyOf": [{"required": ["location"]}, {"required": ["supplier_id"]}, {"required": ["shipment_ids"]}],
    "additionalProperties": false
  },
  "simulate_disruption": {
    "type": "object",
    "properties": {
      "scenario_type": {"type": "string", "enum": ["heavy_rainfall", "port_closure", "traffic_congestion", "supplier_failure", "fuel_price_increase", "inventory_shortage"]},
      "shipment_ids": {"type": "array", "items": {"type": "string"}, "maxItems": 500},
      "supplier_id": {"type": "string"},
      "location": {"type": "object"},
      "window": {"type": "object"},
      "intensity": {"type": "number", "minimum": 0, "maximum": 1},
      "assumptions": {"type": "object"}
    },
    "required": ["scenario_type"],
    "additionalProperties": false
  },
  "generate_recovery_plan": {
    "type": "object",
    "properties": {
      "shipment_id": {"type": "string"},
      "shipment_ids": {"type": "array", "items": {"type": "string"}, "maxItems": 100},
      "objective": {"type": "string", "enum": ["minimize_delay", "minimize_cost", "balance_cost_and_delay"]},
      "constraints": {"type": "object"}
    },
    "oneOf": [{"required": ["shipment_id"]}, {"required": ["shipment_ids"]}],
    "required": ["objective"],
    "additionalProperties": false
  },
  "compare_alternative_routes": {
    "type": "object",
    "properties": {
      "shipment_id": {"type": "string"},
      "origin": {"type": "object"},
      "destination": {"type": "object"},
      "provider": {"type": "string", "enum": ["osrm"]},
      "alternatives": {"type": "integer", "minimum": 0, "maximum": 3}
    },
    "oneOf": [{"required": ["shipment_id"]}, {"required": ["origin", "destination"]}],
    "additionalProperties": false
  }
}
~~~

### Tool result schemas

| Tool | Required data shape |
|---|---|
| get_shipment_details | shipment: shipment_id, status, origin, destination, optional position, ETA, supplier_id, events[] |
| predict_disruption_risk | shipment_id, nullable probability [0,1], risk_band (low/medium/high/unknown), method, model_version, top_factors[], missing_features[], validation_status |
| analyse_supplier_risk | supplier_id, nullable risk_score, metrics, dependencies[], evidence[], unknowns[] |
| get_weather_conditions | location, observations[] of valid_at, variable, value, unit, kind |
| identify_affected_shipments | event_type, matches[] of shipment_id, match_reason, overlap_window, source_status |
| simulate_disruption | scenario_id, simulated=true, baseline, scenario, affected_shipments[], assumptions[]; nullable estimates |
| generate_recovery_plan | shipment_id, options[] with action, nullable cost/ETA/delay reduction, evidence[], tradeoffs[], unknowns[] |
| compare_alternative_routes | routes[] with distance_m, duration_s, geometry, provider, live_traffic=false, availability_verified=false unless separately verified |

### Communication, authentication, and errors

The local agent invokes typed Python services. Joule uses an authenticated HTTPS MCP endpoint only where the tenant/edition supports it. Browser code never holds SAP, provider, or LLM secrets. Authenticate users through the deployment identity/session mechanism; use short-lived OAuth2 client credentials or a supported BTP destination for service-to-service calls. Check user and tenant scope on every call. Apply per-tool/provider timeouts, bounded retries only for idempotent reads, and request correlation IDs. Redact tokens and sensitive prompts.

## 12. Dataset Collection Strategy

### Workspace and target inspection

No CSV dataset was present, so column names, target, dtypes, missing values, duplicates, class distribution, and features cannot be asserted. When a CSV is supplied, first produce an inventory/report covering all of these plus label meaning, timestamp, join keys, and prediction-time availability.

Do not assume a target called risk, delay, or disruption. Exclude leakage such as final delivery outcome, post-event notes, actual delay recorded after prediction time, or any future-derived field. Kaggle datasets must be reviewed for license, provenance, and semantics before use.

### Candidate sources and limitations

| Source | Possible use | Conditions |
|---|---|---|
| Kaggle | Historical examples and experimentation | Review license, provenance, schema, and label meaning; do not join unrelated datasets |
| data.gov.in | Relevant Indian public datasets | Verify exact resource, schema, access method, update cadence, terms, and identifiers |
| AGMARKNET | Agricultural market arrivals/prices | Map commodity, market, date, and units; not a supplier or shipment record |
| Open-Meteo | Weather forecast/historical enrichment by coordinate/time | Store model/source, units, retrieval and valid time; distinguish reanalysis from forecast history |
| OpenStreetMap | Geographic context/base maps | Preserve attribution; comply with selected tile/geocoder terms |
| OSRM | Road geometry, distance, profile-based duration | Not live traffic, route closure, or carrier feasibility; verify service coverage/availability |
| SAP S/4HANA / SAP Business Network | Business partner, supplier, order/shipment context | Requires released APIs, entitlement, tenant setup, and authorization |

### Identity and joins

Generate an internal shipment_id. Keep source mappings keyed by source system, entity type, and external ID; preserve original keys and provenance. Match shipment-supplier only by explicit key. Match weather to route by documented spatial corridor and overlapping time. Match agricultural prices using product/commodity, market, unit, and date mapping. Match inventory with SKU, warehouse, unit, quantity, and availability timestamp. Never assume unrelated datasets share a key. Quarantine ambiguous records for review.

## 13. Data Preprocessing

1. Preserve upload checksum, filename, declared source, uploader, and import time.
2. Validate file type, size, encoding, headers, row count, duplicate headers, and allowed schema.
3. Map columns explicitly; reject ambiguous mappings.
4. Parse timezone-aware dates; validate coordinates; normalize categories and units only with documented conversions.
5. Report duplicates; do not silently discard conflicting records.
6. Analyze missingness and label quality. Missing is not zero.
7. Fit imputers, encoders, and scalers on training data only.
8. Use only features available at the prediction cutoff. Split by time and/or shipment/supplier group.
9. Version the feature schema/order with the model.
10. Reject or downgrade predictions for incompatible or critically incomplete inputs.

## 14. Machine Learning Architecture

Pipeline: validated data -> target and feature review -> time-aware split -> fitted preprocessing -> baseline comparison -> held-out evaluation -> calibration/threshold selection -> trusted model artifact and manifest -> prediction API.

Candidate features include planned lead time, elapsed time, route distance, carrier/mode, historical delivery performance, supplier history, forecast weather, event severity/distance, inventory coverage, and status freshness. These are candidates only, not assumed dataset fields. Do not treat synthetic demo rows as operational history.

| Model | Benefits | Limitations and role |
|---|---|---|
| Logistic Regression | Efficient, interpretable baseline; coefficients can be reviewed; can be calibrated | May miss nonlinear interactions; needs suitable encoding/scaling |
| Random Forest | Captures nonlinear patterns/interactions; offers feature ranking | Can overfit small/leaky datasets; importance is not causal; probabilities may be poorly calibrated |

Use a time-ordered holdout when timestamps support it. Otherwise use stratified group splits by shipment/supplier to avoid near-duplicate leakage. Keep a final holdout untouched during selection. For scarce data, use grouped cross-validation on training data.

Report confusion matrix, precision, recall, F1, accuracy, prevalence, calibration, and ROC-AUC or PR-AUC where suitable. Accuracy alone is inadequate for imbalanced labels. Set alert thresholds from validation and the cost of false positives/negatives. If probabilities are not calibrated, label them uncalibrated scores. Return unknown when no model exists or critical inputs are absent.

Risk bands are configurable. Demo defaults may be <0.35 Low, 0.35–0.65 Medium, >0.65 High, but require validation and operational review. Explanations show feature values, missing fields, version, and Logistic Regression contributions or validation-set permutation importance. Feature importance is not causal. Optional SHAP is a later choice.

Persist preprocessing and classifier together with manifest: target definition, feature schema, data checksum, split strategy, metrics, thresholds, build time, and model version. Load only trusted server-side artifacts; never execute uploaded pickle. The prediction API validates input and records model metadata.

## 15. System Architecture

~~~mermaid
flowchart TB
  subgraph Sources["Configured or simulated data"]
    FILES["CSV / approved imports"]
    WEATHER["Weather provider"]
    MAPS["OSM-derived maps / OSRM"]
    SAPSYS["SAP S/4HANA / Business Network optional"]
  end
  subgraph Integration["Collection and integration"]
    INGEST["Validation, normalization, provenance"]
    ADAPTERS["Provider and SAP adapters"]
    INT["SAP Integration Suite / API Management optional"]
  end
  subgraph Core["SupplyShield AI backend"]
    DB[("SQLite MVP / managed DB later")]
    ML["Preprocessing and ML prediction"]
    API["FastAPI domain/API layer"]
    TOOLS["Typed tools and MCP adapter"]
    SIM["Simulation and recovery services"]
  end
  subgraph Assistant["Assistant options"]
    JOULE["Joule Studio if entitled/configured"]
    LOCAL["Local tool-calling fallback"]
  end
  UI["React + Vite dashboard"]
  USER["Planner / analyst"]
  FILES --> INGEST
  WEATHER --> ADAPTERS
  MAPS --> ADAPTERS
  SAPSYS -. "released API / approved destination" .-> INT
  INT -. "governed exchange" .-> ADAPTERS
  ADAPTERS --> INGEST
  INGEST --> DB
  DB --> ML
  DB --> API
  ML --> API
  API --> SIM
  API --> TOOLS
  TOOLS <--> JOULE
  TOOLS <--> LOCAL
  API --> UI
  UI --> USER
~~~

Sources pass through validation/provenance into normalized storage. The ML and deterministic domain services operate on that data. FastAPI serves UI/API and typed tools. Joule or the local agent invokes the same tools. Integration Suite/API Management is optional and depends on customer license/configuration.

### SAP exchange pattern

Use a backend adapter rather than browser-to-SAP calls. Discover released APIs for required business objects; for example, Business Partner A2X may apply to supplier master data. Confirm release, communication scenario, destination, and scopes. Map SAP external identifiers to internal IDs. Use Integration Suite for integration flows/mapping or API Management for governed exposure where appropriate. Verify SAP Business Network access and APIs separately. MVP is read-only to SAP. Future writes require approval, idempotency, audit, authorization, and reconciliation.

## 16. Technology Stack

| Technology | Responsibility |
|---|---|
| React + Vite + JavaScript | Dashboard SPA and development/build tooling |
| Tailwind CSS | Theme, layout, responsive and reusable styles |
| Recharts | Dashboard and model evaluation charts |
| Leaflet | Interactive map and route/event layers |
| Lucide | Consistent interface icons |
| Python + FastAPI + Pydantic | API, validation, domain services, adapters, typed tools |
| Pandas + NumPy | Data inspection and transformation |
| scikit-learn | Preprocessing, Logistic Regression, Random Forest, evaluation |
| SQLite | Local/single-instance MVP persistence |
| OpenStreetMap-derived data + OSRM | Map context and candidate route geometry/duration under provider terms |
| Open-Meteo | Optional weather enrichment |
| SAP Joule/Joule Studio | Preferred business agent if access and tool connection are supported |
| SAP BTP | Identity, destinations, connectivity, deployment/governance as configured |
| SAP Integration Suite | Optional cloud/hybrid integration and API exposure |
| Vercel | Candidate frontend hosting |
| Render or equivalent | Candidate backend hosting |

Pin dependencies. Check hosting for outbound networking, secrets, Python support, background tasks, and durable storage. Ephemeral disks are unsuitable for persistent SQLite; use durable single-instance storage or a managed database.

## 17. Database Design

Use SQLite with foreign keys, migrations, UTC timestamps, and parameterized queries.

| Table | Key fields |
|---|---|
| shipments | shipment_id PK, source_system/external_id, supplier_id, origin, destination, departure, ETA, status, mode, carrier, nullable cost/currency, timestamps |
| shipment_positions | position_id, shipment_id FK, coordinates, observed_at, source, simulated, accuracy |
| shipment_events | event_id, optional shipment_id FK, type, severity, location, occurred_at, source/status, details |
| suppliers | supplier_id, source mapping, name, region, status |
| supplier_metrics | supplier_id, window, on_time_rate, failure_rate, sample_size, source |
| inventory_snapshots | SKU, warehouse, quantity/unit, available_at, source, verified |
| source_mappings | source_system, entity_type, external_id, internal_id, verified_at |
| risk_predictions | prediction_id, shipment_id, nullable probability, band, method/model version, feature snapshot, time, quality |
| alerts | alert_id, event key, optional shipment, severity, status, message, created/resolved times |
| simulation_runs | scenario_id, type, inputs, outputs, simulated_at, user |
| dataset_imports | import_id, filename, checksum, source, status, row count, errors, time, user |

Use structured columns for join/filter fields and JSON only for flexible provenance/details. Keep personal data minimal; define retention/deletion.

## 18. Backend API Specification

Base path: /api. Validate with Pydantic, apply bounds/pagination, and return a request ID header. Standard error body:

~~~json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "details": [{"field": "shipment_id", "issue": "required"}],
    "correlation_id": "req_01..."
  }
}
~~~

Use 400 malformed request, 401 unauthenticated, 403 forbidden, 404 not found, 409 conflict, 413 too large, 422 schema error, 429 rate limit, 502 upstream error, 503 unavailable, and 500 unexpected error. Never return stack traces.

| Endpoint | Request | Response |
|---|---|---|
| GET /api/dashboard | Optional date range | as_of, data_status, totals, risk distribution, trend, alerts, nullable impact |
| GET /api/shipments | page/page_size (max 100), q, risk, status, mode, supplier | items, pagination, as_of |
| GET /api/shipments/{shipment_id} | Path ID | shipment, events, nullable prediction, provenance |
| POST /api/predict-risk | Exactly one of shipment_id or features; optional model_version | prediction ID, nullable probability, band, method/version, factors, missing features, validation status |
| GET /api/alerts | status, severity, pagination | items, pagination, as_of |
| GET /api/suppliers | q, risk, pagination | supplier items, metrics, sample size; no unsupported availability claims |
| POST /api/simulate | type, scope, window, intensity, assumptions | scenario ID, simulated flag, baseline/scenario, affected IDs, nullable estimates |
| POST /api/recommendations | shipment ID(s), objective, constraints | options, evidence, trade-offs, unknowns, generated time |
| POST /api/upload-dataset | Multipart CSV, source, optional column map | 202 import ID/status URL/validation summary |
| GET /api/reports | type, date range, filters, CSV format (PDF later) | streamed file/download metadata with filters and provenance |
| POST /api/assistant/chat (local fallback) | conversation_id, message | answer, tool calls, citations, data status, conversation ID |

Prediction example:

~~~json
{"shipment_id": "SH001"}
~~~

~~~json
{
  "prediction_id": "pred_01",
  "shipment_id": "SH001",
  "probability": 0.72,
  "risk_band": "high",
  "method": "random_forest",
  "model_version": "rf-demo-01",
  "top_factors": [{"feature": "forecast_precipitation_mm", "value": 48, "direction": "increases_risk"}],
  "missing_features": [],
  "validation_status": "illustrative_demo",
  "provenance": [{"source": "demo_fixture", "status": "simulated"}]
}
~~~

Example values are illustrative and not computed from a workspace dataset. Upload limits should start at 10 MB, with CSV-only validation, row/header limits, row-level errors, no model/pickle uploads, and malware scanning where available. Escape CSV exports against formula injection. Restrict date ranges and coordinate bounds.

## 19. Frontend Design Specification

- Dark navy base, electric blue actions, cyan highlights, muted slate surfaces, and semantic risk colors; do not rely on color alone.
- Modern sans-serif typography, consistent spacing, restrained glass panels, and reduced-motion-aware transitions.
- Navigation: Overview, Shipments, Disruptions, Suppliers, Simulator, Recovery Planner, Reports, Assistant.
- Header shows environment label (Demo, Imported, Connected), refresh time, page, and account.
- Reusable cards, tables, filters, status chips, dialogs, chart tooltips, loading/error/empty states.
- Dense tables become mobile cards; key actions remain accessible.
- Target WCAG 2.1 AA practices: semantic labels/headings, keyboard control, visible focus, contrast, and chart/map alternatives.

## 20. Shipment Tracking Architecture

Store timestamped positions with source, accuracy, and simulated flag. Route adapter accepts origin/destination coordinates. Leaflet draws basemap, endpoints, route, positions, and event markers. Each marker shows source and observed time.

Demo Bengaluru-to-Mumbai locations must be labeled illustrative/simulated. OSRM may provide route geometry, distance, and profile-based duration; it cannot establish actual position, current traffic, closure, or carrier feasibility. Real tracking needs a contracted carrier/telematics feed. Show OSM attribution and use a tile provider whose terms, caching, capacity, and usage policies fit the application; do not bulk-fetch standard community tiles.

## 21. What-if Simulator

Inputs: scenario type, affected shipment/supplier/location, time window, intensity/magnitude, and explicit assumptions for missing facts.

1. Snapshot baseline fields and prediction/version.
2. Match affected shipments using explicit supplier links, corridor overlap, radius, and time.
3. Apply deterministic scenario transformations; rerun ML only when model and features support it.
4. Calculate delay/cost only with available baseline, transformation, units, and conversion assumptions.
5. Save a separate simulation record; never alter actual shipment/event facts.

Output baseline/scenario risks, affected IDs, nullable delay/cost deltas, assumptions, source status, and responses. Display a Simulation badge and never create real alerts from a scenario.

## 22. AI Recovery Planner

Possible options include alternate route, priority change, inventory transfer, and alternate supplier, but only when required evidence exists. Rank transparently:

- minimize_delay: validated ETA/delay reduction, then cost.
- minimize_cost: verified incremental cost, then ETA impact.
- balance_cost_and_delay: configurable weights shown to the user.

Every option includes evidence, freshness, estimates where calculable, trade-offs, and unknowns. Unknown stock, supplier capacity, route availability, or cost means the option is not verified executable. Human approval is required for transactions.

## 23. Security Requirements

- Store provider, LLM, SAP, database, and signing secrets in deployment secret management. Never commit real credentials.
- Send only public configuration to the browser; call providers and SAP from backend.
- Use HTTPS, secure sessions/short-lived tokens, CSRF protection for cookie sessions, and CORS allowlists.
- Authenticate and authorize analyst/planner/admin actions; scope data by tenant/organization.
- Validate inputs/files and use parameterized SQL/output escaping.
- Rate-limit upload, prediction, simulation, and assistant routes.
- Bound outbound hosts, timeouts, and response sizes where possible.
- Audit imports, predictions, scenarios, reports, and future SAP actions. Redact secrets and sensitive prompt content.
- Minimize sensitive data sent to LLMs; follow retention, residency, and provider terms.
- Protect CSV exports from formula injection; isolate model artifacts from user uploads.
- Use least-privilege SAP identities. Never expose credentials or internal endpoints to agent/browser.

## 24. User Workflow

1. User opens dashboard and sees active environment/data freshness.
2. UI requests dashboard summaries and shipment list.
3. Backend reads normalized records and provenance.
4. Prediction service returns ML, rules-based, or unknown result.
5. Alert service deduplicates alerts from configured thresholds and evidence.
6. Map renders endpoints, route estimates, available positions, and events.
7. User asks the assistant for an explanation.
8. Agent invokes shipment/risk/weather/supplier tools.
9. Backend validates authorization; agent explains tool results and uncertainty.
10. User runs a simulation or requests recovery options.
11. Planner reviews evidence and trade-offs; no automatic operation occurs.
12. User exports a report with filters, timestamps, versions, and source labels.

## 25. Hackathon Demo Scenario

Create synthetic shipment SH001 from Bengaluru to Mumbai, plus a simulated heavy-rainfall event over part of its route and transit window. All values below are illustrative, not actual weather, traffic, cost, carrier, or route data.

1. Dashboard shows a demo badge and one simulated weather alert.
2. Shipment detail shows endpoints, simulated location, estimate source, ETA, and timestamp.
3. Weather panel marks the event “Simulated scenario.”
4. Illustrative baseline risk may be 0.28 Low and scenario risk 0.74 High only if a valid demo model exists. Otherwise call it a scenario rule score.
5. Explain changed weather/event features and missing inputs.
6. Highlight the illustrative affected corridor on map.
7. Agent calls shipment, prediction, weather, and affected-shipment tools and cites returned records.
8. Show alternate route only if provider returns it; label duration as a route estimate. Cost remains unavailable unless seeded.
9. A +6 hour delay may be shown only as an explicit demo assumption.
10. Export a report with all demo labels and assumptions.

## 26. Project Folder Structure

Recommended implementation structure; it does not yet exist:

~~~text
smart-supply-chain/
  frontend/src/{app,components,features,services,hooks,styles}/
  frontend/public/
  backend/app/{api/routes,core,db,models,schemas,services,integrations,agent,ml}/
  backend/app/integrations/{weather,routing,sap}/
  backend/app/agent/{tools,local_adapter.py,mcp_adapter.py}
  backend/app/ml/{preprocessing.py,train.py,predict.py}
  backend/data/demo/
  backend/migrations/
  docs/
  spec.md
~~~

Keep secrets, generated exports, databases, large datasets, and executable model artifacts out of source control. A tiny synthetic fixture may be included only when intentionally approved.

## 27. Development Roadmap

Prioritize a thin end-to-end path: import/sample data -> shipment list/detail -> one risk result -> alert -> scenario -> assistant tool call -> CSV report.

| Phase | Objectives / files | Dependencies | Expected output and verification |
|---|---|---|---|
| 1. Setup and UI | Vite/React, FastAPI, theme/navigation; frontend/src, backend/app/main.py | Node/Python | Local app/API start; responsive and accessible shell |
| 2. Dashboard/modules | Overview, shipments, alerts, suppliers, assistant UI; frontend features/components | Phase 1, API contracts | Loading/error/empty states and filters verified |
| 3. Dataset | Inspect CSV, target, missingness, duplicates, leakage, joins; importer service/schema | Dataset or labeled fixture | Import summary and row errors verified |
| 4. ML | Pipeline, LR/RF, evaluation, manifest, prediction; backend/app/ml | Phase 3, valid labels | Versioned model or explicit unavailable state; holdout and schema behavior verified |
| 5. API | Endpoints, DB/migrations, auth boundary, errors, pagination; backend/app/api/db | Prior contracts | Validation, authorization, errors, persistence verified |
| 6. Map | Leaflet layers, route adapter, labels; MapView and routing integration | Coordinates/provider terms | Simulated/live distinctions, timeout and attribution verified |
| 7. Agent/SAP | Eight tools, local adapter, optional MCP, BTP/Joule docs; backend/app/agent and integrations/sap | Schemas/auth; tenant for Joule | Grounded tool answers; verify permissions/timeouts; claim SAP only after tenant test |
| 8. Simulator | Isolated event matching and scenario calculation; simulation service/UI | Data and prediction | Reproducible scenario; verify no actual-data mutation |
| 9. Recovery | Route/inventory evidence and objective ranking; recovery service/UI | Verified data/providers | Partial plans expose unknowns; no invented facts |
| 10. Quality/deploy | CI, checks, secrets, durable DB, monitoring, runbook | Working MVP and hosting | Staging demo, rollback, security review, rehearsal |

Roadmap testing requirements describe future implementation work; this specification task does not implement or run tests.

## 28. Testing Strategy

Implementation should include unit tests for parsing, conversions, features, risk bands, event matching, scenarios, ranking, and tool validation; API tests for schema/auth/not-found/provider errors/rate limits/uploads; data tests for target validity, duplicates, leakage, split integrity, and key reconciliation; ML held-out and calibration evaluation; agent tool-selection/grounding/authorization/no-data tests; frontend responsive, keyboard, labels, loading/error, and map attribution checks; and one synthetic end-to-end journey.

If SAP is configured, verify exact destination, scopes, API version, permissions, errors, audit trail, and Joule tool invocation. Use synthetic fixtures for deterministic tests. Never evaluate on training data or tune thresholds on the final test set.

## 29. Deployment Strategy

### Hackathon

Frontend may use Vercel; backend may use Render or another Python host with health checks and secret configuration. SQLite is suitable only for a short demo on durable single-instance storage; otherwise use managed PostgreSQL. Keep model artifacts trusted/server-side. Configure provider terms, keys, attribution, timeouts, HTTPS, and strict CORS.

### SAP-enabled

Use a BTP subaccount and approved destinations/identity. Confirm Joule entitlement and MCP/tool support for the tenant. Place SAP APIs behind backend adapters and Integration Suite/API Management where needed. Document API version, communication scenario, identity, scope, and tenant setup. Do not say “SAP integrated” until configured and end-to-end tested.

## 30. Future Enhancements

- Carrier GPS, traffic, port, and verified weather/event feeds.
- Event streaming and near-real-time alert evaluation.
- Managed relational/time-series storage, tenant isolation, retention, and drift monitoring.
- More robust delay forecasting and retraining governance.
- Supplier graph from verified BOM, purchase-order, and sourcing records.
- Licensed geopolitical/market risk providers with source confidence.
- Joule deployment and approved SAP write-back with explicit human approval, idempotency, and audit.
- PDF and scheduled reports.

## 31. Success Criteria and Expected Outcomes

1. Users can inspect sample/imported shipments end to end with clear data labels.
2. Dashboard totals reconcile to the displayed dataset.
3. Risk is validated ML, explicit rules, or unknown; never misleading.
4. Evidence, missing inputs, freshness, model version, and provenance are visible.
5. Simulation is reproducible and isolated from actual records.
6. Recovery plans show evidence/trade-offs and never invent availability, cost, or live conditions.
7. Assistant answers supported questions using tools and admits missing data.
8. CSV reports preserve filters, provenance, and simulation labels.
9. No credentials appear in frontend assets or source control.
10. SAP is described as live only after actual tenant access, configuration, authorization, and end-to-end verification.

### Reference documentation

- [SAP Help — Joule Studio agents](https://help.sap.com/docs/joule-studio/joule-studio/agents?version=CLOUD)
- [SAP Help — Add MCP Servers to Your Joule Agent](https://help.sap.com/docs/Joule_Studio/45f9d2b8914b4f0ba731570ff9a85313/3d9dfad0bc39468292d508f0808a12fe.html)
- [SAP Help — Integration Suite API Management](https://help.sap.com/docs/integration-suite/isuite-integrations-and-apis/api-management)
- [SAP Help — Business Partner A2X OData API](https://help.sap.com/docs/SAP_S4HANA_CLOUD/3c916ef10fc240c9afc594b346ffaf77/85043858ea0f9244e10000000a4450e5.html)
- [Open-Meteo API](https://open-meteo.com/en/docs) and [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api)
- [OSRM API](https://project-osrm.org/docs/v5.24.0/api/)
- [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)

Recheck provider terms, product capabilities, API versions, and SAP entitlements during implementation; these vary by provider, release, region, and tenant.
