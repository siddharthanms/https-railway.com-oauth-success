"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import skillsData from "@/data/skills.json";

export function SkillsMatrix() {
  return (
    <section id="skills" className="border-y border-border/60 bg-muted/30 py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Tools</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A working toolkit spanning hands-on technical analysis and business-facing analysis.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skillsData.categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{category.label}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
