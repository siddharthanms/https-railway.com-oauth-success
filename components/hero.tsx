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
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12),_transparent_60%)]" />
      <div className="container grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            {profile.location}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
          <div className="relative h-56 w-56 overflow-hidden rounded-3xl border-4 border-background shadow-xl ring-1 ring-border sm:h-72 sm:w-72">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="288px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
