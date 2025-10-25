import SignUpForm, { SignUpActions, SignUpDivider, SignUpField, SignUpFooter, SignUpHeader, SignUpHelperText, SignUpInput, SignUpLabel, SignUpLogo, SignUpSocialButton, SignUpSubmitButton } from "@/components/chatcn/signup";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Model, ModelCamera, ModelContent, ModelControls, ModelLighting, ModelScene } from "@/components/chatcn/model";

const LoginPreview = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-full max-w-md">
        <SignUpForm>
        <div className="flex justify-center p-4">
            <SignUpLogo icon="/favicon.ico" className="h-12 w-12"/>
        </div>
          <SignUpHeader
            heading="Welcome back!"
            subheading="Your work, your team, your flow - all in one place."
          />
            <div className="flex gap-3 mt-8">
              <SignUpSocialButton
                provider="Sign in with Google"
                icon={<ArrowUpRight />}
                redirectTo="/api/auth/google"
              />
              <SignUpSocialButton
                provider="Sign in with Apple"
                icon={<ArrowUpRight />}
                redirectTo="/api/auth/apple"
              />
            </div>

            <SignUpDivider text="OR"/>

          <SignUpField>
            <SignUpLabel htmlFor="email">Email</SignUpLabel>
            <SignUpInput
              name="email"
              type="email"
              placeholder="jack@example.com"
            />
            <SignUpHelperText>
              We'll use this to contact you. We won’t share your email with anyone
              else.
            </SignUpHelperText>
          </SignUpField>

          <SignUpActions>
              <SignUpSubmitButton
                text="Sign in with email"
                redirectTo="#"
              />
          </SignUpActions>
         

          <SignUpFooter
                footerText="Don't have an account?"
                footerLink={{ text: "Sign up", redirectTo: "/marketplace/signup" }}
            />
        </SignUpForm>

        <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#">Help</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
      <div className="relative w-1/2 h-screen">
        <ModelContent height="100vh" width="100%">
                      <Model src="/abstract.glb" position={[0, 0, 0]} rotation={[0,-Math.PI/4,0]} scale={1} float={false} />
                      <ModelScene bgColor="#0a0a0a" env="city" />
                      <ModelCamera fov={50} position={[0, 0, 5]} />
                      <ModelLighting type="studio" shadow />
                      <ModelControls autoRotate rotationSpeed={1} zoom={false} reverse={false} 
                      maxPolarAngle={Math.PI / 2}
                      minPolarAngle={Math.PI / 4}
                      minAzimuthAngle={-Math.PI /4}
                      maxAzimuthAngle={Math.PI / 8}/>
                    </ModelContent>
      </div>
    </div>
  );
};

export default LoginPreview;
