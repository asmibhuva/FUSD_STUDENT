import { CCard, CCardBody, CCol, CRow, CSpinner } from '@coreui/react'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { I18n } from '@aws-amplify/core';

const useStyles = makeStyles(theme => ({
  question: {
    fontSize: "28px",
    textTransform: "capitalize",
    [theme.breakpoints.down('sm')]: {
      fontSize: "24px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "34px",
    },
  },
  options: {
    marginTop: "50px",
    fontSize: "24px",
    padding: "0 80px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "80px",
    rowGap: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "13px",
      padding: "0 30px",
      gridTemplateColumns: "1fr",
      columnGap: "40px",
      rowGap: "20px",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "18px",
      padding: "0 50px",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "60px",
      rowGap: "30px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "20px",
      padding: "0 50px",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "60px",
      rowGap: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "24px",
      padding: "0 80px",
      gridTemplateColumns: "1fr 1fr 1fr",
      columnGap: "80px",
      rowGap: "40px",
    },
  },
  footer: {
    marginTop: "80px",
    padding: "0 70px",
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "auto 1fr",
    // justifyContent:"space-between",
    [theme.breakpoints.down('sm')]: {
      marginTop: "20px",
      gridTemplateColumns: "1fr",
      padding: "0 10px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "50px",
      gridTemplateColumns: "1fr auto",
      padding: "0 20px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "50px",
      gridTemplateColumns: "1fr auto",
      padding: "0 20px",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "80px",
      padding: "0 50px",
    },
  },
  anonymous: {
    color: "#3C4B64",
    fontWeight: "100",
    fontStyle: "italic",
  },
  btn: {
    padding: "10px 60px",
    // backgroundColor: "#3C4B64",
    // color: "#fff",
    cursor: "pointer",
    flex: "1",
    maxWidth: "220px",
    fontSize: "18px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    // maxWidth:"150px",
    [theme.breakpoints.down('sm')]: {
      marginTop: "20px",
      marginRight: "10px",
      padding: "10px 15px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "0",
      marginRight: "15px",
      padding: "10px 30px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "0",
      marginRight: "15px",
      padding: "10px 50px",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "0",
      marginRight: "20px",
      padding: "10px 60px",
    },
  },
  optionImg: {
    fontSize: "20px",
    color: "#3C4B64",
    padding: "20px 10px",
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr",
    margin: "auto",
    border: "1px solid #fff",
    maxWidth: "350px",
    borderRadius: "10px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "22px",
    },
    "&:hover": {
      background: "#dfe4ec",
    },
  },
  optionSelectImg: {

    border: "1px solid #3C4B64",
    "&:hover": {
      background: "none",
    },

  },
  option: {
    fontSize: "20px",
    border: "1px solid #3C4B64",
    color: "#3C4B64",
    padding: "15px 70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "350px",
    borderRadius: "10px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "18px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "22px",
    },
    "&:hover": {
      backgroundColor: "#dfe4ec",
    },
  },
  optionSelect: {
    backgroundColor: "#3C4B64",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#3C4B64",
    },
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      padding: "10px 20px",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "20px 30px",
    },
    [theme.breakpoints.up('md')]: {
      padding: "30px 30px",
    },
    [theme.breakpoints.up('lg')]: {
      padding: "40px 40px",
    },
  },

  btnDisabled: {
    backgroundColor: "#9fadc6 !important",
    color: "#3C4B64 !important"
  }
}));


const BasicQuestion = ({ question, optionData, setQNo, questionData, langCode }) => {

  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <CCard style={{ borderRadius: "10px", minHeight: "435px" }}>
      <CCardBody style={{ display: "flex", justifyContent: "space-between", flexFlow: "column" }}>
        <CRow>
          <CCol sm="12" className={classes.question}>
            <span style={{ fontWeight: "bold" }}>{I18n.get("QUESTION")}:</span> {questionData && questionData[`title_${langCode.toUpperCase()}`]}
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" className={classes.options}>
            {
              questionData?.choices?.map((optionData, i) => (
                <div
                  key={i}
                  style={{ cursor: "pointer" }}
                  className={optionData.imgURL !== ""
                    ? ((selectedOption !== null
                      && selectedOption[`text_${langCode.toUpperCase()}`]) === optionData[`text_${langCode.toUpperCase()}`]
                      ? classes.optionImg + " " + classes.optionSelectImg
                      : classes.optionImg)
                    : ((
                      selectedOption !== null
                      && selectedOption[`text_${langCode.toUpperCase()}`]) === optionData[`text_${langCode.toUpperCase()}`]
                      ? classes.option + " " + classes.optionSelect
                      : classes.option
                    )
                  }
                  onClick={() => setSelectedOption({ ...optionData, order: i })}
                >
                  {optionData?.imgURL !== "" && <img src={optionData.imgURL} className={`img-fluid ${classes.img}`} />}
                  {optionData[`text_${langCode.toUpperCase()}`]}
                </div>
              ))
            }
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" className={classes.footer}>
            {questionData.allowAnonymous && <div className={classes.anonymous}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAnonymous}
                    onChange={() => { setIsAnonymous(!isAnonymous) }}
                    style={{
                      fontWeight: "100",
                      fontStyle: "italic",
                      color: "#3C4B64",
                    }}
                  />
                }
                label={I18n.get("ANS_ANONYMOUSLY")}
              />
            </div>}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* <div className={classes.btn} onClick={setQNo}>
                Submit
              </div> */}
              {!isSubmitting ? <Button
                classes={{
                  root: classes.btn,
                  disabled: classes.btnDisabled
                }}
                color="primary"
                onClick={() => {
                  setIsSubmitting(true)
                  setQNo({
                    'answerId': "123",
                    'category': questionData.category,
                    'langCode': langCode,
                    'isSkipped': false,
                    'questionId': questionData.questionId,
                    'repeat': 0,
                    'isAnonymous': isAnonymous,
                    'subCategory': questionData.subCategory,
                    'surveyId': questionData.surveyId,
                    'choice': {
                      'order': selectedOption.order,
                      'score': selectedOption.score,
                      'text': selectedOption[`text_${langCode.toUpperCase()}`],
                    }
                  }, setIsSubmitting)
                }}
                variant="contained"
                disabled={!selectedOption}
              >
                {I18n.get("SUBMIT")}
              </Button> :
                <Button
                  classes={{
                    root: classes.btn,
                    disabled: classes.btnDisabled
                  }}
                  color="primary"
                  variant="contained"
                  disabled={!selectedOption}
                >
                  {I18n.get("SUBMITTING")}

                </Button>}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default BasicQuestion
