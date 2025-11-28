import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step2({ next, back, formik }) {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  //   const handleLetsGo = async (e) => {
  //     e.preventDefault();
  //     formik.setTouched({
  //       password: true,
  //       confirmPassword: true,
  //     });
  //     const errors = await formik.validateForm();

  //     if (Object.keys(errors).length === 0) {
  //       router.push("/authentication/login");
  //     }
  //   };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8">
            <FieldGroup className="gap-6">
              <Button
                variant="outline"
                size="icon"
                aria-label="Submit"
                onClick={back}
              >
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
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={cn(
                        "focus:outline-none",
                        errors.password && touched.password
                          ? "border-red-600"
                          : ""
                      )}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-700 text-sm">{errors.password}</p>
                    )}
                  </Field>
                  <Field>
                    <Input
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={cn(
                        "focus:outline-none",
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-600"
                          : ""
                      )}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-700 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </Field>
                  <label className="flex flex-row gap-2 justify-start items-center text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="cursor-pointer h-4 w-4"
                    />
                    <label className="text-sm cursor-pointer">
                      Show password
                    </label>{" "}
                  </label>
                </Field>
              </Field>

              {/* create button */}
              <Field>
                <Button onClick={handleSubmit} disable={isSubmitting}>
                  Let's go
                </Button>
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
