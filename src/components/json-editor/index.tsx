import Editor from "@monaco-editor/react";
import { Skeleton } from "../skeleton";

type Props = {
  value: string;
  onChange: (value: string) => void;
  showSkeleton?: boolean;
};

export function JsonEditor({ value, onChange, showSkeleton = false }: Props) {
  return (
    <Skeleton show={showSkeleton} className="rounded-md">
      <div className="rounded-md overflow-hidden border border-border">
        <Editor
          height="280px"
          defaultLanguage="json"
          value={value}
          onChange={(v) => onChange(v ?? "")}
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
          }}
        />
      </div>
    </Skeleton>
  );
}
