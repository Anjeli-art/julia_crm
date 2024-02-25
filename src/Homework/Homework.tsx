import React, {ChangeEvent, memo, useEffect, useState} from "react";
import {v1} from "uuid";
import s from "../Homework/Homework.module.css";

type NoteType = {
    id: string
    text: string
}

export const Homework = memo(() => {

    const [notes, setNotes] = useState<NoteType[]>(() => {
        const savedData = localStorage.getItem('notes')
        return savedData ? JSON.parse(savedData) : []
    })
    const [textarea, setTextarea] = useState<string>('')

    const changeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextarea(e.currentTarget.value)
    }

    const addNoteHandler = () => {
        const newNotes = [...notes, {
            id: v1(),
            text: textarea
        }]

        setNotes(newNotes)
        setTextarea('')
    }

    const deleteNoteHandler = (id: string) => {
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes)
    }

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    return (
        <section className={s.homework}>
            <div className={s.container}>
                <div className={s.content}>
                    <div className={s.create}>
                        <textarea className={s.create__text} cols={30} rows={5} value={textarea}
                                  onChange={changeTextareaHandler}></textarea>
                        <button className={s.create__button} onClick={addNoteHandler}>добавить заметку</button>
                    </div>
                    <div className={s.notes}>
                        {
                            notes.map(el => <div className={s.note} key={el.id}>
                                <button className={s.note__button} onClick={() => deleteNoteHandler(el.id)}>&#128686;</button>
                                <p className={s.note__text}>{el.text}</p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
})
