import React, { useEffect, useRef } from 'react'
import CreateNotes from './CreateNotes'
import { useState } from 'react'
import "../Note.css";
import {v4 as uuid} from 'uuid'
import Note from './Note';

function Notes() {
    const [inputText, setInput] = useState("")
    const [notes, setNotes] = useState([]);
    const [edit, setEdit] = useState(null);
    const isFirstRender = useRef(true);

    const editHandler = (id, text) => {
        setEdit(id);
        setInput(text);
    }

    const saveHandler = () => {
        if (edit) {
            setNotes(notes.map((note) => {
                return note.id === edit ?
                    { ...note, text: inputText }
                    : note
            }))
        } else {
            setNotes((prevNote) => [
                ...prevNote, {
                    id: uuid(),
                    text: inputText
                }
            ])
        }
        setInput("")
        setEdit(null)
    }

        const deleteHandle = (id) => {
            const newNotes = notes.filter(n => n.id !== id);
            setNotes(newNotes)
        }

    // Load from localStorage on mount
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        console.log("Loaded:", data);
        if (data) {
            setNotes(data)
        }
    }, [])

    // Save to localStorage, but skip the first render
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        window.localStorage.setItem("Notes", JSON.stringify(notes));
    }, [notes])

    return (
        <div className='notes'>
            {
                notes.map((note) => (
                    edit === note.id ?
                        <CreateNotes
                            key={note.id}
                            inputText={inputText}
                            setInput={setInput}
                            saveHandler={saveHandler}
                        />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            editHandler={editHandler}
                            deleteHandle={deleteHandle}
                        />
                ))
            }
            {
                edit === null ?
                    <CreateNotes
                        inputText={inputText}
                        setInput={setInput}
                        saveHandler={saveHandler}
                    /> : <></>
            }
        </div>
    )
}

export default Notes