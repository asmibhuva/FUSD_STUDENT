import { I18n } from "@aws-amplify/core";
import { CSpinner } from "@coreui/react";
import { IconButton } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AUDIO_FILE_BUCKET,
  AWSConfig,
  COGNITODOMAIN,
  HOSTURL,
  REGION,
} from "src/aws-exports";
import { signOut } from "src/_redux/Login/LoginCRUD/LoginAuth";
import {
  getNextQuestion,
  submitExam,
} from "src/_redux/Questions/QuestionsCRUD";
import BasicQuestion from "./BasicQuestion/BasicQuestion";
import NumberRatings from "./NumberRatings/NumberRatings";
import StarRatings from "./StarRatings/StarRatings";
import Alert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

export const logoutURL = `https://${COGNITODOMAIN}.auth.${REGION}.amazoncognito.com/logout?client_id=${AWSConfig.aws_user_pools_web_client_id}&logout_uri=${HOSTURL}`;

const getQuestionAudioURL = (questionId, LangCode) => {
  const audioUrl = `https://${AUDIO_FILE_BUCKET}.s3.amazonaws.com/audio-files/Q${questionId}_${LangCode}.mp3`;
  try {
    const audio = new Audio(audioUrl);
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("audio played auto");
        })
        .catch((error) => {
          console.log("playback prevented");
        });
    }
  } catch (error) {
    console.log("error While Playing Audio\n", error);
  }
};

const useStyles = makeStyles((theme) => ({
  helpers: {
    display: "grid",
    gap: "30px",
    gridTemplateColumns: "auto auto auto",
    padding: "5px 0px",
    fontSize: "16px",
  },
  queNo: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  skip: {
    textDecoration: "underline",
    fontStyle: "italic",
    fontWeight: "300",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  soundIcon: {
    cursor: "pointer",
  },
}));

const Questions = ({ userData, schoolName }) => {
  const classes = useStyles();

  const [questionData, setQuestionData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { langCode } = useSelector(
    (state) => ({
      langCode: state.langCode.langCode,
    }),
    shallowEqual
  );

  const history = useHistory();

  const setQNoFn = (values) => {
    submitExam({
      ...values,
      name: userData.name,
      email: userData.email,
      currentDate: moment().format("YYYY-MM-DD"),
      school: schoolName,
    })
      .then(({ data }) => {
        if (data.recordAnswer === true) {
          history.replace("/thankYou");
        }
      })
      .catch((err) => {
        console.log("err In Submitting", err);
      });
  };
  const setQNoFnPrev = () => {};
  const getQue = (questionType) => {
    switch (questionType) {
      // case 1:
      //   return <NormalMcqQuestions
      //     question="Which is your favorite school subject?"
      //     optionData={optionData0}
      //     setQNo={setQNoFn}
      //     questionData={questionData}
      //   />
      case "num-rating":
        return (
          <NumberRatings
            question="How was the storytelling experience today"
            type={"Emoji"}
            setQNo={setQNoFn}
            setQNoFnPrev={setQNoFnPrev}
            questionData={questionData}
            langCode={langCode}
          />
        );
      case "star-rating":
        return (
          <StarRatings
            question="How would you rate you class experience today?"
            type={"Emoji"}
            setQNo={setQNoFn}
            setQNoFnPrev={setQNoFnPrev}
            questionData={questionData}
            langCode={langCode}
          />
        );
      case "basic":
        return (
          <BasicQuestion
            question="How are you feeling today?"
            type={"Emoji"}
            setQNo={setQNoFn}
            setQNoFnPrev={setQNoFnPrev}
            questionData={questionData}
            langCode={langCode}
          />
        );
      default:
        return (
          <div
            style={{
              flex: 1,
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
        );
    }
  };

  const getQuestion = () => {
    getNextQuestion({
      currentDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
    })
      .then(({ data }) => {
        // if (data.nextQuestion.waitingFlag) {
        //   console.log('Log out from Azure account')
        //   sessionStorage.clear();
        //   window.alert("Sorry, You have reached the daily limit of this account.");
        //   window.location = logoutURL
        // }
        setQuestionData(data.nextQuestion);
      })
      .catch((err) => {
        window.alert("Error in Getting dashboard Data");
        console.log("queERR", err);
        setIsLoading(true);
        const currentActiveSession = JSON.parse(
          sessionStorage.getItem("currentSesion")
        );
        if (currentActiveSession?.loginMode === "MS") {
          console.log("Log out from Azure account");
          sessionStorage.clear();
          window.location = logoutURL;
        } else {
          console.log("Log out from Amplify account");
          if (currentActiveSession?.loginMode === "AMPLIFY") {
            signOut()
              .then((res) => {
                sessionStorage.clear();
                window.location = logoutURL;
              })
              .catch((err) => {
                console.log("Error in SignOut", err);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }
        }
      })
      .finally((data) => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    getQuestion();
  }, []);

  return (
    <div style={{ minHeight: "435px", display: "flex", flexFlow: "column" }}>
      {isLoading ? (
        <div
          style={{
            flex: 1,
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
      ) : questionData?.waitingFlag ? (
        <Alert
          severity="error"
          style={{
            border: "1px solid #611a15",
          }}
        >
          {I18n.get("WAITING_FLAG_MSG")}
        </Alert>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div className={classes.helpers}>
              {/* <div className={classes.queNo}>01/03</div> */}
              {questionData.allowSkip && (
                <div
                  className={classes.skip}
                  onClick={() =>
                    setQNoFn({
                      answerId: "123",
                      category: questionData.category,
                      isSkipped: true,
                      isAnonymous: false,
                      questionId: questionData.questionId,
                      repeat: 0,
                      langCode: langCode,
                      subCategory: questionData.subCategory,
                      surveyId: questionData.surveyId,
                    })
                  }
                >
                  {I18n.get("SKIP")}
                </div>
              )}
              {questionData?.questionId && (
                <div className={classes.soundIcon}>
                  <IconButton
                    onClick={() =>
                      getQuestionAudioURL(
                        questionData?.questionId,
                        langCode.toUpperCase()
                      )
                    }
                  >
                    <VolumeUpIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          {getQue(questionData?.questionType)}
          {/* <Alert severity="info">This is an info alert — check it out!</Alert> */}
        </>
      )}
    </div>
  );
};

export default Questions;
