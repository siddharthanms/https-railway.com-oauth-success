"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import profile from "@/data/profile.json";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeajgbeq";

type Status = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = React.useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);

    data.append("_subject", `Portfolio enquiry from ${data.get("name")}`);

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        formEl.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <p className="text-sm font-medium">Message sent — thanks for reaching out.</p>
                  <p className="text-sm text-muted-foreground">
                    I&rsquo;ll get back to you as soon as I can.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm text-primary underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Honeypot - hidden from humans, catches bots */}
                  <input
                    type="checkbox"
                    name="_gotcha"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

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

                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span>
                        Something went wrong sending that. Please email me directly at{" "}
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-medium underline underline-offset-4"
                        >
                          {profile.email}
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <Button type="submit" className="gap-2" disabled={status === "sending"}>
                    <Send className="h-4 w-4" />
                    {status === "sending" ? "Sending…" : "Send Message"}
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
