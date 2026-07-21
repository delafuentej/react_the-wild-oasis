import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import { Input, FileInput, Form, Button, Textarea, FormRow } from "../../ui";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editeCabin, isEditing } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    isEditSession
      ? editeCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          },
        )
      : createCabin({ ...data, image: image }, { onSuccess: () => reset() });
  }
  function onError(errors) {
    console.log("errors", errors);
  }

  const isWorking = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* <FormRow> 
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        <span>
          {errors?.name?.message && <Error>{errors.name.message}</Error>}
        </span>
      </FormRow>
      */}

      <FormRow
        label="Cabin name"
        error={errors?.name?.message && <Error>{errors.name.message}</Error>}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Maxium Capacity"
        error={
          errors?.maxCapacity?.message && (
            <Error>{errors.maxCapacity.message}</Error>
          )
        }
      >
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,

              message: "Capacity sould be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={
          errors?.regularPrice?.message && (
            <Error>{errors.regularPrice.message}</Error>
          )
        }
      >
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity sould be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={
          errors?.discount?.message && <Error>{errors.discount.message}</Error>
        }
      >
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        disabled={isWorking}
        error={
          errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )
        }
      >
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>

        <Button disabled={isWorking} variation="primary">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
