import {
  CCard,
  CCardBody, CCol, CRow
} from '@coreui/react';
import { makeStyles } from '@material-ui/styles';
import { I18n } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { parseJwt } from 'src/App';
import { langCodeSlice } from 'src/_redux/Language/languageSlice';
import Questions from './Components/Questions/Questions';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: "#ebedef",
    border: "none",
    // height: "85px",
  },
  name: {
    fontSize: "32px",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
      fontSize: "24px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "26px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "32px",
    },
  },
  content: {
    fontSize: "24px",
    fontStyle: "italic",
    fontWeight: "300",
    [theme.breakpoints.down('sm')]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "24px",
    },
  },

}));

const Dashboard = ({ setIsAnsSubmitted }) => {

  const classes = useStyles();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  })

  const [schoolName, setSchoolName] = useState("")

  const dispatch = useDispatch()
  const { actions } = langCodeSlice;

  const { langCode } = useSelector(
    (state) => ({
      langCode: state.langCode.langCode,
    }),
    shallowEqual
  );

  useEffect(() => {
    I18n.setLanguage(langCode);
  }, [langCode])

  useEffect(() => {
    I18n.setLanguage(langCode);

    const currentSession = JSON.parse(sessionStorage.getItem('currentSesion'))

    const decodeData = parseJwt(currentSession.id_token)
    // console.log("decodeData-userName ", decodeData.name)
    const name = decodeData?.given_name + (decodeData?.surname || "")
    setUserData({ name: name || "", email: decodeData?.email })
    setSchoolName(decodeData?.profile)
    // (async () => {
    //   const session = await Auth.currentSession()
    //   if (session) {
    //     const name = session.getIdToken().payload.name
    //   }
    //   else {
    //     setUserName("")
    //   }
    // })()
  }, [])

  return (
    <>
      {/* <WidgetsDropdown /> */}

      <CCard className={`${classes.header}`}>
        <CCardBody className={`px-0`}>
          <CRow>
            <CCol sm="12" className={classes.name} >
              {I18n.get('HELLO')}, {(userData?.name && userData?.name !== "undefined") ? userData?.name : ""}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className={classes.content}>
              {I18n.get('WELCOME')}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      {/* <div>
        Selected Language - {langCode === "en" ? "ENGLISH" : "SPANISH"}
      </div> */}

      {/* <button className={classes.btn} onClick={() => { I18n.setLanguage('es') }} variant="outline-dark">
        Change Language - SPANISH
      </button> */}

      <Questions userData={userData} schoolName={schoolName} />

    </>
  )
}

export default Dashboard
