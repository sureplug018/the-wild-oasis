import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal((currentState) => !currentState)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal((currentState) => !currentState)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
