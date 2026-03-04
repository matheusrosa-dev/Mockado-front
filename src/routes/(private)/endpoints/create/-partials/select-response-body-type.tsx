import { ResponseBodyType } from "../-types";

const OPTIONS = Object.values(ResponseBodyType).map((value) => ({
  value,
  label: value.toUpperCase(),
}));

type Props = {
  value: ResponseBodyType;
  onChange: (value: ResponseBodyType) => void;
};

export function SelectResponseBodyType({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors select-none cursor-pointer
              ${
                isActive
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border bg-background-tertiary text-text-muted hover:text-white hover:border-accent/30"
              }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
