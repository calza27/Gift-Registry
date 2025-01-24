
export default function Button({ onClick, disabled, type, style, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={{
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "5px",
                border: "1px solid #D2D2D2",
                color: "#C74152",
                cursor: "pointer",
                padding: "8px 20px",
                boxShadow: "0 2px 4px #D2D2D2",
                margin: "10px 0px 0px 10px",
                ...style
            }}
        >
            {children}
        </button>
    )
}
  
  