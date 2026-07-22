"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import experienceData from "@/data/experience.json";

function WorkCard({ item, index }: { item: (typeof experienceData.work)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold leading-tight">{item.role}</h4>
              <p className="text-sm text-muted-foreground">
                {item.org} · {item.location}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {item.start} — {item.end ?? "Present"}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

          {item.highlights?.length > 0 && (
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}

          {item.tools?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tools.map((tool) => (
                <Badge key={tool} variant="muted">
                  {tool}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EducationCard({ item, index }: { item: (typeof experienceData.education)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="font-semibold leading-tight">{item.role}</h4>
              <p className="text-sm text-muted-foreground">
                {item.org} · {item.location}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {item.start} — {item.end}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Timeline() {
  const { work, education, certifications, awards } = experienceData;

  return (
    <section id="experience" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience & Education</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Career history, postgraduate study, and certifications.
        </p>

        <div className="mt-12">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Briefcase className="h-5 w-5 text-primary" /> Work Experience
          </h3>
          <div className="space-y-5">
            {work.map((item, idx) => (
              <WorkCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <GraduationCap className="h-5 w-5 text-primary" /> Education
          </h3>
          <div className="space-y-5">
            {education.map((item, idx) => (
              <EducationCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Award className="h-5 w-5 text-primary" /> Certifications & Awards
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
              >
                <Card>
                  <CardContent className="p-4">
                    <p className="font-medium leading-snug">{cert.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.org}{cert.year ? ` · ${cert.year}` : ""}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {awards.map((award, idx) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: Math.min((certifications.length + idx) * 0.04, 0.3) }}
              >
                <Card>
                  <CardContent className="p-4">
                    <p className="font-medium leading-snug">{award.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {award.org} · {award.year}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
