# KrushiDisha

An AI-powered market linkage and price discovery platform developed as a Minimum Viable Product (MVP) for Smart India Hackathon 2026.

## Overview

KrushiDisha helps farmers make informed decisions by recommending the most profitable buyer based on market price, transportation cost, buyer demand, quality compatibility, and distance. The platform also provides AI-assisted crop planning using historical price trends, seasonal demand, and district-wise rainfall suitability.

This repository demonstrates the complete workflow of the proposed solution using representative datasets.

## Features

- AI-based buyer recommendation
- Net profit calculation after transport cost
- AI crop planning for the next season
- Digital payment tracking with downloadable receipt
- Bilingual interface (English and Marathi)
- Responsive mobile-first user interface

## AI Decision Logic

### Buyer Recommendation

The recommendation engine evaluates verified buyers using a weighted scoring model:

```text
Score = (Price × 0.5) + (Demand × 20) + (Rainfall × 10)
```

### Net Profit

```text
Net Profit = (Market Price × Quantity) − (Transport Cost × Quantity)
```

The buyer with the highest score and expected net profit is recommended to the farmer.

## Technology Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend |
| React Router | Navigation |
| Tailwind CSS | User Interface |
| PapaParse | CSV Data Parsing |
| JavaScript | Business Logic |
| Vite | Build Tool |

## Project Structure

```text
KrushiDisha/
├── public/
│   ├── data/
│   │   ├── Market_Wise_Price.csv
│   │   └── buyers.csv
│   └── maharashtra-logo.png
│
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── SellCrop.jsx
│   │   ├── Recommendation.jsx
│   │   ├── AIPlanning.jsx
│   │   └── Payment.jsx
│   ├── utils/
│   │   └── translations.js
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/KrushiDisha.git
cd KrushiDisha
npm install
```

### Run the Project

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Future Scope

- Live AGMARKNET market price integration
- Verified buyer and farmer authentication
- Logistics partner integration
- UPI and direct bank payment support
- Weather API integration
- Multi-state language support

## Disclaimer

KrushiDisha is a **Minimum Viable Product (MVP)** developed for Smart India Hackathon 2026. The market data, buyer records, payment flow, and farmer profile included in this prototype are representative and intended solely to demonstrate the proposed system's workflow.
