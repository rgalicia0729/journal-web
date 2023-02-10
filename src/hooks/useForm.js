import {useState} from 'react';

export const useForm = (initialValue) => {
    const [formState, setFormState] = useState(initialValue);

    const onFormChange = ({target}) => {
        const {name, value} = target;

        setFormState({
           ...formState,
           [name]: value,
        });
    }

    const onResetForm = () => {
        setFormState(initialValue);
    }

    return {
        ...formState,
        onFormChange,
        onResetForm
    }
}