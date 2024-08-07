export async function validateResponse(response: any) {
  if (
    (response.status === 200 || response.status === 201) &&
    response.ok &&
    !response?.toString()?.startsWith("<!DOCTYPE")
  ) {
    return await response.json();
  } else {
    return null;
  }
}
