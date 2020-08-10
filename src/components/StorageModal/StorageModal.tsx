import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import {
  Characters,
  Character,
  UserRecord,
  updateUserAction
} from 'src/store/reducers/user';
import { thumbnails } from 'src/assets/thumbnails';
import { rem } from 'polished';
import { useDispatch } from 'react-redux';
import { useSize } from 'src/hooks/useSize';

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
  text-align: center;
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

const Button = styled.button.attrs({ type: 'button' })<{
  disabled?: boolean;
  size: number;
}>`
  height: ${rem('50px')};
  width: ${({ size }) => rem(`${size}px`)};
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
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  const { width } = useSize(ref);
  React.useEffect(() => {
    document.addEventListener('keydown', keyboardListener(onClose));
  }, [onClose]);
  const [selected, setSelected] = React.useState<string>(defaultChar);

  const handleSetDefault = () => {
    const defaultCharacter: Character = {
      key: selected,
      name: thumbnails[selected].name
    };
    const userRecord: UserRecord = { defaultCharacter };
    dispatch(updateUserAction(userRecord));
  };

  return (
    <Modal>
      <ModalContentWrapper ref={ref}>
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
          <Button
            size={width * 0.3}
            disabled={selected === defaultChar}
            onClick={handleSetDefault}
          >
            Set Default
          </Button>
          <Button onClick={onClose} size={width * 0.3}>
            Done
          </Button>
        </ButtonsWrapper>
      </ModalContentWrapper>
    </Modal>
  );
};
