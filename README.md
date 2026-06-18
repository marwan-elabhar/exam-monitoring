# Exam Monitoring Dashboard

This repository contains a high-performance, real-time dashboard for monitoring online exam candidates. It is built with
Next.js, Redux Toolkit, and Pusher, featuring a responsive design that adapts to both desktop and mobile viewports.

The application is designed to handle a large number of concurrent sessions, using list virtualization to ensure a
smooth and responsive user experience even with thousands of candidates.

Live Demo: https://exam-monitoring-beige.vercel.app/

## Features

* **Live Candidate Feed**: An efficient, virtualized list displays thousands of candidates, with real-time updates for
  status, risk level, and activity.
* **Responsive UI**: A table-based layout for desktop provides a comprehensive overview, while a card-based layout on
  mobile offers a focused, touch-friendly experience.
* **Dynamic Filtering & Sorting**: Instantly search candidates by name or email, and apply filters for risk level and
  session status. Sort the list by the last active time.
* **Detailed Activity View**: A slide-out panel shows a complete, filter-aware timeline of events for each candidate,
  including status changes, flags, and connection drops.
* **Proctor Actions**: Proctors can send predefined warnings or terminate a candidate's session directly from the UI.
* **Real-time Connection Status**: A top banner provides clear feedback on the state of the connection to the live event
  feed (e.g., connecting, reconnecting, failed).
* **Mock Event Simulation**: For local development, a built-in event emitter simulates a live backend by POSTing mock
  events to a Next.js API route, which then forwards them through Pusher, completing the real-time loop.

## Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) / [React](https://react.dev/)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Real-time Communication**: [Pusher](https://pusher.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **List Virtualization**: [TanStack Virtual](https://tanstack.com/virtual/latest)
* **Language**: [TypeScript](https://www.typescriptlang.org/)

## Project Structure

The codebase is organized to separate concerns and improve maintainability.

```
/
├── app/                  # Next.js App Router: pages and API routes
├── components/           # React components, organized by feature and UI elements
├── hooks/                # Custom React hooks (Redux, media queries, etc.)
├── lib/                  # Core logic: utilities, mock data, and real-time services
│   ├── mock/             # Generates mock candidate data
│   └── realtime/         # Pusher client setup and mock event emitter
├── store/                # Redux Toolkit: slices, selectors, and store configuration
└── types/                # TypeScript type definitions for the application
```

## Getting Started

To run the project locally, follow these steps.

### 1. Clone the Repository

```bash
git clone https://github.com/marwan-elabhar/exam-monitoring.git
cd exam-monitoring
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add your Pusher credentials.

```
# .env.local

# Required for real-time updates via Pusher
NEXT_PUBLIC_PUSHER_KEY=<YOUR_PUSHER_KEY>
NEXT_PUBLIC_PUSHER_CLUSTER=<YOUR_PUSHER_CLUSTER>
PUSHER_APP_ID=<YOUR_PUSHER_APP_ID>
PUSHER_SECRET=<YOUR_PUSHER_SECRET>
```

**Note**: If you do not provide Pusher credentials, the application will automatically fall back to using the mock event
emitter for local development.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard. The application will
auto-populate with 10,000 mock candidates, and the mock emitter will start sending real-time events.

## Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Creates a production build of the application.
* `npm run start`: Starts the production server.
* `npm run lint`: Lints the codebase using ESLint.