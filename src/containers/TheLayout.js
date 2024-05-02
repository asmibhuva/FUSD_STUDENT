import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
  TheContent, TheFooter,
  TheHeader
} from './index';


const useStyles = makeStyles(theme => ({
  content: {
    padding: "65px 105px 0 105px",
    [theme.breakpoints.down('sm')]: {
      padding: "0px 0px 0 0px",
    },
    [theme.breakpoints.up('md')]: {
      padding: "20px 60px 0 60px",
    },
    [theme.breakpoints.up('lg')]: {
      padding: "40px 85px 0 85px",
    },
  },
}));



const TheLayout = (props) => {
  const classes = useStyles();

  // console.log(Auth)

  // useEffect(() => {
  //   (async () => {
  //     const session = await Auth.currentSession()
  //     if (session) {
  //       setAuthState(true)
  //     }
  //     else {
  //       setAuthState(false)
  //     }
  //   })()
  // }, [])



  return (
    <div className="c-app c-default-layout">
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader />
        <div className={`c-body ${classes.content}`}>
          <TheContent location={props.location.pathname} />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
