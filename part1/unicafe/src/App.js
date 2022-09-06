import {useState} from 'react';

import './App.css';
import Statistics from './components/Statistics';
import Button from './components/Button';

function App () {
  const [good, setGood] = useState (0);
  const [neutral, setNeutral] = useState (0);
  const [bad, setBad] = useState (0);

  const handleGoodFeedback = () => {
    setGood (good + 1);
  };

  const handleNeutralFeedback = () => {
    setNeutral (neutral + 1);
  };

  const handleBadFeedback = () => {
    setBad (bad + 1);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xs-12">
          <h1>Give Feedback</h1>
          <Button type="btn-success" action={handleGoodFeedback} label="good" />
          <Button
            type="btn-primary"
            action={handleNeutralFeedback}
            label="neutral"
          />
          <Button type="btn-danger" action={handleBadFeedback} label="bad" />
          {good !== 0 || neutral !== 0 || bad !== 0
            ? <Statistics good={good} neutral={neutral} bad={bad} />
            : <p>No feedback given...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
