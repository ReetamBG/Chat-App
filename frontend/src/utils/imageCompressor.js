const compressImage = (base64Image, maxSizeKB = 300) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = base64Image

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let quality = 0.92
      let compressedBase64 = canvas.toDataURL('image/jpeg', quality)

      while (compressedBase64.length / 1024 > maxSizeKB && quality > 0.1) {
        quality -= 0.05
        compressedBase64 = canvas.toDataURL('image/jpeg', quality)
      }

      resolve(compressedBase64)
    }
  })
}

export default compressImage