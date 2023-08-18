export const InputField = ({ label, value, onChange, ...props }) => (
  <div className="flex flex-col items-center">
    <label
      htmlFor={props.name}
      className="w-full text-primary text-2xl text-center mb-2 "
    >
      {label}
    </label>
    <textarea
      className="mt-1 focus:border-primary px-2 block w-full text-xl py-4 border border-gray-500 rounded-md flex-wrap"
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

export const TextAreaField = ({ label, value, onChange, ...props }) => (
  <div>
    <label htmlFor={props.name} className="block text-lg">
      {label}
    </label>
    <textarea
      className="mt-1 focus:border-primary px-2 block w-full h-48 text-lg py-[2px] border border-gray-500 rounded-md"
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);
