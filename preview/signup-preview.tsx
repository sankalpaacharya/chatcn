import SignUpForm, {
  SignUpActions,
  SignUpField,
  SignUpFooter,
  SignUpHeader,
  SignUpHelperText,
  SignUpInput,
  SignUpLabel,
  SignUpLayout,
  SignUpSocialButton,
  SignUpSubmitButton,
} from "@/components/chatcn/3d/signup";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Model,
  ModelCamera,
  ModelContent,
  ModelControls,
  ModelLighting,
  ModelScene,
} from "@/components/chatcn/3d/model";
const SignupPreview = () => {
  return (
    <SignUpLayout
      left={
        <SignUpForm>
          <SignUpHeader
            heading="Welcome"
            subheading="Enter your information below to create your account"
          />

          <SignUpField>
            <SignUpLabel htmlFor="fullName">Full Name</SignUpLabel>
            <SignUpInput
              name="fullName"
              type="text"
              placeholder="Jack Sparrow"
              minLength={2}
            />
          </SignUpField>

          <SignUpField>
            <SignUpLabel htmlFor="email">Email</SignUpLabel>
            <SignUpInput
              name="email"
              type="email"
              placeholder="jack@example.com"
            />
            <SignUpHelperText>
              We'll use this to contact you. We won’t share your email with
              anyone else.
            </SignUpHelperText>
          </SignUpField>

          <SignUpField>
            <SignUpLabel htmlFor="password">Password</SignUpLabel>
            <SignUpInput
              name="password"
              type="password"
              placeholder="••••••"
              minLength={8}
            />
            <SignUpHelperText>
              Must be at least 8 characters long.
            </SignUpHelperText>
          </SignUpField>

          <SignUpField>
            <SignUpLabel htmlFor="confirmPassword">
              Confirm Password
            </SignUpLabel>
            <SignUpInput
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              minLength={8}
            />
            <SignUpHelperText>Please confirm your password.</SignUpHelperText>
          </SignUpField>

          <SignUpActions>
            <SignUpSubmitButton text="Create Account" redirectTo="#" />
            <div className="flex justify-around items-center">
              <SignUpSocialButton
                provider="Sign up with Google"
                icon={<ArrowUpRight />}
                redirectTo="/api/auth/google"
              />
              <SignUpSocialButton
                provider="Sign up with Github"
                icon={<ArrowUpRight />}
                redirectTo="/api/auth/google"
              />
            </div>
          </SignUpActions>

          <SignUpFooter
            footerText="Already have an account?"
            footerLink={{
              text: "Sign in here.",
              redirectTo: "/marketplace/login",
            }}
          />
        </SignUpForm>
      }
      right={
        <ModelContent height="100vh" width="100%">
          <Model
            src="/3d/abstract.glb"
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={0.85}
            float={false}
          />
          <ModelScene bgColor="#0a0a0a" env="city" />
          <ModelCamera fov={50} position={[0, 0, 5]} />
          <ModelLighting type="studio" shadow />
          <ModelControls
            autoRotate
            rotationSpeed={1}
            zoom={false}
            reverse={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 8}
          />
        </ModelContent>
      }
    />
  );
};

export default SignupPreview;
