import { useEffect, useId } from "react"
import css from "./particula.module.css"
import { easeInOut, motion } from "framer-motion"
import { Radio } from 'books-ui';
import type { RadioStates } from './types/types';
import { useRadioActivityContext } from './radio-activity-context';


const STATES: Partial<Record<RadioStates, 'wrong' | 'right'>> = {
    wrong: 'wrong',
    success: 'right'
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    addClass?: string;
    label: string;
    state: RadioStates;
    color: string
    AnimationInitial: number,
    AnimationEnd: number
}

export const Particule: React.FC<Props> = ({ color, AnimationInitial, AnimationEnd, id, addClass, state, label, name, ...props }) => {
    const reactId = useId();
    const { addRadiosValues, addRadioElementsId, validation } = useRadioActivityContext();

    const uid = id || reactId;
    const radioName = `radio-group-name-${name}`;

    /**
     * Maneja el evento onChange.
     */
    const handleChange = () => {
        addRadiosValues({ id: uid, name: radioName, state });
    };

    useEffect(() => {
        addRadioElementsId(uid);
    }, [uid, addRadioElementsId]);
    return (
        <motion.div
            initial={{
                transform: `translateY(${AnimationInitial}px)`
            }}
            animate={{
                transform: ` translateY(${AnimationEnd}px)`
            }}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3,
                ease: easeInOut
            }}
            className={css.containerPlaneAndOption}>
            <div className={`${css.plane} ${css.main}`} >
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
                <div style={{ '--backgroundParticule': color } as React.CSSProperties} className={css.circle} />
            </div>
            <div className={css.option}>
                <Radio
                    id={uid}
                    label={label}
                    addClass={`${css['radio']} ${addClass ?? ''}`}
                    onChange={handleChange}
                    disabled={validation}
                    name={radioName}
                    {...(validation && { state: STATES[state] })}
                    {...props}
                /></div>
        </motion.div>
    )
}
