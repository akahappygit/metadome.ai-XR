# Automotive XR Diagnostic Tool

**Created by:** Ayush Kumar Anand  
**Project:** Product Management Intern Assignment - Automotive XR & GenAI

## Overview

This is an XR (Extended Reality) diagnostic interface designed for automotive technicians working with the Tata Nexon EV 2024. The application provides a heads-up display style interface that simulates what a technician would see through AR glasses while diagnosing vehicle components.

## Features

- **Dual Input Methods**: 
  - Quick scan for instant diagnostics
  - Image upload for component photo analysis
  
- **Smart Fault Detection**: Identifies 6 different diagnostic scenarios including:
  - DC-DC Converter issues (High Voltage)
  - Catalytic Converter problems
  - Coolant Thermostat malfunctions
  - Battery Management System alerts (High Voltage)
  - Ignition Coil Pack failures
  - ECM Communication errors

- **Safety First**: 
  - Conditional high voltage warnings
  - Specific safety instructions per component
  - Visual severity indicators (Critical, High, Moderate, Low)

- **AI-Powered Analysis**:
  - Confidence scoring for each diagnosis
  - Precise scan time tracking
  - Step-by-step repair guidance

## Tech Stack

- **Frontend**: React 19 with Hooks
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with custom AR/HUD theme
- **Icons**: Lucide React
- **Fonts**: Chakra Petch (headings), JetBrains Mono (body)

## Design Philosophy

The interface mimics a real XR headset overlay with:
- Scanline effects for authentic HUD feel
- Grid background simulating AR viewport
- Corner brackets for AR targeting aesthetic
- Neon cyan accents for visibility
- High contrast for easy reading

## Installation

```bash
cd frontend
yarn install
yarn start
```

## Usage

1. Choose either "Start Scan" for quick diagnosis or "Upload Image" to analyze a component photo
2. Wait for the 3-second analysis
3. Review the diagnostic results including fault code, severity, location, and repair steps
4. Follow safety warnings, especially for high voltage components
5. Use "Scan Another Component" to perform additional diagnostics

## Safety Features

- High voltage warnings appear ONLY for components with electrical hazards
- Color-coded severity levels for quick risk assessment
- Specific safety instructions tailored to each component type
- Flashing alert banner for critical high voltage situations

## Project Context

This project was developed as part of a Product Management internship assignment focusing on the intersection of spatial computing (XR), Generative AI, and the automotive industry. It demonstrates:

- User-centered design for automotive technicians
- Safety-first approach to diagnostic tools
- Practical application of XR concepts in a web interface
- Clear information hierarchy for time-critical decisions

## License

This is a student project created for educational and assessment purposes.

---

*Built with attention to real-world automotive technician workflows and safety protocols.*