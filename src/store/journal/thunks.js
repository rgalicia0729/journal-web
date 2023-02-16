import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './';


export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const note = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const noteDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(noteDoc, note);

        note.id = noteDoc.id;

        dispatch(addNewEmptyNote(note));
        dispatch(setActiveNote(note));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const noteDoc = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(noteDoc, noteToFirestore, { merge: true });

        dispatch(updateNote(note));
    }
}