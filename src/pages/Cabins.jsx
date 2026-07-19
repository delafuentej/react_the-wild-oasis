import { useState } from "react";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { Heading, Row, Button } from "../ui";
import { set } from "date-fns";

function Cabins() {
  // useEffect(() => {
  // getCabins().then((data) => console.log(data));
  // });
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
        {/* <img src="https://efcpxsqaprxmncnkqmyc.supabase.co/storage/v1/object/public/cabin-images/cabin-006.jpg" /> */}
        <p>TEST</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
