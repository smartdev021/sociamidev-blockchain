import React from 'react';

const AnswerMultipleVariants = (props) => {
    return (<div className="QuestionAnswersFlow-textarea" id={`answer_your_${props.question._id}`}>
        <input id="0" type="checkbox"
            className="validate-field required question-answer-checkbox"
            name="answer_your" onChange={(e) => props.onHandleAnswerCheckbox(e)}
            checked={props.answerMy && props.answerMy.options && props.answerMy.options[0]} />
        <span>{`Sample answer for the given question ${props.question._id}`}</span><br></br>

        <input id="1" type="checkbox"
            className="validate-field required question-answer-checkbox"
            name="answer_your" onChange={(e) => props.onHandleAnswerCheckbox(e)}
            checked={props.answerMy && props.answerMy.options && props.answerMy.options[1]} />
        <span>{`Sample answer for the given question ${props.question._id}`}</span>

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