"use client";

import { Quote } from "lucide-react";
import { COHORT1_TESTIMONIALS } from "@/lib/constants";

type Testimonial = (typeof COHORT1_TESTIMONIALS)[number];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="glass glass-hover rounded-3xl p-8 flex flex-col w-[320px] sm:w-[400px] md:w-[440px] flex-shrink-0">
      <Quote size={28} className="text-brand-purple-400 mb-4 flex-shrink-0" />
      <p className="text-gray-600 leading-relaxed mb-6 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div>
        <div className="font-semibold text-gray-900">{testimonial.name}</div>
        <div className="text-sm text-brand-purple-500 font-medium">
          {testimonial.role}
        </div>
      </div>
    </article>
  );
}

export default function TestimonialCarousel() {
  return (
    <div
      className="marquee relative -mx-6 md:mx-0"
      role="region"
      aria-label="Cohort 1 testimonials"
    >
      {/* Track: the list is rendered twice so the loop point is seamless */}
      <div className="marquee-track flex gap-6 w-max py-2">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-6"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {COHORT1_TESTIMONIALS.map((t) => (
              <TestimonialCard key={`${copy}-${t.name}`} testimonial={t} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
