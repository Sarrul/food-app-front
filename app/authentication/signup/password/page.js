import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function SignupPassword({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              <Button variant="outline" size="icon" aria-label="Submit">
                <ChevronLeft />
              </Button>

              {/* title description */}
              <div className="flex flex-col items-start gap-1 text-center">
                <h1 className="text-2xl font-bold">Create a strong password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Create a strong password with letters, numbers.
                </p>
              </div>

              {/* input */}
              <Field>
                <Field className=" gap-4">
                  <Field>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Field>
                  <Field>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm"
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              {/* create button */}
              <Field>
                <Button type="submit">Let's go</Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <a href="#">Log in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
