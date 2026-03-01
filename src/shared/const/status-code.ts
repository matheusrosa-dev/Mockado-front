export const STATUS_CODE_GROUPS = {
  "1xx": {
    range: "1xx",
    label: "Informational",
    color: "text-text-muted",
    badgeClass: "bg-white/10 text-text-muted",
  },
  "2xx": {
    range: "2xx",
    label: "Success",
    color: "text-method-post",
    badgeClass: "bg-method-post-bg text-method-post",
  },
  "3xx": {
    range: "3xx",
    label: "Redirection",
    color: "text-accent-hover",
    badgeClass: "bg-accent/10 text-accent-hover",
  },
  "4xx": {
    range: "4xx",
    label: "Client Error",
    color: "text-method-put",
    badgeClass: "bg-method-put-bg text-method-put",
  },
  "5xx": {
    range: "5xx",
    label: "Server Error",
    color: "text-method-delete",
    badgeClass: "bg-method-delete-bg text-method-delete",
  },
} as const;
