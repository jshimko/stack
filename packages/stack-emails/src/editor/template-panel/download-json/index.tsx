import { Download } from "lucide-react";
import { useMemo } from "react";
import { Button } from "@stackframe/stack-ui";
import { useDocument } from "../../documents/editor/editor-context";

export default function DownloadJson() {
  const doc = useDocument();
  useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, "  "))}`;
  }, [doc]);
  return (
    <Button
      onClick={() => {
        const blob = new Blob([JSON.stringify(doc, null, "  ")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "emailTemplate.json";
        a.click();
        URL.revokeObjectURL(url);
      }}
      variant="secondary"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download JSON
    </Button>
  );
}
