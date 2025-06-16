// src/components/custom_ui/dashboard/WelcomeCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-none text-white lg:row-span-2">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <h2 className="text-2xl font-bold">Prantik!</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">Today's Task</p>
              <p className="text-2xl font-bold">123</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90 mb-1">Overdue Task</p>
              <p className="text-2xl font-bold">213</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="relative">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}