import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {AppTheme} from './theme';
import {AppRouter} from './router/AppRouter';
import {store} from "./store";

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppTheme>
                    <AppRouter/>
                </AppTheme>
            </BrowserRouter>
        </Provider>
    );
}