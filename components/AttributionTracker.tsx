"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records UTM parameters, ref codes, referrer and landing page for the application form. */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
