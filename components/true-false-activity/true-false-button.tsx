import { cloneElement } from "react";

import { useTrueFalseActivityContext } from "./true-false-activity-context";

interface Props {
    type?: 'reset';
    children: React.ReactElement;
}

export const TrueFalseButton: React.FC<Props> = ({ type, children }) =>  {
    const { handleValidation, handleReset, button, validation, result, selectedAnswer} = useTrueFalseActivityContext();

    return cloneElement(children, {
        ...children.props,
        disabled: type !== 'reset' ? button : validation ? result : true,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            if (children.props.onClick) {
                children.props.onClick(event);
            }
            type === 'reset' ? handleReset() : handleValidation(selectedAnswer);
        }
    })
}
