import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
//   integrations: [
//     Sentry.reactRouterV6BrowserTracingIntegration({
//       useEffect: React.useEffect,
//     }),
//     Sentry.metrics.metricsAggregatorIntegration(),
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration(),
//   ],
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
//   autoSessionTracking: false,
// });
Sentry.init({
  dsn: "https://86011c479dc3173d0c85bc297ae91368@o4507028157693952.ingest.us.sentry.io/4507028237844485",
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.browserTracingIntegration({ enableInp: true }),
    Sentry.metrics.metricsAggregatorIntegration(),

    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  tracesSampleRate: 1.0,

  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

-ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
