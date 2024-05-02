import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { makeStyles } from '@material-ui/styles'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import EmojiOptions from './Options/EmojiOptions';
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
  options: {
    marginTop: "50px",
    fontSize: "24px",
    display: "grid",
    padding: "0 80px",
    gridTemplateColumns: "repeat(5, 1fr)",
    columnGap: "80px",
    rowGap: "40px",
    [theme.breakpoints.down('sm')]: {
      fontSize: "13px",
      padding: "0 10px",
      gridTemplateColumns: "repeat(2, 1fr)",
      columnGap: "20px",
      rowGap: "20px",
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: "18px",
      padding: "0 20px",
      gridTemplateColumns: "repeat(3, 1fr)",
      columnGap: "30px",
      rowGap: "30px",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: "20px",
      padding: "0 30px",
      gridTemplateColumns: "repeat(4, 1fr)",
      columnGap: "40px",
      rowGap: "30px",
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: "24px",
      padding: "0 40px",
      gridTemplateColumns: "repeat(5, 1fr)",
      columnGap: "50px",
      rowGap: "40px",
    },
  },
  footer: {
    marginTop: "80px",
    padding: "0 70px",
    display: "grid",
    alignItems: "center",
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
    backgroundColor: "#3C4B64",
    color: "#fff",
    cursor: "pointer",
    flex: "1",
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
  btnPrev: {
    padding: "10px 60px",
    border: "1px solid #3C4B64",
    color: "#3C4B64",
    cursor: "pointer",
    maxWidth: "250px",
    flex: "1",
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
  }
}));

const EmojiQuestion = ({ question, optionData = [], setQNo, setQNoFnPrev }) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div>
      <CCard style={{ borderRadius: "10px", minHeight: "435px" }}>
        <CCardBody style={{ display: "flex", justifyContent: "space-between", flexFlow: "column" }}>
          <CRow>
            <CCol sm="12" className={classes.question}>
              <span style={{ fontWeight: "bold" }}>{I18n.get("QUESTION")}:</span> {question}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className={classes.options}>
              {
                optionData.map((data, i) => (
                  <EmojiOptions
                    key={i}
                    optionData={data}
                    selectedOption={selectedOption}
                    setSelectedOption={(value) => setSelectedOption(value)}
                  />
                ))
              }
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" className={classes.footer}>
              <div className={classes.anonymous}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="#3C4B64"
                      checked={isAnonymous}
                      onChange={() => { setIsAnonymous(!isAnonymous) }}
                      style={{
                        fontWeight: "100",
                        fontStyle: "italic",
                      }}
                    />
                  }
                  label="Answer Anonymously"
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={classes.btnPrev} onClick={setQNoFnPrev}>
                  Previous
                </div>

                <div className={classes.btn} onClick={setQNo}>
                  Submit
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default EmojiQuestion
