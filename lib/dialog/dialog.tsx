import React, {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Icon } from '../index';
import './dialog.scss';
import { createPortal } from 'react-dom';
import { scopedClassMaker } from '../helper/classes';

interface Props {
  visible: boolean;
  buttons?: ReactElement[];
  onClose: MouseEventHandler;
  closeOnClickMask?: boolean;
}

const scopedClass = scopedClassMaker('aui-dialog');
const sc = scopedClass;

const Dialog: React.FC<Props> = (props) => {
  const onClickClose: MouseEventHandler = (e) => {
    props.onClose(e);
  };

  const onClickMask: MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };

  const content = props.visible && (
    <>
      <div className={sc('mask')} onClick={onClickMask}></div>
      <div className={sc()}>
        <div className={sc('close')} onClick={onClickClose}>
          <Icon name="close" />
        </div>
        <header className={sc('header')}>提示</header>
        <main className={sc('main')}>{props.children}</main>
        {props.buttons && props.buttons.length > 0 && (
          <footer className={sc('footer')}>
            {props.buttons &&
              props.buttons.map((button, index) =>
                React.cloneElement(button, {
                  key: index,
                })
              )}
          </footer>
        )}
      </div>
    </>
  );

  return createPortal(content, document.body);
};

Dialog.defaultProps = {
  closeOnClickMask: false,
};

const modal = (
  content: ReactNode,
  buttons?: ReactElement[],
  afterClose?: () => void
) => {
  const onClose = () => {
    render(cloneElement(component, { visible: false }), div);
    unmountComponentAtNode(div);
    div.remove();
  };
  const component = (
    <Dialog
      visible={true}
      onClose={() => {
        onClose();
        afterClose && afterClose();
      }}
      buttons={buttons}
    >
      {content}
    </Dialog>
  );
  const div = document.createElement('div');
  document.body.append(div);
  render(component, div);
  return onClose;
};

const alert = (content: string) => {
  const close = modal(content, [<button onClick={() => close()}>OK</button>]);
};

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    yes && yes();
    close();
  };
  const onNo = () => {
    no && no();
    close();
  };

  const close = modal(
    content,
    [<button onClick={onYes}>yes</button>, <button onClick={onNo}>no</button>],
    no
  );
};

export { alert, confirm, modal };

export default Dialog;
