import Image from 'next/image';
import InputField from './InputField';

export default function SearchField({
  type,
  name,
  onChange,
  onBlur,
  placeholder,
  value,
  searchAction
}) {
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      searchAction();
    }
  }

  return (
    <div style={{
      position: "relative",
      width: "300px",
      margin: "0 auto"
    }}>
      <InputField
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <a
        onClick={searchAction}
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "0",
          top: "0",
          width: "1.5rem",
          marginRight: "0.75rem",
          marginTop: "0.5rem"
        }}
      >
        <Image src={"/lens.svg"} alt="Search" width={20} height={20} />
      </a>
    </div>
  )
}