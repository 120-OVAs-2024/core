

export interface useModalType {
    ref: React.RefObject<HTMLDivElement>
    isOpen: boolean;
    onClose: () => void;
}