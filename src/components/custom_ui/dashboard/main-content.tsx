// src/components/custom_ui/dashboard/MainContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { WelcomeCard } from "./welcome-card";
import { StatCard } from "./stat-card";
import { FileText, CheckCircle, Clock, Activity } from "lucide-react";

interface MainContentProps {
  selectedSection: string;
}

export function MainContent({ selectedSection }: MainContentProps) {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gloso-Dash</h1>
      </div>

      {selectedSection === "projects" && (
        <section
          id="projects"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-300"
        >
          <WelcomeCard />
          <StatCard
            title="Total Project"
            value="1206"
            icon={FileText}
            iconColor="text-blue-400"
            valueColor="text-blue-400"
          />
          <StatCard
            title="Completed"
            value="240"
            icon={CheckCircle}
            iconColor="text-green-400"
            valueColor="text-green-400"
          />
          <StatCard
            title="In Progress"
            value="96"
            icon={Clock}
            iconColor="text-red-400"
            valueColor="text-red-400"
          />
          <StatCard
            title="Active Project"
            value="18"
            icon={Activity}
            iconColor="text-cyan-400"
            valueColor="text-cyan-400"
          />
        </section>
      )}
    </main>
  );
}
