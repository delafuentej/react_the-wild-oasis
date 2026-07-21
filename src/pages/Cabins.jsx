import CabinTableAdditional from "../features/cabins/CabinTableAdditional";
import AddCabin from "../features/cabins/AddCabin";

import { Heading, Row } from "../ui";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
        {/* <img src="https://efcpxsqaprxmncnkqmyc.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg" /> */}
        <p>TEST</p>
      </Row>

      <Row>
        <CabinTableAdditional />
      </Row>
      <AddCabin />
    </>
  );
}

export default Cabins;
