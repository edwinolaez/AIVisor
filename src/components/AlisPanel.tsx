import type { AlisResource } from "@/types";

export function AlisPanel({
  resources,
  title = "ALIS Resources",
}: {
  resources: AlisResource[];
  title?: string;
}) {
  if (!resources.length) return null;

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-900">
        <span className="text-base">📚</span> {title}
      </h4>
      <ul className="space-y-2">
        {resources.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg bg-white px-3 py-2 text-sm transition hover:shadow-sm"
            >
              <span className="font-medium text-blue-700 group-hover:underline">
                {r.title}
              </span>
              {r.description && (
                <span className="mt-0.5 block text-xs text-slate-500">{r.description}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
