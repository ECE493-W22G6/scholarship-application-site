import PropTypes from 'prop-types';

const Button = ({ className, text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    className: 'btn',
}


Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
}

export default Button;