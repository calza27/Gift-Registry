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
    <div className="searchContainer">
      <InputField
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <a onClick={searchAction} className="searchIcon">
        <Image src={"/lens.svg"} alt="Search" className="icon" width={20} height={20} />
      </a>
    </div>
  )
}