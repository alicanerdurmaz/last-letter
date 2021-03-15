export const checkMicPermission = async () => {
  const permissionObj = await navigator.permissions.query({ name: 'microphone' })

  switch (permissionObj.state) {
    case 'denied':
      return false
    case 'prompt':
      return false
    case 'granted':
      return true
  }
}

export const askPermission = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      console.log('You let me use your mic!')
    })
    .catch(function (err) {
      console.log('No mic for you!')
    })
}
