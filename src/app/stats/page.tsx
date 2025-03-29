import { StatsPrint } from "@/app/components/statsprint";
import { StatsOverview } from "../components/overview";

export default function Stats() {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-slate-700 flex flex-col p-4">
      <StatsOverview />
    </div>
  );
}
