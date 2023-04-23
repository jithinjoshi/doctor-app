import "./login.scss"
import { useFormik } from 'formik'
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { signInAdmin } from "../../../Helpers/adminHelper";

const validate = values => {
  const errors = {};

  //email
  if (!values.email) {
    errors.email = toast.error("email is required")
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("invalid email address")
  }

  //password
  else if (!values.password) {
    errors.password = toast.error('password is required');
  } else if (values.password.includes(' ')) {
    errors.password = toast.error('wrong password');
  }
  return errors

}

const Login = () => {
  const history = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let signin = signInAdmin(values)
      toast.promise(signin, {
        loading: 'searching...',
        success: <b>sign in successfull</b>,
        error: <b>can't find the user</b>
      })

      signin.then((user) => {
        if (user) {
          console.log("login success");
          history("/admin")

        }
      }).catch((err) => {
        console.log("login failure");
      })

    }
  })

  return (
    <div class="container">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h1 style={{ textAlign: "center" }}>Admin Login</h1>
      <div class="form">
        <form action="#" class="login-form" onSubmit={formik.handleSubmit}>
          <input type="text" name="email" placeholder="email" onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
          <input type="password" name="password" placeholder="Password" onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />
          <button type="submit" class="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login