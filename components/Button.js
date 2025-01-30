
export default function Button({ onClick, disabled, type, style, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="button"
            style={{
                ...style
            }}
        >
            {children}
        </button>
    )
}
  
  