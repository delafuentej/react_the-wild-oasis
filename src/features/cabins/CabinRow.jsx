import styled from "styled-components";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { CompoundModal, ConfirmDelete, Table, Menus } from "../../ui";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinFormUpdate";

// const TableRow = styled.div`
/* display: grid; */
/* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
/* column-gap: 2.4rem; */
/* align-items: center; */
/* padding: 1.4rem 2.4rem; */
/*  */
/* &:not(:last-child) { */
/* border-bottom: 1px solid var(--color-grey-100); */
/* } */
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
    id: currentId,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      description,
      image,
    });
  }

  // console.log("mutation", mutation);

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          {/* <button onClick={handleDuplicate} disabled={isDeleting || isCreating}> */}
          {/* <HiSquare2Stack /> */}
          {/* </button> */}
          <CompoundModal>
            <Menus>
              <Menus.Menu>
                <Menus.Toggle id={currentId} />
                <Menus.List id={currentId}>
                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={handleDuplicate}
                  >
                    Duplicate
                  </Menus.Button>

                  <CompoundModal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />} onClick={cabin}>
                      Edit
                    </Menus.Button>
                    {/* <button disabled={isDeleting}> */}
                    {/* <HiPencil /> */}
                    {/* </button> */}
                  </CompoundModal.Open>

                  <CompoundModal.Open opens="delete">
                    {/* <button> */}
                    {/* <HiTrash /> */}
                    {/* </button> */}

                    <Menus.Button
                      icon={<HiTrash />}
                      onClick={() => deleteCabin(currentId)}
                    >
                      Delete
                    </Menus.Button>
                  </CompoundModal.Open>
                </Menus.List>
              </Menus.Menu>
            </Menus>

            <CompoundModal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </CompoundModal.Window>

            <CompoundModal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(currentId)}
              />
            </CompoundModal.Window>
          </CompoundModal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
