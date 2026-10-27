"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { captureReferral } from "@/lib/referral";

/** Records UTM parameters, alumni ref codes, referrer and landing page for the application form. */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
    captureReferral();
  }, []);
  return null;
}
