import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SignInHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8787/api/v1/user/login",
        {
          email,
          password,
        }
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-600 text-white">
      <div className="flex flex-col bg-black p-5 gap-3 rounded-xl">
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
        <div className="flex justify-center pt-4">
          <Button
            onClick={SignInHandler}
            disabled={loading}
            className="bg-green-700"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
