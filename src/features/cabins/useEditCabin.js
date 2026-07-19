import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editeCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin was successfully edited");
      queryClient.invalidateQueries({ queryKey: "cabins" });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { editeCabin, isEditing };
}

export { useEditCabin };
