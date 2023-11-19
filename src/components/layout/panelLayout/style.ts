import styled from "styled-components";

export const StyledContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: auto;
  min-height:100dvh;


  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    
  }

  .right-header{
    display:flex
  }

  .isShow{
   display:block
  }

  .drawer{
    display:none
  }

  .logout{
    margin:0 10px;
    cursor:pointer;
    
  }

  .logout:hover{
    color:#28A4DA
  }

  @media(max-width:920px){
    .isShow{
      display:none
     }
     .drawer{
      display:block
    }
  
  }
`;
