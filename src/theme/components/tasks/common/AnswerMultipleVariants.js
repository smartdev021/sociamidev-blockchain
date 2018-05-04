import React from 'react';

const AnswerMultipleVariants = (props) => {
    console.log("%AnswerMultipleVariants", "color: red; background: blue;");
    console.dir(props);
    return (<div className="QuestionAnswersFlow-textarea" id={`answer_your_${props.question._id}`}>
        {
            props.question.answers.map((answer, i) => {
                return (<div key={i}>
                    <input id={i} type="checkbox"
                        className="validate-field required question-answer-checkbox"
                        name="answer_your" onChange={(e) => props.onHandleAnswerCheckbox(e)}
                        checked={props.answerMy.options[i]} />
                    <span>{answer}</span>
                </div>)
            })
        }
        {props.partner &&
            <div className="col-lg-6">
                <div className="form-group">
                    <textarea readOnly={true} tabIndex="-1" id={`answer_partner_${props.question._id}`}
                        className="validate-field required question-text-area" placeholder={props.partner.user.firstName}
                        name="answer_partner" checked={props.answerPartner.checked} />
                </div>
            </div>
        }
    </div>);
}

export default AnswerMultipleVariants;