import { Skeleton } from "@components";
import { ResponseBodyType } from "@shared/const/endpoint";

const OPTIONS = Object.values(ResponseBodyType).map((value) => ({
  value,
  label: value.toUpperCase(),
}));

type Props = {
  value: ResponseBodyType;
  showSkeleton?: boolean;
  disabled?: boolean;
  onChange: (value: ResponseBodyType) => void;
};

export function SelectBodyType({
  value,
  onChange,
  showSkeleton = false,
  disabled = false,
}: Props) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {OPTIONS.map((option) => {
        const isActive = value === option.value;

        return (
          <Skeleton show={showSkeleton} key={option.value} className="rounded">
            <button
              type="button"
              onClick={() => onChange(option.value)}
              disabled={disabled || showSkeleton}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors select-none cursor-pointer
              ${
                isActive
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border bg-background-tertiary text-text-muted hover:text-white hover:border-accent/30"
              }`}
            >
              {option.label}
            </button>
          </Skeleton>
        );
      })}
    </div>
  );
}
