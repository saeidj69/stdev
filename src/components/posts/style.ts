import styled from "styled-components";

export const StyledContainer = styled.div`
  

  p,
  span > card {
    color: #444444;
    font-size: 16px;
    line-height: 0.5;
  }
  span {
    font-weight: 400;
  }
  p {
    font-weight: 700;
  }
  .card {
    display: flex;
    flex-grow: 1 3 1;

    width: 599px;
    height: 207px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .image {
    border-radius: 15px;
    width:200px;
    height:207px;
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
    margin-top: 35px;
    cursor:pointer;
  }

  .
`;
