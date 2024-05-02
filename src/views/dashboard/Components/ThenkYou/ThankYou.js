import { CCard, CCardBody, CCol, CRow, CSpinner } from '@coreui/react';
import { makeStyles } from '@material-ui/core';
import { I18n } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parseJwt } from 'src/App';
import { signOut } from 'src/_redux/Login/LoginCRUD/LoginAuth';
import { ReactComponent as ThankYouSvg } from "./Svgs/left.svg";


const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column",
    justifyContent: "center",
  },
  svgContainer: {
    // maxHeight: "100vh"
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      display: "flex",
      height: "30vh"
    },
    [theme.breakpoints.up('sm')]: {
      display: "flex",
      height: "40vh"
    },
    [theme.breakpoints.up('md')]: {
      display: "flex",
      height: "60vh"
    },
    [theme.breakpoints.up('lg')]: {
      display: "flex",
      height: "80vh"
    },
  },
  cong: {
    fontSize: "100px",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Rochester",
    [theme.breakpoints.down('sm')]: {
      fontSize: "50px"
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "60px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "80px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "100px",
    },
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "20px"
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "40px",
    },
  },
  text: {
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "300",
    fontSize: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "20px"
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "40px",
    },
  },
  btn: {
    padding: "10px 30px",
    marginRight: "20px",
    marginTop: "20px",
    backgroundColor: "#3C4B64",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      marginRight: "10px",
      padding: "5px 15px",
    },
    [theme.breakpoints.up('md')]: {
      marginRight: "15px",
      padding: "10px 20px",
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: "20px",
      padding: "10px 30px",
    },
  }
}))

const ThankYou = () => {
  const classes = useStyles();
  const history = useHistory();

  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentSession = JSON.parse(sessionStorage.getItem('currentSesion'))

    const decodeData = parseJwt(currentSession.id_token)
    // console.log("decodeData-userName ", decodeData.name)
    // setUserName(decodeData?.name)
    const name = decodeData?.given_name + (decodeData?.surname || "")
    setUserName(name)
    // (async () => {
    //   const session = await Auth.currentSession()
    //   if (session) {
    //     const name = session.getIdToken().payload.name
    //     setUserName(name)
    //   }
    //   else {
    //     setUserName("")
    //   }
    // })()
  }, [])



  const signOutHandler = () => {

    setIsLoading(true)
    signOut().then(res => {
      history.replace("/login")
    }).catch(err => {
      console.log("Error in SignOut", err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return isLoading ? <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CSpinner style={{ background: "#111" }} color="dark" grow label="No Question Found" />
  </div> :
    (
      <CCard style={{ border: "none", backgroundColor: "#ebedef" }}>
        <CCardBody>
          <CRow>
            <CCol sm="12" lg="6" className={`${classes.svgContainer}`}>
              <ThankYouSvg height="100%" width="100%" />
            </CCol>
            <CCol sm="12" lg="6" className={classes.content}>
              <span className={classes.cong}>{I18n.get("THANK_YOU")}</span>
              <span className={classes.name}>{userName &&userName !== "undefined" ? userName : ""}</span>
              <span className={classes.text}>{I18n.get("THANK_YOU_MSG_L1")}</span>
              <span className={classes.text}>{I18n.get("THANK_YOU_MSG_L2")}</span>
              {/* <div className={classes.btn} onClick={signOutHandler} variant="outline-dark">
                {I18n.get("LOG_OUT")}
              </div> */}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
}

export default ThankYou
