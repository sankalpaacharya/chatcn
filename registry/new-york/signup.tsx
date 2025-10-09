"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useContext, createContext } from 'react';
import Link from 'next/link';


type SignupContextType = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);
export const useForm = () =>{
  const context = useContext(SignupContext)
  if (!context) throw new Error("missing context");
  return context;
}
export default function SignUpForm({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SignupContext.Provider value={{ formData, handleChange, handleSubmit }}>
    <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-6 border-2 border-muted shadow-xl bg-background mx-auto"
      >
        {children}
      </form>
    </SignupContext.Provider>
    
  );
}
  SignUpForm.Header = function Header({ heading, subheading }: { heading: string; subheading: string }) {
    return (
      <div className="mb-3">
        <h1 className="text-xl font-bold text-primary mb-1">{heading}</h1>
        <p className="text-muted-foreground text-sm">
          {subheading}
        </p>
      </div>
    );
  };

  SignUpForm.Field = function Field({ children }: { children: React.ReactNode }) {
    return <div className="space-y-2 py-2.5">{children}</div>;
  };
  SignUpForm.Label = function FormLabel({ htmlFor, children }: any) {
    return (
      <Label htmlFor={htmlFor} className="text-primary text-sm">
        {children}
      </Label>
    );
  };
  SignUpForm.Input = function FormInput({
    name,
    type,
    placeholder,
    minLength,
  }: any) {
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
        className="bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg"
      />
    );
  };

  SignUpForm.HelperText = function HelperText({ children }: { children: React.ReactNode }) {
    return <p className="text-muted-foreground text-sm mt-2">{children}</p>;
  };
  SignUpForm.Actions = function Actions({ children }: { children: React.ReactNode }) {
    return <div className="space-y-3 pt-2">{children}</div>;
  };
  SignUpForm.SubmitButton = function SubmitButton({text = "Submit",redirectTo}: {text?: string;redirectTo?: string;}) 
  {
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
  SignUpForm.SocialButton = function SocialButton({
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
        <span>Sign up with {provider}</span>
      </>
    );
  
    if (redirectTo) {
      return (
        <Link href={redirectTo} className="block">
          <Button
            type="button"
            variant="outline"
            className="w-full h-9 flex items-center justify-center gap-2 bg-transparent border-gray-700 text-primary font-medium rounded-lg"
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
        className="w-full h-9 flex items-center justify-center gap-2 bg-transparent border-gray-700 text-primary font-medium rounded-lg"
      >
        {content}
      </Button>
    );
  };
  SignUpForm.Footer = function Footer({footer, footerLink}: {footer:string, footerLink?:any}) {
    return (
      <div className="text-center pt-4">
        <span className="text-primary text-sm">{footer} </span>
        <a href={footerLink.redirectTo} className="text-muted-foreground text-md hover:underline">
          {footerLink.text}
        </a>
      </div>
    );
  };