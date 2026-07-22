"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Project = {
  slug: string;
  title: string;
  tagline: string;
  org: string;
  year: string;
  tags: string[];
  thumbnail: string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <CardContent className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-snug">{project.title}</h3>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
            <p className="text-xs text-muted-foreground/80">{project.org} · {project.year}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
