import React, { useState } from "react";

import { InputField, TextAreaField } from "../components/Register/InputSection";
import {
  ImageUploadButton,
  ImagePreview,
} from "../components/Register/ImageSection.jsx";
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
        <InputField
          label="제목"
          name="title"
          type="text"
          required
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <TextAreaField
          label="내용"
          name="content"
          required
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        />
        <div>
          <label htmlFor="file" className="block text-lg text-gray-700">
            첨부파일
          </label>
          <div className="mt-2 flex space-x-2">
            {previews.map((preview, index) => (
              <ImagePreview key={index} src={preview} />
            ))}
            {previews.length < 4 && (
              <ImageUploadButton onUpload={handleFileChange} />
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
