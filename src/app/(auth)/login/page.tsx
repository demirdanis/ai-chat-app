import LoginPage from "@/components/page/login/LoginPage";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
