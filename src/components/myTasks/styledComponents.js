import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 1rem;

  background-color: ${props =>
    props.isActive === 'true' ? '#f3aa4e' : '#ffffff'};
`

export const List = styled.li`
  list-style-type: none;
  display: flex;
`
