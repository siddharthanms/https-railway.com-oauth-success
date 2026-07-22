"use client";

import * as React from "react";
import { Code2, Github, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Snippet = { language: string; title: string; githubUrl?: string; code: string };

export function CodeDrawer({ snippets }: { snippets: Snippet[] }) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  if (!snippets?.length) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <Code2 className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Code & Queries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {snippets.map((snippet, idx) => {
          const open = openIdx === idx;
          return (
            <div key={snippet.title} className="overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setOpenIdx(open ? null : idx)}
                className="flex w-full items-center justify-between gap-2 bg-muted/40 px-4 py-3 text-left text-sm font-medium"
              >
                <span>
                  {snippet.title} <span className="text-muted-foreground">· {snippet.language}</span>
                </span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")} />
              </button>
              {open && (
                <div className="border-t border-border">
                  <pre className="overflow-x-auto bg-[#0d1117] p-4 text-xs leading-relaxed text-[#c9d1d9]">
                    <code>{snippet.code}</code>
                  </pre>
                  {snippet.githubUrl && (
                    <div className="border-t border-border p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(snippet.githubUrl, "_blank")}
                      >
                        <Github className="h-4 w-4" /> View on GitHub
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
