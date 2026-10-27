# EcoTrack — Mission LiFE (HackCult '26)

**Problem statement:** HC26-GEDA01 — Development of an Interactive "Mission LiFE" Citizen Engagement Application  
**Track:** Green Energy & Sustainability  
**Organisation:** Gujarat Energy Development Agency (GEDA)

## What this MVP includes
- Responsive dashboard with estimated daily carbon footprint and electricity use
- Personal footprint calculator with editable daily activity inputs
- Green habit challenges with points and completion state
- Rooftop solar potential and approximate bill-offset calculator
- Community leaderboard preview and copyable invite
- Browser `localStorage` persistence, so entries and challenge progress remain on the same browser/device

## Run locally
No build tools or package installation are required:
1. Download and extract the project folder.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Use the sidebar navigation to test the calculators and challenges.

For a local development server, open a terminal in this folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Important calculation notes
This is a hackathon MVP and uses transparent illustrative assumptions, not official measurements:
- Electricity: 0.4 kg CO₂e/kWh
- Personal motor travel: 0.12 kg CO₂e/km
- Public transport: 0.04 kg CO₂e/km
- Meat-based meal: 1.5 kg CO₂e/meal
- Solar: 100 sq. ft. per approximate kW, 4 kWh/day per kW under good sun, ₹7/kWh for rough bill-offset estimate

Real factors vary by grid mix, vehicle, diet, city, tariff, roof shading and system efficiency. Solar output and savings are not guaranteed.

## Before final submission
- Check the official HackCult portal for required submission format, deadline, demo video and repository/deployment requirements.
- Replace sample leaderboard entries with real shared data only if backend/authentication are implemented.
- Add screenshots and a short demo video of the actual working app.
- Do not claim a cloud database, AI recommendations, real-time grid data, or live community rankings in this MVP: those are future enhancements, not currently implemented.
- Deploy the folder as a static site (for example GitHub Pages or Netlify) if the portal accepts a live demo URL.

## Suggested next version
A backend with user authentication and a database could enable cross-device accounts and real community rankings. An official emissions-factor dataset and location-aware solar data would improve accuracy.
