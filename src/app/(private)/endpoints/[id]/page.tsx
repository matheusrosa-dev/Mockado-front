export default function DetailEndpoint() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-background-secondary p-5">
        <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
          Response body
        </h2>
        <pre className="text-sm text-text-muted font-mono bg-background-tertiary rounded-md p-4 border border-border">
          {"{}"}
        </pre>
      </div>
    </div>
  );
}
