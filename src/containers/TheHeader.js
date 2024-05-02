import {
  CHeader,
  CSpinner
} from '@coreui/react';
// routes config
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button, ButtonGroup, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { langCodeSlice } from 'src/_redux/Language/languageSlice';
import { signOut } from 'src/_redux/Login/LoginCRUD/LoginAuth';
import { I18n } from '@aws-amplify/core';
import { parseJwt } from 'src/App';
import { AWSConfig, COGNITODOMAIN, HOSTURL, REGION } from 'src/aws-exports';


const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gap: "5px",
    gridTemplateColumns: "auto 1fr",
    // height: "85px",
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "auto",
      // flex: 1,
    },
  },
  brand: {
    backgroundColor: '#3C4B64',
    border: 0,
    color: 'white',
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    height: "100%",
    padding: '0 40px',
    [theme.breakpoints.down(426)]: {
      flex: 1,
      width: "100%",

      height: "auto",
      marginBottom: "5px",
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
      fontSize: "20px",
      height: "100%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "auto",
      padding: '0 10px',
      fontSize: "20px",
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20px',
      fontSize: "24px",

    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30px',
      fontSize: "24px",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexFlow: "row",
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      paddingLeft: "10px",
      paddingBottom: "5px",
    },

  },
  img: {
    width: "85px",
    [theme.breakpoints.down('425')]: {
      width: "65px",
    },
  },
  langBtn: {
    [theme.breakpoints.down('425')]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.up('425')]: {
      fontSize: "0.9rem",
    },
  },
  btn: {
    padding: "5px 20px",
    marginRight: "20px",
    border: "1px solid #3C4B64",
    color: "#3C4B64",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#3C4B64",
      color: "#fff",
      cursor: "pointer"
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: "10px",
      padding: "5px 15px",
    },
    [theme.breakpoints.up('md')]: {
      marginRight: "15px",
      padding: "5px 20px",
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: "20px",
      padding: "5px 20px",
    },
  }
}));

const TheHeader = () => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const [schoolName, setSchoolName] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentSession = sessionStorage.getItem("currentSesion")
    // console.log(JSON.parse(currentSession).id_token)
    const dcodeData = parseJwt(JSON.parse(currentSession).id_token)
    setSchoolName(dcodeData.profile)
  }, [])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const { actions } = langCodeSlice;

  const { langCode } = useSelector(
    (state) => ({
      langCode: state.langCode.langCode,
    }),
    shallowEqual
  );



  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }
  const history = useHistory();
  // const defaultSchName = "CESR";
  const theme = useTheme();
  // const defaultSchName = "JHHS";

  const signOutHandler = () => {

    setIsLoading(true)
    const currentActiveSession = JSON.parse(sessionStorage.getItem('currentSesion'))
    if (currentActiveSession?.loginMode === "MS") {
      console.log('Log out from Azure account')
      sessionStorage.clear();
      window.location = `https://${COGNITODOMAIN}.auth.${REGION}.amazoncognito.com/logout?client_id=${AWSConfig.aws_user_pools_web_client_id}&logout_uri=${HOSTURL}`
    }
    else {
      console.log('Log out from Amplify account')
      if (currentActiveSession?.loginMode === "AMPLIFY") {
        signOut().then(res => {
          history.push("/login");
          // sessionStorage.clear();
          // window.location = `https://${COGNITODOMAIN}.auth.${REGION}.amazoncognito.com/logout?client_id=${AWSConfig.aws_user_pools_web_client_id}&logout_uri=${HOSTURL}`

        }).catch(err => {
          console.log("Error in SignOut", err)
        }).finally(() => {
          setIsLoading(false)
        })
      }
    }
  }

  return isLoading ? <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CSpinner style={{ background: "#111" }} color="dark" grow label="No Question Found" />
  </div> : (
    <CHeader className={classes.root}>

      <div className={classes.brand}>
        MY SHARE
      </div>
      <div style={{ display: "flex", justifyContent: (schoolName === "Cypress Elementary School" || schoolName === "Jurupa Hills High School") ? "space-between" : "flex-end" }}>
        {schoolName === "Cypress Elementary School" && <img className={classes.img} src="./assets/images/CESR.png"></img>}
        {schoolName === "Jurupa Hills High School" && <img className={classes.img} src="./assets/images/JHHS.png"></img>}
        {/* {<img className={classes.img} src="./assets/images/JHHS.png"></img>} */}

        <div className={classes.btnContainer}>
          <ButtonGroup style={{ paddingRight: "10px" }} color="primary" aria-label="outlined primary button group">
            <Button
              className={classes.langBtn}
              variant={langCode === "en" ? "contained" : "outlined"}
              onClick={() => { I18n.setLanguage("en"); dispatch(actions.setLangCode("en")) }}
            >
              ENGLISH
            </Button>
            <Button
              className={classes.langBtn}
              variant={langCode === "sp" ? "contained" : "outlined"}
              onClick={() => { I18n.setLanguage("sp"); dispatch(actions.setLangCode("sp")) }}
            >
              ESPAÑOL
            </Button>
          </ButtonGroup>
          <div className={classes.btn} onClick={signOutHandler} variant="outline-dark">
            <ExitToAppIcon /><div className="d-sm-down-none">&nbsp;&nbsp;{I18n.get('SIGN_OUT')}</div>
          </div>
        </div>
      </div>


      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
          </CLink>
        </div>
      </CSubheader> */}

      {/* <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand> */}

      {/* <CHeaderNav className="d-md-down-none mr-auto">
        
      </CHeaderNav> */}

      {/* <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav> */}

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader>
  )
}

export default TheHeader
