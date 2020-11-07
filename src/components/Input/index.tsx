import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...remainOfProps
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);
  /** useCallback() | LEI!!! Sempre que for criar um função dentro de um componente!
   * O hook useCallback() é uma forma de criar funções dentro de um componente
   * sem que estas  sejam recriadas na memória toda vez que o componente é atualizado!
   *
   * Estas, ficam salvas na memoria e se necessário, nós dizemos para
   * a função ser recriada!
   */

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  // useCallback() | LEI!!! Sempre que for criar um função dentro de um componente!

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, // elemento html da DOM
      path: 'value', // propriedade do elemento html da DOM
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={26} />}
      <input
        onFocus={
          // Quando o input recebeu focus
          handleInputFocus
        }
        onBlur={
          // Quando o input perdeu focus
          handleIputBlur
        }
        defaultValue={defaultValue}
        ref={inputRef}
        {...remainOfProps}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
