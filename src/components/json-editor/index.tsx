import Editor from "@monaco-editor/react";
import { Skeleton } from "../skeleton";

type Props = {
  value: string;
  onChange: (value: string) => void;
  showSkeleton?: boolean;
  isError?: boolean;
};

export function JsonEditor({
  value,
  onChange,
  showSkeleton = false,
  isError = false,
}: Props) {
  return (
    <Skeleton show={showSkeleton} className="rounded-md">
      <div
        className={`rounded-md overflow-hidden border ${isError ? "border-error" : "border-border"}`}
      >
        <Editor
          height="280px"
          defaultLanguage="json"
          value={value}
          onChange={(v) => onChange(v ?? "")}
          onMount={(_editor, monaco) => {
            document.fonts.ready.then(() => monaco.editor.remeasureFonts());
          }}
          loading={
            <div className="bg-[#1f1f1f] w-full h-full flex items-center justify-center font-medium">
              Loading editor...
            </div>
          }
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            formatOnPaste: true,
            padding: { top: 16, bottom: 16 },
            fontSize: 13,
            lineHeight: 20,
            fontFamily: "Roboto Mono, monospace",
          }}
        />
      </div>
    </Skeleton>
  );
}
