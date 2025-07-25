import React from "react";
import { CheckCircle2 } from "lucide-react"; 

function VerificationBadge({ message = "Transaction Completed" }) {
  return (
    <div>
      <CheckCircle2  />
      <span>{message}</span>
    </div>
  );
}

export default VerificationBadge;