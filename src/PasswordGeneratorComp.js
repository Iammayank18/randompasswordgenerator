import React, { useEffect, useState } from "react";
import { Checkbox, Button, Slider, Card, Modal, Input } from "antd";
import Lottie from "react-lottie";
import strongPass from "./strong.json";
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
  const [copied, setCopied] = useState(false);
  const [showGeneratedModal, setShowGeneratedModal] = useState(false);
  const [storePass, setstoredPass] = useState([]);
  const [copiedStore, setCopiedStore] = useState(false);
  const [copiedStoreData, setCopiedStoreData] = useState("");

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
  return (
    <>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Password Generator</h2>
            <Button type="link" onClick={() => setShowGeneratedModal(true)}>
              Show generated
            </Button>
          </div>
        }
        bordered={false}
        style={{
          width: 500,
        }}
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
          }}
        >
          <Checkbox onChange={(e) => setIncludeSpecialChars(e.target.checked)}>
            Include Special Characters
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeUppercase(e.target.checked)}>
            Include Uppercase Letters
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeLowercase(e.target.checked)}>
            Include Lowercase Letters
          </Checkbox>
          <Checkbox onChange={(e) => setIncludeNumbers(e.target.checked)}>
            Include Numbers
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
        footer={[
          <Button
            onClick={() => {
              navigator.clipboard.writeText(generatedPassword);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? "copied" : "copy"}
          </Button>,
        ]}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Lottie options={defaultOptions} height={130} width={200} />
          <h2>Strong One!</h2>
        </div>

        <Input
          placeholder="Basic usage"
          size="large"
          value={generatedPassword}
        />
      </Modal>

      <Modal
        title="Generated Password"
        open={showGeneratedModal}
        onOk={() => setShowGeneratedModal(false)}
        onCancel={() => setShowGeneratedModal(false)}
        footer
      >
        {storePass.map((item, i) => (
          <p
            key={i}
            onClick={(e) => {
              setCopiedStore(true);
              navigator.clipboard.writeText(e.target.innerText);
              setCopiedStoreData(e.target.innerText);
              setTimeout(() => {
                setCopiedStore(false);
              }, 500);
            }}
            style={{
              cursor: "pointer",
              backgroundColor:
                copiedStore && copiedStoreData === item ? "#A6E3E9" : "",
              padding: 5,
              border: "1px solid #71C9CE",
              borderRadius: 5,
            }}
          >
            {item}
          </p>
        ))}
      </Modal>
    </>
  );
};

export default PasswordGenerator;
