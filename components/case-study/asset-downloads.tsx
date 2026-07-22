import { Download, FileSpreadsheet, FileJson, FileText, FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DownloadItem = { label: string; fileUrl: string; fileType: string };

const iconFor = (fileType: string) => {
  if (fileType === "xlsx" || fileType === "csv") return FileSpreadsheet;
  if (fileType === "notebook") return FileCode;
  if (fileType === "pdf") return FileText;
  return FileJson;
};

export function AssetDownloads({ downloads }: { downloads: DownloadItem[] }) {
  if (!downloads?.length) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <Download className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">Downloadable Assets</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {downloads.map((item) => {
          const Icon = iconFor(item.fileType);
          return (
            <a
              key={item.label}
              href={item.fileUrl}
              download
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
