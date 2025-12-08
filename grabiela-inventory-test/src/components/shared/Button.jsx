import { FaCheck, FaTimes } from 'react-icons/fa';

const Button = ({ text, color, icon, onClick, disabled }) => {
    const colors = {
        red: '#e53935',
        green: '#43a047',
        blue: '#1e88e5'
    };

    const hoverColors = {
        red: '#c62828',
        green: '#388e3c',
        blue: '#1565c0'
    };

    return (
        <button
            className={`button ${color}`}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor: colors[color],
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
            }}
            onMouseOver={(e) => !disabled && (e.currentTarget.style.backgroundColor = hoverColors[color])}
            onMouseOut={(e) => !disabled && (e.currentTarget.style.backgroundColor = colors[color])}
        >
            <span>{text}</span>
            {icon === 'check' && <FaCheck />}
            {icon === 'cancel' && <FaTimes />}
        </button>
    );
};

export default Button;