//import { StatsPrint } from "@/app/components/statsprint";
import { StatsOverview } from "../components/overview";

export default function Stats() {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto bg-black flex flex-col p-4">
      <StatsOverview />
    </div>
  );
}
