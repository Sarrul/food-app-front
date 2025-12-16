"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Step1 from "./step1";
import Step2 from "./step2";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {
  const [step, setStep] = useState(1);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address (m@example.com)")
      .required("Required"),
    password: Yup.string()
      .min(8, "it must be above 8 characters")
      .matches(/[a-zA-Z]/, "it must contain letters")
      .matches(/[0-9]/, "it must contain numbers")
      .matches(/[^a-zA-Z0-9]/, "it must contain symbols")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/check-email",
        { email }
      );
      setApiError("");
      return true;
    } catch (err) {
      setApiError(err.response.data);
      return false;
    } finally {
      console.log("finished checking email");
    }
  };

  const createUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/authentication/signup",
        {
          email: email,
          password: password,
        }
      );
      router.push("/authentication/login");
    } catch (err) {
      setApiError(err.response.data);
    } finally {
      console.log("finished creating user");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await createUser(email, password);
    },
  });

  const next = async () => {
    formik.setTouched({ email: true });
    const errors = await formik.validateForm();
    if (!errors.email) {
      const available = await checkEmailExists(formik.values.email);
      if (available) setStep((s) => s + 1);
    }
  };
  const back = () => setStep((s) => s - 1);

  return (
    <div>
      {step === 1 && <Step1 next={next} formik={formik} apiError={apiError} />}
      {step === 2 && <Step2 next={next} back={back} formik={formik} />}
    </div>
  );
};

export default Home;
