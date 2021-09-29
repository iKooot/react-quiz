import React from 'react'
import classes from './FinishedQuiz.module.sass'
import Button from '../../components/UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total ++
    }
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {
          props.quiz.map((quizItem, i) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              classes[props.results[quizItem.id]]
            ]

            console.log(classes[props.results[quizItem.id]])

            return (
              <li key={i}>
                <strong>{i + 1}</strong>&nbsp;
                  {quizItem.question}
                <i className={cls.join(' ')}/>
              </li>
            )
          })
        }
      </ul>
      <p>Correct {successCount} of {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type="primary">Repeat quiz</Button>
        <Link to='/'>
          <Button onClick={props.onRetry} type="success">Go to quiz list</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz