import React, { Component } from 'react'
import classes from './QuizCreator.module.sass'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Select from '../../components/UI/Select/Select'
import {validate, validateForm} from '../../form/formFramework'
import axios from '../../axios/axios-quiz'
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz, setQuizName} from '../../store/actions/create'

function createOptionControls (number) {
  return createControl({
    label: `${number} option`,
    errorMessage: 'Value can`t be empty',
    id: number,
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter your question',
      errorMessage: 'Question can`t be empty'
    }, {required: true}),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4),
  }
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    // quiz: {
    //   // name: null,
    //   questions: [],
    // },
    quizNameQuestion: createControl({
      label: 'Enter your quiz name',
      errorMessage: 'Question can`t be empty'
    }, {required: true}),
    formControls: createFormControls()
  }

  submitHandle = e => {
    e.preventDefault()
  }

  addQuestionHandler = e => {
    e.preventDefault()
    // const quiz = {...this.props.quiz}
    // const index = quiz.questions.length + 1

    const {option1, option2, option3, option4, question} = this.state.formControls

    const questionItem = {
      question: question.value,
      // id: index,
      id: this.props.quiz.questions.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  createQuizHandler = async e => {
    e.preventDefault()

      this.props.finishCreateQuiz()

      this.setState({
        isFormValid: false,
        rightAnswerId: 1,
        quizNameQuestion: createControl({
          label: 'Enter your quiz name',
          errorMessage: 'Question can`t be empty'
        }, {required: true}),
        formControls: createFormControls()
      })

  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]

      return (
          <Auxillary key={i}>
            <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={ e => this.changeHandler(e.target.value, controlName)}
            />
            { i === 0 ? <hr/> : null }
          </Auxillary>
      )
    })
  }

  selectChangeHandler = e => {
    this.setState({
      rightAnswerId: +e.target.value
    })
  }

  nameChangeHandler = e => {
    e.preventDefault()
    const quizNameQuestion = { ...this.state.quizNameQuestion }

    quizNameQuestion.touched = true
    quizNameQuestion.value = e.target.value
    quizNameQuestion.valid = validate(quizNameQuestion.value, quizNameQuestion.validation)

    this.setState({
      quizNameQuestion
    })
  }

  addQuizTitleHandler = e => {
    e.preventDefault()

    const quiz = { ...this.props.quiz }
    quiz.name = this.state.quizNameQuestion.value

    this.props.setQuizName(quiz)
  }

  render() {


    const select = <Select
        label='Choose the right answer'
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          {text: 1, value: 1},
          {text: 2, value: 2},
          {text: 3, value: 3},
          {text: 4, value: 4},
        ]}
    />

    const quizName = <Input
        label={this.state.quizNameQuestion.label}
        value={this.state.quizNameQuestion.value}
        valid={this.state.quizNameQuestion.valid}
        shouldValidate={!!this.state.quizNameQuestion.validation}
        touched={this.state.quizNameQuestion.touched}
        errorMessage={this.state.quizNameQuestion.errorMessage}
        onChange={this.nameChangeHandler}
    />

    const quisCreate = <>{this.renderInputs()} {select}</>


    return (
        <div className={classes.QuizCreator}>
          <div>
            <h1>Quiz Creator</h1>

            <form onSubmit={this.submitHandle}>

              {
                !this.props.quiz.name ? quizName : quisCreate
              }
              {
                !this.props.quiz.name
                    ? <Button
                        type="primary"
                        onClick={this.addQuizTitleHandler}
                        disabled={!this.state.quizNameQuestion.valid}
                    >
                      Add quiz title
                    </Button>
                    : <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >
                      Add quiz question
                    </Button>
              }


              <Button
                  type="success"
                  onClick={this.createQuizHandler}
                  disabled={this.props.quiz.questions.length === 0}
              >
                create quiz
              </Button>
            </form>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    setQuizName: name => dispatch(setQuizName(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)