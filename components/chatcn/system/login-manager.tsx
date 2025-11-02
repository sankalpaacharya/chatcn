import { useState } from "react";

type LoginManagerProps = {
  wallpaper?: string;
};
export function LoginManager({ wallpaper }: LoginManagerProps) {
  const [active, setActive] = useState(false);
  return (
    <div className={`h-screen w-screen`} style={{ backgroundImage: "" }}>
      {active ? <FirstScreen /> : <PasswordScreen />}
    </div>
  );
}

export function FirstScreen() {
  return (
    <div className="h-full w-full">
      <div>01:58</div>
      <div>Monday, November 2 2025</div>
      <p>Press "Space" or "Enter" to login</p>
    </div>
  );
}

export function PasswordScreen() {
  return <div className="w-full h-full">this is password manager</div>;
}
