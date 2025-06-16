// src/components/custom_ui/dashboard/stat-card.tsx
"use client";

import React from "react"; // Added explicit import
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Updated to specify SVG props
  iconColor: string;
  valueColor: string;
}

export function StatCard({ title, value, icon, iconColor, valueColor }: StatCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {React.createElement(icon, {
            className: `w-6 h-6 ${iconColor}`,
          })}
        </div>
        <div className="space-y-2">
          <p className="text-slate-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Project Progress</span>
            <span className="text-xs text-green-400 flex items-center">
              +8.2 <TrendingUp className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}