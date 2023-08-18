import { useState } from "react";
import { InputField } from "../components/Register/InputSection";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../components/UI/HeaderTitle";
import { BiMicrophone } from "react-icons/bi";

const Register = () => {
  const [title, setTitle] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isMicModalOpen, setIsMicModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register/map", { state: { title: title } });
  };
  const handleMicClick = (e) => {
    e.preventDefault();
    setIsMicModalOpen(true);
  };
  const handleMicModalClose = () => {
    setIsMicModalOpen(false);
  };
  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
    };
    recognition.start();
  };
  const handleConfirmClick = () => {
    setTitle(transcription);
    handleMicModalClose();
  };

  return (
    <section className="flex flex-col">
      <HeaderTitle />
      <div className="px-8 p-4">
        <div className="mb-4 text-start">
          <h2 className="text-primary text-xl">문제 등록</h2>
          <span className="text-lg">곤란을 겪고 계신 문제를 설명해주세요</span>
        </div>
        <div className="w-full h-[2px] bg-gray-500 my-4 " />
        <form
          className="space-y-2 flex flex-col flex-1 gap-2"
          onSubmit={handleSubmit}
        >
          <InputField
            label="제목"
            name="title"
            type="text"
            required
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={handleTitleChange}
          />
          <button
            className="text-xl rounded-md py-2 bg-black text-white"
            onClick={handleMicClick}
          >
            말로 작성하기
          </button>
          <button
            onClick={handleSubmit}
            className="text-xl p-3 rounded-full text-white bg-primary"
          >
            요청 등록하기
          </button>
        </form>
      </div>
      {isMicModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50"
          onClick={handleMicModalClose}
        >
          <div
            className="bg-white p-4 rounded-lg w-[80%] h-fit mx-auto flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="mt-2 text-lg ">
              아래 마이크를 터치 후 말씀해주세요
            </h1>
            <button>
              <BiMicrophone
                onClick={startVoiceRecognition}
                className="bg-primary rounded-full w-24 h-24 p-2 text-white text-center"
                size={36}
              />
            </button>
            <div className="text-lg py-2 px-3">{transcription}</div>
            <button
              onClick={handleConfirmClick}
              className="mt-4 rounded-full bg-primary text-white px-3 py-2"
            >
              해당 내용이 맞다면 저를 눌러주세요
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
