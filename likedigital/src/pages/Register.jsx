import React, { useState } from "react";

import { InputField, TextAreaField } from "../components/Register/InputSection";
import {
  ImageUploadButton,
  ImagePreview,
} from "../components/Register/ImageSection.jsx";
import { CaptureModal } from "../components/Register/CaptureModal";
const Register = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="flex flex-col p-4">
      <div className="mb-4 text-start">
        <h2 className="text-primary text-2xl">문제 등록</h2>
        <span className="text-lg">곤란을 겪고 계신 문제를 설명해주세요</span>
      </div>
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
          <div className="flex gap-4 justify-between items-center">
            <label htmlFor="file" className="block text-lg text-gray-700">
              첨부파일
            </label>
            <button
              onClick={handleOpenModal}
              className="bg-sky text-white px-2 rounded-md text-md"
            >
              화면 사진(스크린샷)을 찍는 방법
            </button>
          </div>
          {isModalOpen && <CaptureModal onClose={handleCloseModal} />}
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
    </section>
  );
};

export default Register;
