import React from "react";
import styled from "styled-components";

const OptionsContainer = styled.div`
  margin: 20px;
`;

const ConvertButton = styled.button`
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  &:hover {
    background-color: #007bb5;
  }
`;

const ConvertOptions = () => {
  const handleConvert = () => {
    alert("변환을 시작합니다!");
  };

  return (
    <OptionsContainer>
      <h2>변환 옵션</h2>
      {/* 변환 옵션 추가 가능 */}
      <ConvertButton onClick={handleConvert}>변환 시작</ConvertButton>
    </OptionsContainer>
  );
};

export default ConvertOptions;
