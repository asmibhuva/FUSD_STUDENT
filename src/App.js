import { CSpinner } from "@coreui/react";
// import Amplify from '@aws-amplify/core';
import Amplify, { Auth, I18n, API } from "aws-amplify";
import React, { Suspense, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  AWSAppSyncConfig,
  AWSConfig,
  COGNITODOMAIN,
  HOSTURL,
  REGION,
} from "./aws-exports";
import { dict } from "./config/i18n";
import "./scss/style.scss";
import Login from "./views/pages/login/Login";
import { langCodeSlice } from "./_redux/Language/languageSlice";
import { useHistory } from "react-router";

const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

Amplify.configure(AWSConfig);
Auth.configure();
// Amplify.configure(AWSAppSyncConfig);

I18n.putVocabularies(dict);
I18n.setLanguage("en");

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const App = () => {
  const dispatch = useDispatch();
  const { actions } = langCodeSlice;
  const [authState, setAuthState] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const history = useHistory();

  const { langCode } = useSelector(
    (state) => ({
      langCode: state.langCode.langCode,
    }),
    shallowEqual
  );

  const getHashParams = (hash) => {
    return hash.split("&").reduce(function (res, item) {
      var parts = item.split("=");
      res[parts[0]] = parts[1];
      return res;
    }, {});
  };

  const fetchSessionFromSessionStorage = () => {
    return new Promise((resolve, reject) => {
      const currentActiveSession = sessionStorage.getItem("currentSesion");
      if (currentActiveSession) {
        console.log("Session storage found!");
        return resolve(JSON.parse(currentActiveSession));
      } else {
        // console.log("hash", window.location.hash)
        if (window.location.hash) {
          const hashParams = getHashParams(window.location.hash.substr(1));
          console.log("hash params");
          sessionStorage.setItem(
            "currentSesion",
            JSON.stringify({ ...hashParams, loginMode: "MS" })
          );
          return resolve(JSON.parse(sessionStorage.getItem("currentSesion")));
        }
        console.log("No session storage found!");
        return reject({});
      }
    });
  };

  //JWT tokens decoder

  useEffect(() => {
    (async () => {
      fetchSessionFromSessionStorage()
        .then((d) => {
          const AllowedGroup = parseJwt(d.id_token)[`cognito:groups`].includes(
            process.env.REACT_APP_ALLOWED_GROUPS
          );
          // console.log("AllowedGroup",AllowedGroup)
          if (!AllowedGroup) {
            const currentActiveSession = JSON.parse(
              sessionStorage.getItem("currentSesion")
            );
            if (currentActiveSession?.loginMode === "MS") {
              console.log("Log out from Azure account");
              sessionStorage.clear();

              window.alert(
                "Sorry, there is no student profile associated with this account."
              );
              window.location = `https://${COGNITODOMAIN}.auth.${REGION}.amazoncognito.com/logout?client_id=${AWSConfig.aws_user_pools_web_client_id}&logout_uri=${HOSTURL}`;
            }
          }
          setAuthState(true);
          // parseJwt()
        })
        .catch(async (e) => {
          console.log("Amplify login ");
          const session = await Auth.currentSession();
          if (session) {
            console.log("got the session from amplify");
            // console.log("session",session.getIdToken())
            sessionStorage.setItem(
              "currentSesion",
              JSON.stringify({
                id_token: session.getIdToken().jwtToken,
                access_token: session.getAccessToken().jwtToken,
                loginMode: "AMPLIFY",
              })
            );
            setAuthState(true);
          } else {
            setAuthState(false);
          }
        })
        .finally(() => {
          setSessionChecked(true);
        });
    })();
  }, []);

  useEffect(() => {
    console.log("State Updated");
    if (authState) {
      const currentActiveSession = sessionStorage.getItem("currentSesion");
      // console.log("currentSesion->id_token", JSON.parse(currentActiveSession).id_token)
      const decodedData = parseJwt(JSON.parse(currentActiveSession).id_token);
      // console.log("decodedData", decodedData)
      // Amplify.configure({
      //   graphql_headers: async () => ({
      //     'Authorization': JSON.parse(currentActiveSession).id_token
      //   })
      // });

      Amplify.configure({
        API: {
          graphql_endpoint: AWSAppSyncConfig.aws_appsync_graphqlEndpoint,
          graphql_headers: () => ({
            Authorization: JSON.parse(currentActiveSession).id_token, // Set Custom Request Headers for non-AppSync GraphQL APIs
          }),
        },
      });

      console.log("AmpliFy Updated");
    }
  }, [authState]);

  return (
    <Suspense
      fallback={
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
      }
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            path="/"
            exact
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            path="/dashboard"
            exact
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path="/thankyou"
            name="Thank You"
            render={(props) => <TheLayout {...props} />}
          />
          <Route
            path="*"
            exact
            name="Page Not Found"
            render={(props) => <Page404 {...props} />}
          />
        </Switch>
        {sessionChecked === true ? (
          authState === true ? (
            <Redirect to="/dashboard" />
          ) : (
            <Redirect to="/login" />
          )
        ) : null}
        {/* isLoading === false ? authState === true ? <Redirect to="/dashboard" /> : <Redirect to="/login" /> : null */}
      </Router>
    </Suspense>
  );
};

export default App;

// <React.Suspense fallback={<CSpinner variant="grow" />}>
//       <Router>
//         <Switch>
//           <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
//           <Route path="/" exact name="Login Page" render={props => <Login {...props} />} />
//           <Route path="/dashboard" exact name="Home" render={props => <TheLayout {...props} />} />
//           <Route path="/thankyou" name="Thank You" render={props => <TheLayout {...props} />} />
//           <Route path="*" exact name="Page Not Found" render={props => <Page404 {...props} />} />
//         </Switch>
//       </Router>
//     </React.Suspense>
