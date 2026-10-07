"use client";

import { useEffect } from "react";
import Script from "next/script";

export const TALLY_FORM_ID = "RGEVxj";
const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

type TallyWindow = Window & {
  Tally?: { loadEmbeds: () => void };
};

function loadEmbeds() {
  (window as TallyWindow).Tally?.loadEmbeds();
}

export default function TallyEmbed() {
  // Client-side navigation: embed.js may already be on the page.
  useEffect(() => {
    loadEmbeds();
  }, []);

  return (
    <>
      <iframe
        data-tally-src={TALLY_EMBED_URL}
        loading="lazy"
        width="100%"
        height="900"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Apollo Cohort II application"
        className="w-full block"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
      />
    </>
  );
}
