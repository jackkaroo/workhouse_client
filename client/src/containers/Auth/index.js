import authService from "./auth.service";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm"

export default function Auth() {
  return (
    <div className={'container'}>
      <h1>Auth page</h1>

      <LoginForm login={authService.login} />
      <RegisterForm login={authService.login} />
    </div>
  );
}

