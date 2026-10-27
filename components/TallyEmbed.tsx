"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { captureAttribution, withAttribution } from "@/lib/attribution";
import { captureReferral } from "@/lib/referral";

export const TALLY_FORM_ID = "RGEVxj";
const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

type TallyWindow = Window & {
  Tally?: { loadEmbeds: () => void };
};

function loadEmbeds() {
  (window as TallyWindow).Tally?.loadEmbeds();
}

export default function TallyEmbed() {
  // The embed URL is built on the client so attribution captured on any
  // landing page (UTM, referrer, alumni ref code) reaches the form's hidden fields.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Drop any raw ref left in session attribution; only a validated stored code is sent.
    const { ref: _ignored, ...attribution } = captureAttribution();
    const code = captureReferral();
    setSrc(withAttribution(TALLY_EMBED_URL, code ? { ...attribution, ref: code } : attribution));
  }, []);

  // Runs after the iframe with its final data-tally-src is in the DOM.
  // Covers client-side navigation where embed.js is already loaded.
  useEffect(() => {
    if (src) loadEmbeds();
  }, [src]);

  return (
    <>
      {src && (
        <iframe
          data-tally-src={src}
          loading="lazy"
          width="100%"
          height="900"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Apollo Cohort II application"
          className="w-full block"
        />
      )}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
      />
    </>
  );
}
