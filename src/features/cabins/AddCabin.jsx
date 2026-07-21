import { Button, CompoundModal } from "../../ui";

import CreateCabinFormUpdate from "./CreateCabinFormUpdate";

const AddCabin = () => {
  return (
    <div>
      <CompoundModal>
        <CompoundModal.Open opens="cabin-form">
          <Button variation="primary">Add new cabin</Button>
        </CompoundModal.Open>
        <CompoundModal.Window name="cabin-form">
          <CreateCabinFormUpdate />
        </CompoundModal.Window>

        {/* <CompoundModal.Open opens="table">
        <Button variation="primary">Show table</Button>
      </CompoundModal.Open>
      <CompoundModal.Window name="table">
        <CabinTable />
      </CompoundModal.Window> */}
      </CompoundModal>
    </div>
  );
};

/*const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpenModal((show) => !show)}
        variation="primary"
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinFormUpdate onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};*/

export default AddCabin;
