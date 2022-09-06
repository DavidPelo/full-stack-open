import {useState} from 'react';
import PopularAnecdote from './components/PopularAnecdote';
import RandomAnecdote from './components/RandomAnecdote';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState (0);
  const [votes, setVotes] = useState (anecdotes.map (anecdote => 0));

  const handleAnecdote = () => {
    setSelected (Math.floor (Math.random () * anecdotes.length));
  };

  const handleVotes = () => {
    const newVotes = votes.slice ();
    newVotes[selected]++;
    setVotes (newVotes);
  };

  const highestRatedIndex = votes.indexOf (Math.max (...votes));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xs-12">
          <RandomAnecdote
            anecdote={anecdotes[selected]}
            votes={votes[selected]}
          />
          <button className="btn btn-primary" onClick={handleVotes}>
            vote
          </button>
          <button className="btn btn-primary" onClick={handleAnecdote}>
            next anecdote
          </button>
          <PopularAnecdote
            anecdote={anecdotes[highestRatedIndex]}
            votes={votes[highestRatedIndex]}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
