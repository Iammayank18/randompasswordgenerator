import React, { useEffect, useState } from "react";
import { Checkbox, Button, Slider, Card, Modal, Input } from "antd";
import Lottie from "react-lottie";
import strongPass from "./strong.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
const PasswordGenerator = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: strongPass,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [generatingPass, setGeneratingPass] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGeneratedModal, setShowGeneratedModal] = useState(false);
  const [storePass, setstoredPass] = useState([]);

  const [copyClipboard, setCopyClipboard] = useState({
    text: "",
    copied: false,
  });
  const [clipboardForGenerated, setClipboardForGenerated] = useState({
    text: "",
    copied: false,
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let validChars = "";
    if (includeUppercase) validChars += uppercaseChars;
    if (includeLowercase) validChars += lowercaseChars;
    if (includeNumbers) validChars += numberChars;
    if (includeSpecialChars) validChars += specialChars;

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }

    setGeneratedPassword(password);
    const existingPasswords =
      JSON.parse(localStorage.getItem("generated_pass")) || [];
    existingPasswords.push(password);
    const lastFivePasswords = existingPasswords.slice(-5);
    localStorage.setItem("generated_pass", JSON.stringify(lastFivePasswords));
  };

  const handleGenerate = () => {
    setGeneratingPass(true);
    setTimeout(() => {
      generatePassword();
      setGeneratingPass(false);
      setIsModalOpen(true);
    }, 1500);
  };

  useEffect(() => {
    setstoredPass(JSON.parse(localStorage.getItem("generated_pass")));
  }, [showGeneratedModal]);
  console.log(copyClipboard);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Button type="link" onClick={() => setShowGeneratedModal(true)}>
          🔥 Show generated password
        </Button>
      </div>
      <Card
        title={<h2>Password Generator</h2>}
        bordered={false}
        className="card"
      >
        <p
          style={{
            margin: 0,
          }}
        >
          Password length
        </p>
        <Slider
          defaultValue={10}
          max={30}
          onChange={(e) => setLength(e)}
          railStyle={{
            backgroundColor: "#CBF1F5",
          }}
          trackStyle={{
            backgroundColor: "#3FC1C9",
          }}
          handleStyle={{
            backgroundColor: "#3FC1C9",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            marginBlock: 20,
            gap: 10,
          }}
        >
          <Checkbox onChange={(e) => setIncludeSpecialChars(e.target.checked)}>
            Include Special Characters <b>(!,@,#,$,%,^,&,*)</b>
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeUppercase(e.target.checked)}>
            Include Uppercase Letters <b>(A to Z)</b>
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeLowercase(e.target.checked)}>
            Include Lowercase Letters <b>(a to z)</b>
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeNumbers(e.target.checked)}>
            Include Numbers <b>(0 to 9)</b>
          </Checkbox>
        </div>
        <Button
          type="primary"
          loading={generatingPass}
          onClick={handleGenerate}
          block
          style={{
            backgroundColor: "#3FC1C9",
          }}
          size="large"
        >
          {generatingPass ? "Generating" : "Generate"}
        </Button>
      </Card>

      <Modal
        title="🔥Password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Lottie options={defaultOptions} height={130} width={200} />
          <h2>Strong One!</h2>
        </div>

        <CopyToClipboard
          text={generatedPassword}
          onCopy={(text) => {
            setCopyClipboard({
              text: text,
              copied: true,
            });
            setTimeout(() => {
              setCopyClipboard({
                text: text,
                copied: false,
              });
            }, 700);
          }}
        >
          <button
            className="clipButton"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {copyClipboard.copied ? "copied" : generatedPassword}
            <AiOutlineCopy />
          </button>
        </CopyToClipboard>
      </Modal>

      <Modal
        title="Generated Password"
        open={showGeneratedModal}
        onOk={() => setShowGeneratedModal(false)}
        onCancel={() => setShowGeneratedModal(false)}
        footer
      >
        {storePass ? (
          storePass?.map((item, i) => (
            <p key={i}>
              <CopyToClipboard
                text={item}
                onCopy={(text) => {
                  setClipboardForGenerated({
                    text: text,
                    copied: true,
                  });
                  setTimeout(() => {
                    setClipboardForGenerated({
                      text: text,
                      copied: false,
                    });
                  }, 700);
                }}
              >
                <button
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      clipboardForGenerated.copied &&
                      clipboardForGenerated.text === item
                        ? "#E3FDFD"
                        : "",
                    padding: 6,
                    border: "1px solid #71C9CE",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="clipButton"
                >
                  {clipboardForGenerated.copied &&
                  item === clipboardForGenerated.text
                    ? "copied"
                    : item}
                  <AiOutlineCopy />
                </button>
              </CopyToClipboard>
            </p>
          ))
        ) : (
          <h3>No password found</h3>
        )}
      </Modal>
    </div>
  );
};

export default PasswordGenerator;
