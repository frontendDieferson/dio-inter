import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        font-family: 'Roboto', sans-serif;  
        font-size: 16px;
        margin: 0;
        padding: 0;
    }

    body{
        background-color: ${({ theme }) => theme.colors.background};
    }
    
    input:focus, textarea:focus, select:focus{
        outline: none;
    }
  
    a{
        text-decoration: none;
        color: ${({ theme }) => theme.colors.primary};
        &:hover {
            filter: opacity(0.8)
        }
    }
    
    h2{
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 28px;
        color: #000000;
    }
    
    .primary-color{
        color: ${({ theme }) => theme.colors.primary};
    }
    
    .wallet{
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primary};
        font-size: 2.5rem; //40px
        line-height: 47px;
    }
`;

export default GlobalStyle;