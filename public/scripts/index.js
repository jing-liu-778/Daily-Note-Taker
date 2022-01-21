
const noteTile;
const noteText;
const saveNoteBtn;
const newNoteBtn;
const noteList;

if (window.location.pathname === '/notes'){
 noteTile = document.querySelector('.note-title');
 noteText = document.querySelector('.note-textarea');
 saveNoteBtn = document.querySelector('.save-note');
 newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group')
}

// activeNote is used to keep track of the note in the textarea
let activeNote = {};
// show an element
const show = (elem)=>{
    elem.style.display = 'inline'
}

// hide an element
const hide =(elem)=>{
    elem.style.display = 'none'
}

// get notes from db
const getNotes =()=>{
    fetch('/api/notes', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
          console.error('Error:', error);
        });
}

// saving a note to the db

const saveNote = (note)=>{
    fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data);
          createCard(note);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

}



// delete a note from the db
const deleteNote = (id)=>{
    fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
}

// If there is an activeNote, display it 

const renderActiveNote =()=>{
    hide(saveNoteBtn)
    if (activeNote.id) {
        noteTile.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTile.value = activeNote.title;
        noteText.value = activeNote.text;
      } else {
        noteTile.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTile.value = '';
        noteText.value = '';
      }
};

// get note data and save it to the db 

const handleNoteSave = () => {
    const newNote = {
      title: noteTile.value,
      text: noteText.value,
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

// delete the note
const handleNoteDelete = (e) => {
    // prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
  
    if (activeNote.id === noteId) {
      activeNote = {};
    }
  
    deleteNote(noteId).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  // set the activeNote and display it 
  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };
  
  // Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
  };
  
  // if  note title or text is empty then hide the save button, else show the save button
  const handleRenderSaveBtn = () => {
    if (!noteTile.value.trim() || !noteText.value.trim()) {
      hide(saveNoteBtn);
    } else {
      show(saveNoteBtn);
    }
  };
  
  // Render the list of note titles
  const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
      noteList.forEach((el) => (el.innerHTML = ''));
    }
  
    let noteListItems = [];
  
    // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
  
      const spanEl = document.createElement('span');
      spanEl.innerText = text;
      spanEl.addEventListener('click', handleNoteView);
  
      liEl.append(spanEl);
  
      if (delBtn) {
        const delBtnEl = document.createElement('i');
        delBtnEl.classList.add(
          'fas',
          'fa-trash-alt',
          'float-right',
          'text-danger',
          'delete-note'
        );
        delBtnEl.addEventListener('click', handleNoteDelete);
  
        liEl.append(delBtnEl);
      }
  
      return liEl;
    };
  
    if (jsonNotes.length === 0) {
      noteListItems.push(createLi('No saved Notes', false));
    }
  
    jsonNotes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
  
      noteListItems.push(li);
    });
  
    if (window.location.pathname === '/notes') {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
  };
  
  // Gets notes from the db and renders them to the sidebar
  const getAndRenderNotes = () => getNotes().then(renderNoteList);
  
  if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    noteTitle.addEventListener('keyup', handleRenderSaveBtn);
    noteText.addEventListener('keyup', handleRenderSaveBtn);
  }
  
  getAndRenderNotes();