"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SignUpForm() {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl p-6 border-2 border-muted shadow-xl bg-background">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary mb-1">Create an account</h1>
          <p className="text-muted-foreground text-sm">Enter your information below to create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-primary text-sm">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Nishit Barbhaya"
              value={formData.fullName}
              onChange={handleChange}
              className="bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg"
              minLength={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary text-sm">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="c@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg"
            />
            <p className="text-muted-foreground text-sm mt-2">
              We'll use this to contact you. We will not share your email with anyone else.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-primary text-sm">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg"
              minLength={8}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Must be at least 8 characters long.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-primary text-sm">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-muted/50 text-primary placeholder:text-gray-80 h-9 rounded-lg"
              minLength={8}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Please confirm your password.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              className="w-full h-9 bg-primary text-secondary font-medium rounded-lg"
            >
              Create Account
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-9 bg-transparent border-gray-700 text-primary font-medium rounded-lg"
            >
              Sign up with Google
            </Button>
          </div>

          <div className="text-center pt-2">
            <span className="text-primary text-sm">Already have an account? &nbsp; </span>
            <a href="#" className="text-muted-foreground text-md hover:underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}