import styled from "styled-components";

export const MainLoginModalDiv = styled.div`
  .title {
    h2 {
      text-align: center;
      font-size: 30px;
      font-weight: 600;
    }
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      a {
        text-decoration: none;
      }
    }
  }
  .social {
    padding: 8px 0;
    .social-buttons {
      width: 100%;
    }
    .social-button {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .google {
      .icon {
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
      }
    }

    .facebook {
      .icon {
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        fill: #0866ff;
        color: #0866ff;
      }
    }
  }

  .message {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .form {
    .ant-form-item {
      margin: 0;
      margin-top: 4px;
      .ant-form-item-label {
        padding-bottom: 2px;
      }
    }

    .submit-button-item-register {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .terms {
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export const MainAuthDiv = styled.div`
  .main-wrapper {
    width: 30%;
    margin-left: 35%;
  }

  .title {
    h2 {
      text-align: center;
      font-size: 30px;
      font-weight: 600;
    }
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      a {
        text-decoration: none;
      }
    }
  }
  .social {
    padding: 8px 0;
    .social-buttons {
      width: 100%;
    }
    .social-button {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .google {
      .icon {
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
      }
    }

    .facebook {
      .icon {
        margin-left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        fill: #0866ff;
        color: #0866ff;
      }
    }
  }

  .message {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .form {
    .ant-form-item {
      margin: 0;
      margin-top: 4px;
      .ant-form-item-label {
        padding-bottom: 2px;
      }
    }

    .submit-button-item-register {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .terms {
    h6 {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export const SpinDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 5rem;

  .ant-spin {
    .ant-spin-dot {
      font-size: 1rem;
      width: 30px;
      height: 30px;
      .ant-spin-dot-item {
        width: 12px;
        height: 12px;
        background-color: #000 !important;
      }
    }
  }
`;
