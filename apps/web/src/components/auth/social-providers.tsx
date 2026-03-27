import React from "react";
import { Field } from "../ui/field";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, GoogleIcon } from "@hugeicons/core-free-icons";

export const SocialProviders = () => {
  return (
    <React.Fragment>
      <Field>
        <Button variant="outline" className="w-full">
          <HugeiconsIcon icon={GoogleIcon} />
          Google
        </Button>
      </Field>
      <Field>
        <Button variant="outline" className="w-full">
          <HugeiconsIcon icon={GithubIcon} />
          Github
        </Button>
      </Field>
    </React.Fragment>
  );
};
