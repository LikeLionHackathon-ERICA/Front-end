import React, { useState } from "react";
import { InputField, TextAreaField } from "../components/Register/InputSection";
import {
  ImageUploadButton,
  ImagePreview,
} from "../components/Register/ImageSection.jsx";
import { CaptureModal } from "../components/Register/CaptureModal";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
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

  const handleShowContentChange = (e) => setShowContent(e.target.checked);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    setIsSubmitModalOpen(true); // 모달 열기
  };

  const handleModalChoice = (choice) => {
    console.log(`선택된 방식: ${choice}`);
    navigate("/match/1");
    setIsSubmitModalOpen(false); // 모달 닫기
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
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showContent"
            checked={showContent}
            onChange={handleShowContentChange}
          />
          <label htmlFor="showContent" className="ml-2 text-lg">
            내용 입력하기
          </label>
        </div>
        {showContent && (
          <TextAreaField
            label="내용"
            name="content"
            required
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={handleContentChange}
          />
        )}
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
            onClick={handleSubmitClick}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            질문 등록
          </button>
        </div>
      </form>{" "}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-2/3 p-4 rounded-lg flex flex-col justify-center items-center">
            <h3 className="mb-2 text-lg">어떤 방식을 선호하세요?</h3>
            <button
              onClick={() => handleModalChoice("전화로 도움받기")}
              className="bg-sky text-white p-2 rounded-md w-full mb-2"
            >
              전화로 도움받기
            </button>
            <button
              onClick={() => handleModalChoice("만나서 도움받기")}
              className="bg-primary text-white p-2 rounded-md w-full"
            >
              만나서 도움받기
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
