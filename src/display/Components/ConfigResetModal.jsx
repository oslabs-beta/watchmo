/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfigResetModal = props => {
  const { buttonLabel, className, handleReset } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const resetReload = () => {
    handleReset();
    toggle();
  };

  const center = true;

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        centered={center}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Confirm Reset</ModalHeader>
        <ModalBody>
          Form data will revert to your last saved configuration. Are you sure
          you want to do this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={resetReload}>
            Reset Form
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel Reset
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfigResetModal;
