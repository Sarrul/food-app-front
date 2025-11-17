"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnterEmail({ className, ...props }) {
  const router = useRouter();

  const handleLetsGo = (e) => {
    e.preventDefault();
    router.push("/authentication/signup/password");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleLetsGo}>
            <FieldGroup className="gap-6">
              <Button variant="outline" size="icon" aria-label="Submit">
                <ChevronLeft />
              </Button>

              {/* title description */}
              <div className="flex flex-col items-start gap-1 text-center">
                <h1 className="text-2xl font-bold">
                  Please verify Your Email{" "}
                </h1>
                <p className="text-muted-foreground text-sm text-balance">
                  We just sent an email to Test@gmail.com. Click the link in the
                  email to verify your account.{" "}
                </p>
              </div>

              {/* create button */}
              <Field>
                <Button type="submit">Resend email</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
