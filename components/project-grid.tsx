"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";

export function ProjectGrid() {
  const projects = projectsData.projects;
  const allTags = React.useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects]
  );

  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects;

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Case Studies</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Deep-dive data & business analysis projects, filterable by focus area.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTag === null ? "default" : "outline"}
            onClick={() => setActiveTag(null)}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={activeTag === tag ? "default" : "outline"}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No case studies tagged &ldquo;{activeTag}&rdquo; yet.
          </p>
        )}
      </div>
    </section>
  );
}
