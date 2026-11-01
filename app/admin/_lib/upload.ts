import type { SupabaseClient } from '@supabase/supabase-js'

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

/**
 * Uploads an image to the public "site-images" bucket and returns its public address.
 * Does nothing (returns {}) when no file was chosen. Only admins can write to the bucket: the database enforces it.
 */
export async function uploadImage(
  supabase: Pick<SupabaseClient, 'storage'>,
  file: FormDataEntryValue | null,
  folder: 'team' | 'projects',
): Promise<{ url?: string; error?: string }> {
  if (!(file instanceof File) || file.size === 0) return {}
  const ext = TYPES[file.type]
  if (!ext) return { error: 'Use a JPG, PNG or WebP image.' }
  if (file.size > MAX_IMAGE_BYTES) return { error: 'Images must be 5 MB or smaller.' }

  const path = `${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('site-images').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
  })
  if (error) return { error: `Couldn’t upload the image: ${error.message}` }
  return { url: supabase.storage.from('site-images').getPublicUrl(path).data.publicUrl }
}
