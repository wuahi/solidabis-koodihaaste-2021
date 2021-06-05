import styled from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTachometerAlt, faRoad} from '@fortawesome/free-solid-svg-icons';

const InputWrapper = styled.div`
  align-items: center;
  border: 1px solid #c6dcf3;
  border-radius: 0.5rem;
  color: #6daffe;
  display: grid;
  font-size: 1.5rem;
  grid-template-columns: 2rem auto 4rem;
  grid-gap: 1rem;
  padding: 0.5rem 0.25rem;
  box-sizing: border-box !important;
  width: 100%;

  > svg {
    justify-self: center;
  }

  > .input {
    border: none;
    color: inherit;
    font-size: inherit;
    outline: none !important;
    width: 100% !important;
    display: inline-block;
  }
`;

const TextInput = (props) => {
  const {name, id, placeholder, gridSpan, description, icon, value, setValue} = props;

  return (
    <InputWrapper gridSpan={gridSpan}>
      <FontAwesomeIcon icon={icon === 'speed' ? faTachometerAlt : faRoad}></FontAwesomeIcon>

      <input
        className="input"
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(i) => setValue(i.target.value)}
      ></input>
      <div className="description">{description}</div>
    </InputWrapper>
  );
};

export {TextInput};
