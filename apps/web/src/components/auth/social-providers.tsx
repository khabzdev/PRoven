import React from "react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, GoogleIcon } from "@hugeicons/core-free-icons";

interface SocialProvidersProps {
  disabled?: boolean;
}
export const SocialProviders = ({ disabled }: SocialProvidersProps) => {
  return (
    <React.Fragment>
      <Field>
        <Button variant="outline" className="w-full" disabled={disabled}>
          <HugeiconsIcon icon={GoogleIcon} />
          Google
        </Button>
      </Field>
      <Field>
        <Button variant="outline" className="w-full" disabled={disabled}>
          <HugeiconsIcon icon={GithubIcon} />
          Github
        </Button>
      </Field>
    </React.Fragment>
  );
};
