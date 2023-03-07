import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCgduaykbY6KRE4Yy6lcWSOEtTmTUGQCkA",
    authDomain: "journal-bb25b.firebaseapp.com",
    projectId: "journal-bb25b",
    storageBucket: "journal-bb25b.appspot.com",
    messagingSenderId: "367655025420",
    appId: "1:367655025420:web:1cc74edf4ec687144b2729"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);