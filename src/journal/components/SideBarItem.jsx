import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';

import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    const onSelectNote = () => {
        dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onSelectNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>

        </ListItem>
    );
}