import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target, Wrench, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmbed } from "@/components/case-study/dashboard-embed";
import { DocumentViewer } from "@/components/case-study/document-viewer";
import { CodeDrawer } from "@/components/case-study/code-drawer";
import { VideoEmbed } from "@/components/case-study/video-embed";
import { AssetDownloads } from "@/components/case-study/asset-downloads";
import projectsData from "@/data/projects.json";

type Props = { params: { slug: string } };

function getProject(slug: string) {
  return projectsData.projects.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: `${project.title} — Case Study`, description: project.tagline };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const media = project.media;
  const hasMedia =
    !!media.dashboardEmbed ||
    (media.documents?.length ?? 0) > 0 ||
    (media.codeSnippets?.length ?? 0) > 0 ||
    !!media.video ||
    (media.downloads?.length ?? 0) > 0;

  return (
    <article className="py-16">
      <div className="container max-w-4xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to case studies
        </Link>

        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {project.org} · {project.year}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <SectionHeading icon={Target} title="The Business Problem" />
            <p className="text-muted-foreground">{project.businessProblem.context}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Goals</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                  {project.businessProblem.goals.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold">Pain Points</h3>
                <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                  {project.businessProblem.painPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionHeading icon={Wrench} title="Approach & Tools" />
            <p className="text-muted-foreground">{project.approach.methodology}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.approach.tools.map((tool) => (
                <Badge key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Data sources: </span>
              {project.approach.dataSources.join(", ")}
            </p>
          </section>

          <section>
            <SectionHeading icon={Lightbulb} title="Key Insights" />
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              {project.insights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
            {(project.visualizations as { type: string; title: string; description: string; image?: string }[]).length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(project.visualizations as { type: string; title: string; description: string; image?: string }[]).map((viz) => (
                  <Card key={viz.title} className="overflow-hidden">
                    {viz.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={viz.image}
                        alt={viz.title}
                        className="w-full border-b border-border bg-white object-contain"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-sm">{viz.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-xs text-muted-foreground">
                      {viz.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionHeading icon={TrendingUp} title="Recommendations & Impact" />
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              {project.recommendations.map((rec) => (
                <li key={rec}>{rec}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
              <span className="font-semibold">Impact: </span>
              {project.roi}
            </p>
          </section>

          {hasMedia && (
            <section className="space-y-6">
              <h2 className="text-xl font-semibold tracking-tight">Project Artifacts</h2>
              <DashboardEmbed dashboard={media.dashboardEmbed} />
              <div className="grid gap-6 lg:grid-cols-2">
                <DocumentViewer documents={media.documents} />
                <AssetDownloads downloads={media.downloads} />
              </div>
              <CodeDrawer snippets={media.codeSnippets} />
              <VideoEmbed video={media.video} />
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
