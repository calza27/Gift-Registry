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
      className="inputField"
    />
  )
}