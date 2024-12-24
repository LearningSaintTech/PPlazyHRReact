// src/components/ui/card.js
import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-bold text-gray-800">{children}</h3>
);
export const CardContent = ({ children }) => <div>{children}</div>;
