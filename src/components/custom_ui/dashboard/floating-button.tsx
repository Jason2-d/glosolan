// src/components/custom_ui/dashboard/FloatingButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function FloatingButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Button className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg">
        <User className="w-5 h-5" />
      </Button>
    </div>
  );
}