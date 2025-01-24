export default function TextArea({
  name,
  onChange,
  onBlur,
  onKeyPress,
  placeholder,
  value
}) {
  return (
    <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        onKeyPress={onKeyPress}
        style={{
          width: "100%",
          borderColor: "#d2d2d2",
          borderWidth: "1px",
          borderRadius: "0.25rem",
          padding: "0.5rem 0.75rem",
          backgroundColor: "white",
          lineHeight: "1.5",
          resize: "vertical",
          maxHeight: "500px",
        }}
    />
  )
}