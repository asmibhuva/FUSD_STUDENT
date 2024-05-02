import { API } from 'aws-amplify';
import * as queries from '../../Queries/Queries';


export const getNextQuestion = (value) => {
  return API.graphql({ query: queries.getNextQuestionQuery(value) });
}

export const submitExam = (values) => {
  // console.log("values", values)
  // console.log("Mut", queries.submitQuestionQuery(values))
  return API.graphql({ query: queries.submitQuestionQuery(values) })
}