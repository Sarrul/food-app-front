import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function Login({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <Button variant="outline" size="icon" aria-label="Submit">
                <ChevronLeft />
              </Button>

              {/* title, deccription */}
              <div className="flex flex-col items-start gap-2 text-center">
                <h1 className="text-2xl font-bold">Log in</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Log in to enjoy your favorite dishes.
                </p>
              </div>

              {/* inputs */}
              <Field className="gap-4">
                <Field>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </Field>

                <Field>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Field>

                <FieldDescription>
                  <a href="#">Forgot password ?</a>
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit">Let's go</Button>
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
