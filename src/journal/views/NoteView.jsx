import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startDelitingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { title, body, date, onFormChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDelitingNote());
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button color="primary" sx={{ padding: 2 }} disabled={isSaving} onClick={onSaveNote}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un t??tulo"
                    label="T??tulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onFormChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="??Qu?? sucedi?? en el d??a de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onFormChange}
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            <ImageGallery images={note.imageUrls} />
        </Grid>
    );
}