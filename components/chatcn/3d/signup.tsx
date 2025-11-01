"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useContext, createContext } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

type FormData = {
  [key: string]: string;
};

type SignupContextType = {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);
export const useForm = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error("missing context");
  return context;
};
export default function SignUpForm({
  children,
  className,
  onSubmit,
}: {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (formData: FormData) => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SignupContext.Provider value={{ formData, handleChange, handleSubmit }}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full max-w-xl p-6 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg bg-background mx-auto",
          className
        )}
      >
        {children}
      </form>
    </SignupContext.Provider>
  );
}
export function SignUpHeader({
  heading,
  subheading,
  className,
}: {
  heading: string;
  subheading: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 text-center", className)}>
      <h1 className="text-2xl font-semibold text-primary mb-1">{heading}</h1>
      <p className="text-muted-foreground text-md">{subheading}</p>
    </div>
  );
};

export function SignUpField({ children, className }: { children: React.ReactNode, className?:string }) {
  return <div className={cn("space-y-2 py-2.5", className)}>{children}</div>;
};
export function SignUpLabel({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Label htmlFor={htmlFor} className={cn("text-primary text-sm", className)}>
      {children}
    </Label>
  );
};
type FormInputProps = {
  name: "fullName" | "email" | "password" | "confirmPassword";
  type: string;
  placeholder: string;
  minLength?: number;
};
export function SignUpInput({
  name,
  type,
  placeholder,
  minLength,
  className
}: FormInputProps & { className?: string }) {
  const { formData, handleChange } = useForm();
  return (
    <Input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      minLength={minLength}
      className={cn("bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg", className)}
    />
  );
};

export function SignUpHelperText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-muted-foreground text-sm mt-2", className)}>{children}</p>;
}

export function SignUpActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-3 pt-2", className)}>{children}</div>;
}

export function SignUpSubmitButton({
  text = "Submit",
  redirectTo,
}: {
  text?: string;
  redirectTo?: string;
}) {
  if (redirectTo) {
    return (
      <Link href={redirectTo} className="block">
        <Button
          type="button"
          className="w-full h-9 bg-primary text-secondary font-medium rounded-lg"
        >
          {text}
        </Button>
      </Link>
    );
  }
  return (
    <Button
      type="submit"
      className="w-full h-9 bg-primary text-secondary font-medium rounded-lg"
    >
      {text}
    </Button>
  );
};
export function SignUpSocialButton({
  provider,
  icon,
  onClick,
  redirectTo,
}: {
  provider: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  redirectTo?: string;
}) {
  const content = (
    <>
      {icon && <span className="text-lg">{icon}</span>}
      <span>{provider}</span>
    </>
  );

  if (redirectTo) {
    return (
      <Link href={redirectTo} className="block">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-2 bg-transparent border-gray-700 text-primary font-medium rounded-full"
        >
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="w-full h-12 flex items-center justify-center gap-2 bg-transparent border-gray-700 text-primary font-medium rounded-full"
    >
      {content}
    </Button>
  );
};

export function SignUpLogo({ icon, className }: { icon: string; className?: string }) {
  return <Image
  src={icon}
  alt="image"
  width={40}
  height={40}
  className={cn(className)}
/>
}

type FooterLink = {
  text: string;
  redirectTo: string;
};

type FooterProps = {
  footerText: string;
  footerLink?: FooterLink;
};

export function SignUpFooter({ footerText, footerLink, className }: FooterProps & { className?: string }) {
  return (
    <div className={cn("text-center pt-4", className)}>
      <span className="text-primary text-sm">{footerText} </span>
      {footerLink && (
        <Link href={footerLink.redirectTo} className="text-muted-foreground text-md hover:underline">
          {footerLink.text}
        </Link>
      )}
    </div>
  );
}

export function SignUpLayout({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen ${right ? "flex-row" : "flex-col justify-center items-center"}`}>
      <div className={`w-1/2 flex justify-center items-center`}>
        {left}
      </div>
      {right && <div className="relative w-1/2">{right}</div>}
    </div>
  );
}

export function SignUpDivider({
  text = "OR",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center my-4", className)}>
      <hr className="flex-grow border-muted" />
      <span className="mx-3 text-sm text-muted-foreground">{text}</span>
      <hr className="flex-grow border-muted" />
    </div>
  );
}
