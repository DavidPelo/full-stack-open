import {useEffect, useState} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState ([]);
  const [newNote, setNewNote] = useState ('');
  const [showAll, setShowAll] = useState (true);
  const [errorMessage, setErrorMessage] = useState (null);

  const getNotes = async () => {
    const initialNotes = await noteService.getAll ();
    setNotes (initialNotes);
  };

  useEffect (() => {
    getNotes ();
  }, []);
  console.log ('render', notes.length, 'notes');

  const addNote = e => {
    e.preventDefault ();

    const noteObject = {
      content: newNote,
      date: new Date ().toISOString (),
      important: Math.random () < 0.5,
      id: notes.length + 1,
    };

    noteService.create (noteObject).then (newNote => {
      setNotes (notes.concat (newNote));
      setNewNote ('');
    });
  };

  const handleNoteChange = e => {
    setNewNote (e.target.value);
  };

  const toggleImportanceOf = id => {
    const note = notes.find (n => n.id === id);
    const changedNote = {...note, important: !note.important};

    noteService
      .update (id, changedNote)
      .then (updatedNote => {
        setNotes (notes.map (n => (n.id !== id ? n : updatedNote)));
      })
      .catch (error => {
        setErrorMessage (
          `Note '${note.content}' was already removed from server`
        );
        setTimeout (() => {
          setErrorMessage (null);
        }, 5000);
        setNotes (notes.filter (n => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter (note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll (!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map (note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf (note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
