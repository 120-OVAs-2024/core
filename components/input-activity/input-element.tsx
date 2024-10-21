import { useEffect, useId, useState } from 'react';

import { useInputActivityContext } from './input-activity-context';


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  correctAnswers: string[];
  name: string;
  addClass? : string
}

export const InputElement: React.FC<Props> = ({ id, correctAnswers, name, addClass, }) => {
    const { addInputValues, addInputElementsId, validation } = useInputActivityContext();
    const reactId = useId();

    const uid = id || reactId;

    const [userAnswer, setUserAnswer] = useState<string>('');

    // Registrar el uid en el contexto al montar el componente
    useEffect(() => {
        addInputElementsId(uid);
    }, [uid, addInputElementsId]);

    
    // Function to handle input changes and compare to correct answers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        setUserAnswer(inputValue);

        // Registrar la respuesta en el contexto sin validar aún
        addInputValues({
            id: uid,
            correctAnswer: correctAnswers,
            name,
            userAnswer: inputValue, // Aquí se almacena la respuesta del usuario
        });
    };

    // Escucha el evento de reinicio para limpiar el input
    useEffect(() => {
        if (!validation) {
            setUserAnswer(''); // Limpia el input cuando se hace reset
        }
    }, [validation]);

    return (
        <input 
            id={uid}
            type="text"
            name={name}
            value={userAnswer}
            onChange={handleInputChange}
            className={`${addClass}`}
            disabled={validation}
        />
    );
};
