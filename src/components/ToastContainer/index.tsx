import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../contextOrHooks/toast';

import { Container } from './styles';
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagensWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  return (
    <Container>
      {messagensWithTransitions.map(({ item, key, props }) => {
        return <Toast key={key} style={props} toast={item} />;
      })}
    </Container>
  );
};

export default ToastContainer;
