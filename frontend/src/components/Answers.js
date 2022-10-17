import React from 'react'

const Answers = ({className, disabled = false, submitAnswer}) => {

  const handleSubmit = (e) => {
    event.preventDefault();
    submitAnswer(e);
  }

  return (
    <div className={`${className} flex justify-between absolute sm:relative w-full sm:max-w-md sm:mx-auto left-0 p-2`}>
        <button disabled={disabled} className="answer" onClick={handleSubmit} value={1}>Never</button>
        <button disabled={disabled} className="answer" onClick={handleSubmit} value={2}>Meh</button>
        <button disabled={disabled} className="answer" onClick={handleSubmit} value={3}>50/50</button>
        <button disabled={disabled} className="answer" onClick={handleSubmit} value={4}>Sure</button>
        <button disabled={disabled} className="answer" onClick={handleSubmit} value={5}>100%</button>
    </div>
  )
}

export default Answers