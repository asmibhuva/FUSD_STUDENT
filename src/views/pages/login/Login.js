import Amplify from "@aws-amplify/core";
import { CCol, CRow, CSpinner } from "@coreui/react";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import { Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AWSAppSyncConfig,
  AWSConfig,
  COGNITODOMAIN,
  HOSTURL,
  MS_SAML,
  REGION,
} from "src/aws-exports";
import { signIn } from "src/_redux/Login/LoginCRUD/LoginAuth";
import * as yup from "yup";
import { ReactComponent as LoginSvg } from "./LoginSvg.svg";

const schema = yup.object().shape({
  email: yup.string().email().trim().required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});
const init = {
  email: "",
  password: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    // clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)",
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // [theme.breakpoints.down('sm')]: {
    // },
    // [theme.breakpoints.up('sm')]: {

    // },
    // [theme.breakpoints.up('md')]: {
    //   clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)",
    // },
    // [theme.breakpoints.up('lg')]: {

    // },
  },
  form: {
    display: "flex",
    marginTop: "30px",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column",
  },
  textField: {
    height: "80px",
    width: "500px",
    fontSize: "20px",
    margin: "10px 0",
    border: "1px solid #3C4B64",
    "&:focus": {
      boxShadow: "0 0 5px 2px #3C4B6433",
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "40px",
      fontSize: "14px",
      padding: "0 10px",
      borderRadius: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "200px",
      height: "40px",
      fontSize: "18px",
      padding: "0 20px",
      borderRadius: "15px",
    },
    [theme.breakpoints.up("md")]: {
      width: "300px",
      height: "50px",
      fontSize: "18px",
      padding: "0 20px",
      borderRadius: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "400px",
      fontSize: "20px",
      height: "60px",
      padding: "0 30px",
    },
  },
  svgContainer: {
    background: "#d9d9d9",
    // height: window.innerHeight,
    height: "100vh",
    width: "100%",
    transform: "skew(-5deg, 0deg) translate(-44px, 0px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    // [theme.breakpoints.up('sm')]: {
    //   display:"none"
    // },
  },
  svg: {
    height: "70%",
    width: "auto",
    transform: "rotateZ(0deg) skew(5deg, 0deg)",
  },
  signIN: {
    fontWeight: "bold",
    fontSize: "40px",
    textAlign: "center",
  },
  signINTxt: {
    fontSize: "22px",
    fontStyle: "italic",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "22px",
    },
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.between("sm", "lg")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  btn: {
    padding: "10px 60px",
    backgroundColor: "#3C4B64",
    color: "#fff",
    cursor: "pointer",
    maxWidth: "250px",
    fontSize: "18px",
    borderRadius: "5px",
    textAlign: "center",
    border: "none",
    "&:hover": {
      backgroundColor: "#3C4B64",
      borderColor: "#3C4B64",
      boxShadow: "0 0 0 0.2rem rgb(61 75 100 / 25%)",
    },
    "&:active": {
      backgroundColor: "#3C4B64",
      borderColor: "#3C4B64",
      boxShadow: "0 0 0 0.2rem rgb(61 75 100 / 25%)",
    },
    // maxWidth:"150px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "20px",
      marginRight: "10px",
      padding: "5px 15px",
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: "20px",
      fontSize: "14px",
      marginRight: "15px",
      padding: "8px 30px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "20px",
      fontSize: "18px",
      marginRight: "15px",
      padding: "10px 50px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
      marginRight: "20px",
      padding: "10px 60px",
    },
  },
  msBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [err, setErr] = useState("");

  const handleFormSubmit = (values) => {
    // console.log(values)
    setIsLoading(true);
    signIn({ username: values.email, password: values.password })
      .then((res) => {
        console.log("Amplify Login Res ", res);
        console.log("Authorized");
        sessionStorage.setItem(
          "currentSesion",
          JSON.stringify({
            id_token: res.signInUserSession.idToken.jwtToken,
            access_token: res.signInUserSession.accessToken.jwtToken,
            loginMode: "AMPLIFY",
            // name =
          })
        );
        Amplify.configure({
          API: {
            graphql_endpoint: AWSAppSyncConfig.aws_appsync_graphqlEndpoint,
            graphql_headers: () => ({
              Authorization: res.signInUserSession.idToken.jwtToken, // Set Custom Request Headers for non-AppSync GraphQL APIs
            }),
          },
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        setErr("Invalid Credentials");
        console.log("err", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const [authState, setAuthState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const hostURL = "https://deydk10e51ctd.cloudfront.net/"
  // const hostURL = "http://localhost:3001"

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // useEffect(() => {
  //   (async () => {
  //     const session = await Auth.currentSession()
  //     if (session) {
  //       setAuthState(true)
  //     }
  //   })()
  // }, [])

  return isLoading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CSpinner
        style={{ background: "#111" }}
        color="dark"
        grow
        label="No Question Found"
      />
    </div>
  ) : (
    <div
      className={`${classes.root} justify-content-center c-app c-default-layout flex-column align-items-center`}
    >
      <CRow className="justify-content-center w-100">
        <CCol
          style={{ display: "flex" }}
          className={`${classes.svgContainer} d-sm-down-none`}
          md="7"
        >
          <LoginSvg className={classes.svg} />
        </CCol>
        <CCol
          sm={12}
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
          }}
          md="5"
        >
          <div
            style={{
              width: "100%",
              padding: "50px 0px",
              paddingTop: "0px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexFlow: "column",
            }}
          >
            <img src="./assets/images/image.png" className={classes.logo} />
            <div className={classes.signIN}>SIGN IN</div>
            <div className={classes.signINTxt}>
              Enter your account detail to log in.
            </div>
            <Formik
              initialValues={init}
              validationSchema={schema}
              onSubmit={(values, { onSubmit }) => {
                // onSubmit(values);
                // console.log(values)
                handleFormSubmit(values);
                // history.push("/dashboard")
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <span style={{ color: "red" }}>{err}</span>
                  <FormControl
                  // error={false}
                  // focused
                  >
                    <Input
                      id="standard-adornment-email"
                      placeholder="Email Id"
                      type="email"
                      name="email"
                      onBlur={handleBlur}
                      className={`${classes.textField}`}
                      autoFocus
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormHelperText
                      style={{ color: "red" }}
                      id="standard-adornment-email-text"
                    >
                      {touched.email && errors.email && errors.email}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                  // error={false}
                  >
                    <Input
                      id="standard-adornment"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onBlur={handleBlur}
                      value={values.password}
                      className={`${classes.textField}`}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      style={{ color: "red" }}
                      id="standard-adornment-text"
                    >
                      {touched.password && errors.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                  <Button className={classes.btn} type="submit">
                    Sign In
                  </Button>
                </form>
              )}
            </Formik>
            {/* <span style={{
              opacity: "50%",
              marginTop: "20px",
            }}>---- or ----</span> */}
            {/* <div style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              width: "100%",
            }}>
            
              <Button
                variant="outlined"
                color="inherit"
                className={classes.msBtn}
                // onClick={() => { window.location = `https://${COGNITODOMAIN}.auth.us-east-1.amazoncognito.com/login?client_id=${AWSConfig.aws_user_pools_web_client_id}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=${HOSTURL}` }}
                onClick={() => { window.location = `https://${COGNITODOMAIN}.auth.${REGION}.amazoncognito.com/oauth2/authorize?identity_provider=${MS_SAML}&redirect_uri=${HOSTURL}&response_type=TOKEN&client_id=${AWSConfig.aws_user_pools_web_client_id}&scope=aws.cognito.signin.user.admin%20email%20openid%20profile` }}
              >
                <i className="fab fa-windows" style={{ fontSize: "2.1rem", marginRight: "10px" }}></i>
                SignIn With Microsoft
              </Button>
            </div> */}
          </div>

          <small
            style={{
              marginBottom: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            MyShare (c) 2022 | Terms of Use | Security and Privacy
          </small>
        </CCol>
      </CRow>
    </div>
  );
};

export default Login;
