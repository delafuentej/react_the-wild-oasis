import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useEditSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully edited");
      queryClient.invalidateQueries({ queryKey: "settings" });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSettings, isSetting };
}

export { useEditSettings };
