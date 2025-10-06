import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('cabins could not be deleted');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Extract scalar ID early (handles number, string, or object with .id)
  const cabinId = typeof id === 'object' ? id?.id : id;

  // console.log(cabinId, id);

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // create/edit cabin
  let query = supabase.from('cabins');

  // a) create cabin
  if (!cabinId) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', cabinId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('cabins could not be created');
  }

  // upload image if the creation is successful
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // delete the cabin is there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'cabins image could not be uploaded and cabin could bot be created'
    );
  }

  return data;
}
