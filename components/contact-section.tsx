"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import profile from "@/data/profile.json";

export function ContactSection() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.get("name")}`);
    const body = encodeURIComponent(String(form.get("message") ?? ""));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-20">
      <div className="container grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let&rsquo;s talk data</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Open to Data Analyst, Business Analyst and related roles across New Zealand. Reach out
            directly by email or phone.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              {submitted ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Your email client should be open — thanks for reaching out!
                </p>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary focus:ring-2"
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
