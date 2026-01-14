import './App.css'
import Navbar from './components/navbar'
import { useEffect, useState } from 'react'
import Card from './components/Card'

function App() {
    const [notes, setNotes] = useState([])
    const [isDark, setIsDark] = useState(true)
    const [currentNote, setcurrentNote] = useState({ title: "", desc: "" })
  
  // Apply theme on component mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Load saved theme preference and notes on mount
  useEffect(()=>{
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
    }
    console.log("I am use effect")
    let localNotes = localStorage.getItem("notes")
    if(localNotes){
      try{
        setNotes(JSON.parse(localNotes))
      }catch(err){
        console.error('Failed to parse stored notes:', err)
        localStorage.removeItem('notes')
      }
    }
  },[])
  
  useEffect(() => {
    localStorage.setItem('Notes', JSON.stringify(notes))
  }, [notes])
  

  
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newNotes = [...notes, currentNote]
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
    setcurrentNote({title: "",desc:""})
  }
  
    const deleteNote=(title)=>{
    setNotes(notes.filter(item => item.title !==title))
    localStorage.setItem('notes', JSON.stringify(notes.filter(item => item.title !==title)))

    }
  const handleChange = (e) => {
    setcurrentNote({ ...currentNote, [e.target.name]: e.target.value })
    console.log(currentNote)
  }


  return (
    <>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      
      <main>
        <h1>Create your note</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input value={currentNote.title} onChange={handleChange} type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="desc">Description</label> 
            <textarea name="desc" id="desc" onChange={handleChange} value={currentNote.desc}></textarea>
          </div>
          <button>Create Note</button>
        </form>
      
      <section className='noteSection'>
        <h2>Your Notes</h2>
        <div className='container'>
          {notes && notes.map((note, idx) => {
          return <Card key={idx} title={note.title} deleteNote={deleteNote} desc={note.desc}/>
        })}
        {notes.length == 0 && <div>Add a note to continue </div>}
        </div>
      </section>
      </main>
    </>
  )
}

export default App
