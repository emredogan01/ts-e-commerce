import { urlValues } from "./urlValues";
import { useRouter } from "next/navigation";

export const updateSearchParams = (
  router: ReturnType<typeof useRouter>,
  params: Record<string, string | null>
) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }
  });
  router.replace(`?${newSearchParams.toString()}`);
};

export const getSelectedOption = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const sortBy = urlSearchParams.get("sortBy");
  const order = urlSearchParams.get("order");

  if (sortBy && order) {
    const selectedValue = Object.keys(urlValues).find(
      (key) =>
        urlValues[key as keyof typeof urlValues].sortBy === sortBy &&
        urlValues[key as keyof typeof urlValues].order === order
    );
    return selectedValue || "";
  }
  return "";
};
