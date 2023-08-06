import { AiFillCamera } from "react-icons/ai";
export const ImageUploadButton = ({ onUpload }) => (
  <label
    htmlFor="file"
    className="w-20 h-20 flex items-center justify-center text-[12px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
  >
    <p className="flex flex-col justify-center items-center">
      <AiFillCamera className="text-[24px]" />
      사진 추가
    </p>
    <input
      id="file"
      name="file"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={onUpload}
    />
  </label>
);

export const ImagePreview = ({ src }) => (
  <div className="w-20 h-20 border-2 border-primary p-1 rounded-md overflow-hidden">
    <img src={src} alt="Preview" className="object-contain w-full h-full" />
  </div>
);
