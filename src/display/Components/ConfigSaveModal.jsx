/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import FileSavedAlert from './FileSavedAlert';

const ConfigSaveModal = props => {
  const { buttonLabel, className, handleSubmit } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitToggle = () => {
    handleSubmit();
    toggle();
    // fileSaved();
  };

  const center = true;

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        centered={center}
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Confirm Current Configuration</ModalHeader>
        <ModalBody>
          Saving will overwrite your existing configuration. Are you sure you
          want to do this?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitToggle}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfigSaveModal;
