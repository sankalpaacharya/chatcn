"use client";
import { LoginManager } from "@/components/chatcn/system/login-manager";

export default function LoginManagerPreview() {
  return (
    <div className="w-full h-100 relative flex border mx-auto">
      <LoginManager portal={false} />
    </div>
  );
}
