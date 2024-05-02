import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CRow, CSpinner } from '@coreui/react'
import { makeStyles } from '@material-ui/styles'
import { Checkbox, FormControlLabel, Button } from '@material-ui/core';
import { Rating } from 'react-simple-star-rating'
import { ReactComponent as StarSvg } from './Svgs/star.svg';
import BeautyStars from 'beauty-stars';
import { I18n } from '@aws-amplify/core';

const useStyles = makeStyles(theme => ({
  question: {
    fontSize: "28px",
    textTransform:"capitalize",
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
  stars: {
    [theme.breakpoints.down('sm')]: {
      marginTop: "20px",
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: "50px",
      width: "70%",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "50px",
      width: "60%",
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: "80px",
      width: "50%",
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
      gridTemplateColumns: "1fr auto auto",
      padding: "0 20px",
    },
    [theme.breakpoints.up('md')]: {
      marginTop: "50px",
      gridTemplateColumns: "1fr auto auto",
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
    backgroundColor: "#3C4B64",
    color: "#fff",
    cursor: "pointer",
    maxWidth: "250px",
    flex: "1",
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
  btnPrev: {
    padding: "10px 60px",
    border: "1px solid #3C4B64",
    color: "#3C4B64",
    flex: "1",
    cursor: "pointer",
    maxWidth: "250px",
    fontSize: "18px",
    borderRadius: "5px",
    textAlign: "center",
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
  btnDisabled: {
    backgroundColor: "#9fadc6 !important",
    color: "#3C4B64 !important"
  }
}));
const StarRatings = ({
  question,
  optionData,
  setQNo,
  questionData,
  setQNoFnPrev,
  langCode
}) => {

  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  return (
    <div>
      <CCard style={{ borderRadius: "10px", minHeight: "435px" }}>
        <CCardBody style={{ display: "flex", justifyContent: "space-between", flexFlow: "column" }}>
          <CRow>
            <CCol sm="12" className={classes.question}>
              <span style={{ fontWeight: "bold" }}>{I18n.get("QUESTION")}:</span> {questionData && questionData[`title_${langCode.toUpperCase()}`]}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div className={classes.stars} >
                <BeautyStars
                  value={rating}
                  onChange={value => setRating(value)}
                  size={"100%"}
                  inactiveColor="#e0e0e0"
                  activeColor="#FFC107"
                />
              </div>
              {/* <Rating
                ratingValue={rating}
                onClick={(e) => { setRating(e) }}
                size={128}
                fillColor="#FFC107"
                className={classes.stars}
              > */}

              {/* <StarSvg /> */}

              {/* </Rating> */}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className={classes.footer}>
              <div className={classes.anonymous}>
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
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* <div className={classes.btnPrev} onClick={setQNoFnPrev}>
                  Previous
                </div> */}

                <Button
                  classes={{
                    root: classes.btn,
                    disabled: classes.btnDisabled
                  }}
                  color="primary"
                  onClick={() => {
                    setIsSubmitting(true)
                    setQNo({
                      'answerId': "123",
                      category: questionData.category,
                      'isSkipped': false,
                      'langCode': langCode,
                      questionId: questionData.questionId,
                      repeat: 0,
                      subCategory: questionData.subCategory,
                      surveyId: questionData.surveyId,
                      choice: {
                        order: 0,
                        score: rating,
                        text: "",
                      }
                    })
                  }}
                  variant="contained"
                  disabled={!rating}
                >
                  {isSubmitting ? I18n.get("SUBMITTING") : I18n.get("SUBMIT")}

                </Button>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div >
  )
}

export default StarRatings
