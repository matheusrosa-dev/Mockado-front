import Editor, { type Monaco } from "@monaco-editor/react";
import { useRef } from "react";
import type { editor } from "monaco-editor";
import { Skeleton } from "../skeleton";
import { PiBracketsCurlyBold } from "react-icons/pi";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  showSkeleton?: boolean;
  error?: string;
};

export function JsonEditor({
  value,
  onChange,
  showSkeleton = false,
  error,
}: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleFormat = () => {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  };

  const handleMount = (
    editorInstance: editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    editorRef.current = editorInstance;
    document.fonts.ready.then(() => monaco.editor.remeasureFonts());
  };

  return (
    <Skeleton show={showSkeleton} className="rounded-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 min-h-5">
          {error && <span className="text-xs text-error">{error}</span>}
          <button
            type="button"
            onClick={handleFormat}
            className="ml-auto flex items-center gap-1.5 text-xs text-text-muted hover:text-white/90 cursor-pointer duration-150 select-none"
          >
            <PiBracketsCurlyBold className="text-sm" />
            Format
          </button>
        </div>

        <div
          className={`rounded-md overflow-hidden border ${error ? "border-error" : "border-border"}`}
        >
          <Editor
            height="280px"
            defaultLanguage="json"
            value={value}
            onChange={(v) => onChange(v ?? "")}
            onMount={handleMount}
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
      </div>
    </Skeleton>
  );
}
