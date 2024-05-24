import { useState } from 'react'


export const useBackground = (): [string, (image: string) => void] => {
    const [background, setBackground] = useState<string | null>(null)

    const handleChangeBackground = (image:string) => {
        if (!image) return;

        setBackground(() => {
            const parentElement = document.body as HTMLElement;
            parentElement?.style.setProperty('--bg-image', `url(${image})`);
            return image    
        })
    }

    return [background, handleChangeBackground]
}