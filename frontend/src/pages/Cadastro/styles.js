import styled from 'styled-components';

export const Style = styled.div`

  .form-control{
    margin-bottom: 20px;
  }
  
  @media(min-width: 421px){
    .form-control{
      width: 70%;
    }
  }
  
  @media(max-width: 420px){
    .form-control{
      width: 100%;
    }
  }

  .message {
    margin: 10px 0 15px 0;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
  .error-message {
    color: red;
  }
  .success-message {
    color: green;
  }

`;
