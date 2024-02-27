import React from "react";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        hello
      <main>
        {
        children
        }
      </main>
    </div>
  );
}