import css from './header.module.css';

interface Props extends React.OlHTMLAttributes<HTMLOListElement> {
  children: JSX.Element | JSX.Element[];
  addClass?: string;
}

export const MenuList: React.FC<Props> = ({ addClass, children, ...props }) => {
  return (
    <ul role="list" className={`${css['menu-list']} ${addClass ?? ''}`} {...props}>
      {children}
    </ul>
  );
};
