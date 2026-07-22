import { Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type VideoData = { provider: string; title: string; url: string } | null;

function toEmbedUrl(video: NonNullable<VideoData>) {
  if (video.provider === "youtube") {
    const idMatch = video.url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const id = idMatch?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : video.url;
  }
  return video.url;
}

export function VideoEmbed({ video }: { video: VideoData }) {
  if (!video || !video.url) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <Video className="h-5 w-5 text-primary" />
        <CardTitle className="text-base">{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
          <iframe src={toEmbedUrl(video)} title={video.title} className="h-full w-full" allowFullScreen />
        </div>
      </CardContent>
    </Card>
  );
}
