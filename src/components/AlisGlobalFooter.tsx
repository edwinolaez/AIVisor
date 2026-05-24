import { ALIS_GLOBAL } from "@/data/alis";
import { AlisPanel } from "./AlisPanel";

export function AlisGlobalFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 pt-6">
      <AlisPanel
        title="Official Alberta Resources (ALIS)"
        resources={ALIS_GLOBAL.map((r) => ({
          title: r.title,
          url: r.url,
          description: r.description,
        }))}
      />
      <p className="mt-4 text-center text-xs text-slate-400">
        AIVisor complements academic advisors and ALIS — it does not replace them.
        Verify all requirements with your institution and Transfer Alberta.
      </p>
    </footer>
  );
}
