"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export default function Step1({ next, formik, apiError }) {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0 ">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              formik.setTouched({ email: true });
              formik.validateForm().then((errors) => {
                if (!errors.email) {
                  next();
                }
              });
            }}
          >
            <FieldGroup className="gap-6">
              <Button variant="outline" size="icon" aria-label="Submit">
                <ChevronLeft />
              </Button>

              {/* title description */}
              <div className="flex flex-col items-start gap-1 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Sign up to explore your favorite dishes.{" "}
                </p>
              </div>

              {/* input */}
              <Field>
                <Input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="m@example.com"
                  className={cn(
                    "focus:outline-none",
                    errors.email && touched.email ? "border-red-600" : ""
                  )}
                />
                {errors.email && touched.email && (
                  <p className="text-red-700 text-sm">{errors.email}</p>
                )}
                {apiError && (
                  <div className="text-red-700 text-sm">{apiError}</div>
                )}
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
