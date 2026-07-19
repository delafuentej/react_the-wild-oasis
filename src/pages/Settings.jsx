import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { Row, Heading } from "../ui";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
