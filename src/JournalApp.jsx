import {BrowserRouter} from 'react-router-dom';

import {AppTheme} from './theme';
import {AppRouter} from './router/AppRouter';

export const JournalApp = () => {
    return(
        <BrowserRouter>
            <AppTheme>
                <AppRouter/>
            </AppTheme>
        </BrowserRouter>
    );
}