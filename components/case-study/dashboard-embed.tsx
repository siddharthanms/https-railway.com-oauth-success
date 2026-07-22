import { MonitorPlay } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardEmbedProps = {
  dashboard: { provider: string; title: string; url: string } | null;
};

export function DashboardEmbed({ dashboard }: DashboardEmbedProps) {
  if (!dashboard || !dashboard.url) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <MonitorPlay className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">{dashboard.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
          <iframe src={dashboard.url} title={dashboard.title} className="h-full w-full" allowFullScreen />
        </div>
      </CardContent>
    </Card>
  );
}
