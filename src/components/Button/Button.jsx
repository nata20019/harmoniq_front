// import css from './Button.module.css';

// export default function Button({
//   children,
//   type = 'button',
//   variant = 'primary',
// }) {
//   return (
//     <button type={type} className={`${css.btn} ${css[variant]}`}>
//       {children}
//     </button>
//   );
// }
import { useNavigate } from 'react-router-dom';
import css from './Button.module.css';

const Button = ({ children, className, to, onClick, ...props }) => {
  const navigate = useNavigate();

  const handleClick = e => {
    if (to) {
      navigate(to); // Якщо є проп "to", переходимо за посиланням
    } else if (onClick) {
      onClick(e); // Якщо є "onClick", виконуємо функцію
    }
  };

  return (
    <button
      className={`${css.button} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
