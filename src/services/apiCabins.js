import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    console.log(error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // to create the cabin

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("Cabin could not be created");
    console.log(error);
  }

  //upload a file
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error("Image could not be uploaded/Cabin wasn't created");
    console.log(storageError);
  }
  return data;
}

// example update code
// export async function updateCabin(id) {
// const { data, error } = await supabase
// .from("cabins")
// .update({ other_column: "otherValue" })
// .eq("some_column", "someValue")
// .select();
// }

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(`Cabin ${id} cannot be deleted`);
    console.log(error);
  }

  return data;
}
