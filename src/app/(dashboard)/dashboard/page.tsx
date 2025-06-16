// src/app/dashboard/page.tsx
"use client";
import { useLocalStorage } from "usehooks-ts";
import { MainContent } from "@/components/custom_ui/dashboard/main-content";
import { FloatingButton } from "@/components/custom_ui/dashboard/floating-button";

export default function DashboardPage() {
  const [selectedSection, setSelectedSection] = useLocalStorage(
    "selectedSection",
    "projects"
  );

  return (
    <div>
      <div className="flex">
        <MainContent selectedSection={selectedSection} />
      </div>
    </div>
  );
}
