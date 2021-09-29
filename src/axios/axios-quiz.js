import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-d9ecf-default-rtdb.europe-west1.firebasedatabase.app/'
})