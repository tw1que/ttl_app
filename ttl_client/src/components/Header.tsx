import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    justify-content: space-around;
    align-items: center;
    background-color: #d49d42;
    color: #c15050;
    border-radius: 7px;
    margin-top: 7px;
    box-shadow: 2px 2px 0.5px 0.5px rgba(0, 0, 0, 1);
`;

const Header: React.FC = () => (
  <StyledHeader>
    <h2>Invoeren</h2>
    <h2>Opzoeken</h2>
  </StyledHeader>
);

export default Header;
