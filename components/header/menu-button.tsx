import css from './header.module.css';

interface Props  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | JSX.Element[];
  addClass?: string;
}

export const MenuButton: React.FC<Props> = ({ children, addClass, ...props }) => {
  return (
    <button className={`${css['menu__button']} ${addClass ?? ''}`} data-type="menu-button" {...props}>
      {children}
    </button>
  );
};
