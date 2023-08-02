import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";

const Register = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleFileChange = (e) => {
    if (files.length >= 4) {
      alert("최대 4장의 사진만 업로드 가능합니다.");
      return;
    }
    const newFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Title: ${title}, Content: ${content}`);
    files.forEach((file, index) => {
      console.log(`File ${index + 1}: ${file.name}`);
    });
  };

  return (
    <div className="flex flex-col p-4">
      <form className="space-y-2 flex flex-col flex-1" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-lg">
            제목
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="mt-1 px-2 block w-full text-lg py-[2px] border border-gray-500 rounded-md"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            required
            className="mt-1 px-2 block w-full h-48 text-lg py-[2px] border border-gray-500 rounded-md"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-lg text-gray-700">
            첨부파일
          </label>
          <div className="mt-2 flex space-x-2">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="w-16 h-16 border-2 border-gray-300 rounded-md overflow-hidden"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
            {previews.length < 4 && (
              <label
                htmlFor="file"
                className="w-16 h-16 flex items-center justify-center text-[12px] border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
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
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
        <div className="mt-auto">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            질문 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
