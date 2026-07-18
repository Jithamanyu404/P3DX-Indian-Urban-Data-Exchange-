import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <EmptyState icon={Compass} title="Page not found" description="This route doesn't exist in the Meridian network." />
        <Link to="/" className="text-[13px] text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] transition-colors">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
