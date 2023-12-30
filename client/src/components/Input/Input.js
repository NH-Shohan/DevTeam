function Input({ type, id, name, placeholder, onChange, onClick }) {
  return (
    <input
      type={type ? type : 'text'}
      id={id}
      name={name}
      placeholder={placeholder ? placeholder : 'Enter'}
      required
      className="w-full px-4 py-3 rounded-lg mb-4 outline-none border border-gray-light bg-primary focus:border-blue"
      onChange={onChange}
      onClick={onClick}
    />
  );
}

export default Input;
