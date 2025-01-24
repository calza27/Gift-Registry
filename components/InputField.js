export default function InputField({
  type,
  name,
  onChange,
  onBlur,
  onKeyPress,
  placeholder,
  value
}) {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
      onKeyPress={onKeyPress}
        style={{
          width: "100%",
          borderColor: "#d2d2d2",
          borderWidth: "1px",
          borderRadius: "0.25rem",
          padding: "0.5rem 0.75rem",
          backgroundColor: "white",
          lineHeight: "1.5"
        }}
    />
  )
}