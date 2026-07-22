import { FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Doc = { title: string; type: string; url: string };

export function DocumentViewer({ documents }: { documents: Doc[] }) {
  if (!documents?.length) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <FileText className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Documents</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2">
        {documents.map((doc) => (
          <a
            key={doc.title}
            href={doc.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:border-primary hover:bg-accent"
          >
            <span>{doc.title}</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
