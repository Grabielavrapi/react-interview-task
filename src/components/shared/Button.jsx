import { FaCheck, FaTimes, FaPlus, FaArrowLeft } from 'react-icons/fa';

const Button = ({ text, color, icon, onClick, disabled }) => {
    const colors = {
        red: '#e74c3c',
        green: '#7cb342',
        blue: '#3b5998'
    };

    const hoverColors = {
        red: '#c0392b',
        green: '#689f38',
        blue: '#2d4373'
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
                fontSize: '16px',
                fontWeight: '500',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                minWidth: '160px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => !disabled && (e.currentTarget.style.backgroundColor = hoverColors[color])}
            onMouseOut={(e) => !disabled && (e.currentTarget.style.backgroundColor = colors[color])}
        >
            <span>{text}</span>
            {icon === 'check' && <FaCheck size={18} />}
            {icon === 'cancel' && <FaTimes size={18} />}
            {icon === 'plus' && <FaPlus size={18} />}
            {icon === 'back' && <FaArrowLeft size={18} />}
        </button>
    );
};

export default Button;