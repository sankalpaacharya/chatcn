import SignUpForm from "@/components/chatcn/signup";
import React from "react";
import { ArrowUpRight } from "lucide-react";
const SignupPreview = () => {
  return (
    <SignUpForm>
      <SignUpForm.Header
        heading="Create an account"
        subheading="Enter your information below to create your account"
      />

      <SignUpForm.Field>
        <SignUpForm.Label htmlFor="fullName">Full Name</SignUpForm.Label>
        <SignUpForm.Input
          name="fullName"
          type="text"
          placeholder="Jack Sparrow"
          minLength={2}
        />
      </SignUpForm.Field>

      <SignUpForm.Field>
        <SignUpForm.Label htmlFor="email">Email</SignUpForm.Label>
        <SignUpForm.Input
          name="email"
          type="email"
          placeholder="jack@example.com"
        />
        <SignUpForm.HelperText>
          We'll use this to contact you. We won’t share your email with anyone
          else.
        </SignUpForm.HelperText>
      </SignUpForm.Field>

      <SignUpForm.Field>
        <SignUpForm.Label htmlFor="password">Password</SignUpForm.Label>
        <SignUpForm.Input
          name="password"
          type="password"
          placeholder="••••••"
          minLength={8}
        />
        <SignUpForm.HelperText>
          Must be at least 8 characters long.
        </SignUpForm.HelperText>
      </SignUpForm.Field>

      <SignUpForm.Field>
        <SignUpForm.Label htmlFor="confirmPassword">
          Confirm Password
        </SignUpForm.Label>
        <SignUpForm.Input
          name="confirmPassword"
          type="password"
          placeholder="••••••"
          minLength={8}
        />
        <SignUpForm.HelperText>
          Please confirm your password.
        </SignUpForm.HelperText>
      </SignUpForm.Field>

      <SignUpForm.Actions>
        <SignUpForm.SubmitButton text="Create Account" redirectTo="#" />
        <SignUpForm.SocialButton
          provider="Google"
          icon={<ArrowUpRight />}
          redirectTo="/api/auth/google"
        />
        <SignUpForm.SocialButton
          provider="Github"
          icon={<ArrowUpRight />}
          redirectTo="/api/auth/google"
        />
      </SignUpForm.Actions>

      <SignUpForm.Footer footerText="Already have an account?" footerLink={{text:"Sign in here.", redirectTo:"#"}} />
    </SignUpForm>
  );
};

export default SignupPreview;
