import styled from 'styled-components';

const TextWrapper = styled.div`
  font-size: ${({isBetter, isComparison}) => {
    if (isComparison) {
      return '1.5rem';
    }

    return isBetter ? '3rem' : '2rem';
  }};
  font-weight: bold;
  font-style: ${({isComparison}) => (isComparison ? 'italic' : 'default')};
  line-height: 3rem;
  color: ${({isBetter}) => (isBetter == null ? 'grey' : isBetter === true ? '#238823' : '#D2222D')};
  display: grid;
  align-self: center;
`;

const Text = (props) => {
  const {value, isBetter, isComparison} = props;

  return (
    <TextWrapper isBetter={isBetter} isComparison={isComparison}>
      {value !== null ? value : '-'}
    </TextWrapper>
  );
};

export {Text};
