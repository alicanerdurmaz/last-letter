export const checkMicPermission = async () => {
  const permissionObj = await navigator.permissions.query({ name: 'microphone' })

  return permissionObj.state
}

export const askPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true })
    return true
  } catch (error) {
    return false
  }
}
