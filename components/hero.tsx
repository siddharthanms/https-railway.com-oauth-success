"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Mail, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import profile from "@/data/profile.json";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  mail: Mail,
  phone: Phone,
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24 sm:py-32">
      <div className="container grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {profile.location}
          </p>
          <h1 className="font-serif text-4xl font-normal leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {profile.headline}
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-[1.75] text-muted-foreground sm:text-base">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {profile.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                className={cn(
                  buttonVariants({
                    variant: cta.style === "primary" ? "default" : "outline",
                    size: "lg",
                  })
                )}
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            {profile.socials.map((social) => {
              const Icon = iconMap[social.icon] ?? Mail;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto"
        >
          <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-lg ring-1 ring-border sm:w-64">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="(max-width: 640px) 224px, 256px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
