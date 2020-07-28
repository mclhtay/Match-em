import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { Characters, Character } from 'src/store/reducers/user';
import { thumbnails } from 'src/assets/thumbnails';
import { rem } from 'polished';
interface Props {
  characters: Characters;
  onClose: () => void;
  defaultChar: string;
}

const ModalContentWrapper = styled.div`
  height: auto;
  width: 70%;
  color: black;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h1`
  text-transform: capitalize;
  font-size: ${rem('50px')};
`;

const CharactersWrapper = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  margin: ${rem('10px')};
  justify-content: center;
`;

const CharacterWrapper = styled.div<{ selected: boolean }>`
  max-width: ${rem('100px')};
  cursor: pointer;
  border: solid ${props => (props.selected ? '5px gold' : '5px black')};
  border-radius: 5px;
  &:hover {
    ${props => !props.selected && 'border: 5px solid gray;'}
  }
`;
const CharacterC = styled.img`
  display: block;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: auto;
  margin: ${rem('10px')};
`;

const Button = styled.button.attrs({ type: 'button' })<{ disabled?: boolean }>`
  height: ${rem('50px')};
  width: ${rem('200px')};
  background-color: #0047ab;
  color: white;
  margin: ${rem('10px')};
  font-size: ${rem('15px')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${props =>
    props.disabled && `cursor: not-allowed; background-color: #c2e0f9;`}
`;

const keyboardListener = cb => e => {
  if (e.keyCode === 27) cb();
};
export const StorageModal: React.FC<Props> = ({
  characters,
  defaultChar,
  onClose
}: Props) => {
  React.useEffect(() => {
    document.addEventListener('keydown', keyboardListener(onClose));
  }, [onClose]);
  const [selected, setSelected] = React.useState<string>(defaultChar);
  return (
    <Modal>
      <ModalContentWrapper>
        <ModalTitle>your characters</ModalTitle>
        <CharactersWrapper>
          {characters.map((c: Character) => (
            <CharacterWrapper
              key={c.name}
              onClick={() => setSelected(c.key)}
              selected={selected === c.key}
            >
              <CharacterC src={thumbnails[c.key].src} alt={c.name} />
            </CharacterWrapper>
          ))}
        </CharactersWrapper>
        <ButtonsWrapper>

          {// need to dispatch set default character}
          <Button disabled={selected === defaultChar} >Set Default</Button>
          <Button onClick={onClose}>Done</Button>
        </ButtonsWrapper>
      </ModalContentWrapper>
    </Modal>
  );
};
