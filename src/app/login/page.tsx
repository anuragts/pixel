import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex justify-center min-w-80">
      <form>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          className="my-4"
        />

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="my-4"
        />
        {/* add zod so min 6 characters is required */}
        <div className="">
          <Button formAction={login} className="my-4">
            Log in
          </Button>
          <div>OR</div>
          <Button formAction={signup} className="my-4">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
