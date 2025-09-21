import Email from "@/registry/new-york/email";
import { Mail } from "lucide-react";

export default function EmailPreview () {
    return (
        <div className="flex justify-center">
        <Email
        icon={<Mail className="h-5 w-5" />}
        status="Complete"
        statusText="Delivered"
        title="Weekend Dinner Plans 🍕"
        to="alex.johnson@example.com"
        subject="Dinner on Saturday night?"
        sentAt="Sep 22, 2025, 7:30 PM"
        body={`Hey Alex,

Just checking in — are you free this Saturday for dinner?
I was thinking of trying out the new Italian place downtown.

Let me know if that works for you!`}
        sender="Cheers, Nishit"
      />
      </div>
    )
}