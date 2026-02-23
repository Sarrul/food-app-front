"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login({ className }) {
  const router = useRouter();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/login",
        values
      );
      console.log(response, "responserespontskdjgk");
      const token = response?.data?.token;
      const loggedInUserId =
        response?.data?.user?._id || response?.data?.user?.id || "";

      localStorage.setItem("Token", token);
      localStorage.setItem("userId", loggedInUserId);
      router.push("/");

      console.log("Push to home page success", response);
      toast.success("login succesful");
      console.log("LOGIN FORM DATA:", values);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) {
        setErrors({ api: err.response.data });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ToastContainer />
      <Card className="overflow-hidden p-0 border-none shadow-none rounded-none">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={formik.handleSubmit}>
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
                    name="email"
                    placeholder="Enter your email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.email && formik.touched.email
                        ? "border-red-600"
                        : ""
                    }
                    required
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-700 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </Field>

                <Field>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.password && formik.touched.password
                        ? "border-red-600"
                        : ""
                    }
                    required
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-700 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                  {formik.errors.api && (
                    <p className="text-red-700 text-sm">{formik.errors.api}</p>
                  )}
                </Field>

                <FieldDescription>
                  <a href="#">Forgot password ?</a>
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={formik.isSubmitting}>
                  Let's go
                </Button>
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
