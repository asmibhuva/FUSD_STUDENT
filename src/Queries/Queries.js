export const getNextQuestionQuery = (value) => (`
query MyQuery {
  nextQuestion (currentDate:"${value.currentDate}") {
    activeEndDate
    activeStartDate
    waitingFlag
    allowAnonymous
    allowSkip
    audioURL
    category
    choiceSelectType
    infoText_EN
    infoText_SP
    level
    questionId
    questionType
    repeatAllowed
    subCategory
    surveyId
    title_EN
    title_SP
    choices {
      imgURL
      infoText_EN
      infoText_SP
      order
      score
      selectImgURL
      subText_EN
      subText_SP
      text_EN
      text_SP
    }
  }
}
`)

export const submitQuestionQuery = (values) => (`
mutation MyMutation {
  recordAnswer(info: {
    answerId: "${values.answerId}", 
    category: "${values.category}", 
    currentDate: "${values.currentDate}",
    isSkipped: ${values.isSkipped}, 
    questionId: ${values.questionId}, 
    repeat: 0, 
    subCategory: "${values.subCategory}",
    isAnonymous:${values.isAnonymous},
    school:"${values.school}"
    name:"${values.name}",
    email:"${values.email}",
    surveyId: "${values.surveyId}",
    ${values?.choice ? (`choice: {
      language: ${values.langCode},
      order: ${values.choice.order}, 
        score: ${values.choice.score}, 
        text: "${values.choice.text}"
      }`) : ""
  }
  })
}

`)