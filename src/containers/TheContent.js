import React, { Suspense, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Dashboard from '../views/dashboard/Dashboard'
import ThankYou from '../views/dashboard/Components/ThenkYou/ThankYou'
import Page404 from '../views/pages/page404/Page404'

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )

const TheContent = ({ location }) => {

  return (
    <main className="c-main p-0">
      <CContainer fluid style={{ height: "100%" }}>
        <Suspense fallback={<div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}><CSpinner style={{ background: "#111" }} color="dark" grow label="No Question Found" /></div>}>
          {/* <Router> */}
          {/* {location === "/dashboard"
            ? <Dashboard />
            : location === "/thankyou"
              ? <ThankYou />
              : <Redirect to="/404" />
          } */}

          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade style={{ height: "100%" }}>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
