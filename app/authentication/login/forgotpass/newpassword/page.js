import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function NewPassword({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0 ">
          <form className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              {/* title description */}
              <div className="flex flex-col items-start gap-1 ">
                <h1 className="text-2xl font-bold">Create a new password</h1>
                <p className="text-muted-foreground text-sm ">
                  Set a new password with a combination of letters and numbers
                  for better security.
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
              </Field>

              {/* create button */}
              <Field>
                <Button type="submit">Create a password</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
