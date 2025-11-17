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
    router.push("/authentication/login/forgotpass/verify");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleLetsGo}>
            <FieldGroup className="gap-6">
              <Button variant="outline" size="icon" aria-label="Submit">
                <ChevronLeft />
              </Button>

              {/* title description */}
              <div className="flex flex-col items-start gap-1 text-center">
                <h1 className="text-2xl font-bold">Reset your password </h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email to receive a password reset link.{" "}
                </p>
              </div>

              {/* input */}
              <Field>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* create button */}
              <Field>
                <Button type="submit">Send a link</Button>
              </Field>

              <FieldDescription className="text-center">
                Don’t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
