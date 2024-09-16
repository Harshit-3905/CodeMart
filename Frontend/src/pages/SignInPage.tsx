import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const SignInHandler = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/login",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        login(response.data.token);
        navigate("/products");
      } else {
        setError(response.data.message || "An error occurred during sign in");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message || "An error occurred during sign in"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const getGuestCrendentials = () => {
    setEmail("guest@example.com");
    setPassword("guest123");
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-slate-600 text-white">
      <div className="flex flex-col bg-black p-5 gap-3 rounded-xl">
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="johndoe@gmail.com"
            className="text-black w-[300px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="text-black w-[300px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center pt-3 gap-2">
          <Button
            onClick={SignInHandler}
            disabled={loading}
            className="bg-green-700 w-[300px]"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Button
            onClick={getGuestCrendentials}
            className="bg-green-700 w-[300px]"
          >
            Get Guest Credentials
          </Button>
        </div>
        <div className="flex justify-center">
          Don't have an account ? &nbsp;
          <Link to="/signup" className="text-red-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
