const devicePixelRatio = window.devicePixelRatio || 1
export function cropImage(url, width, height, ratio) {
  const temp = ratio || devicePixelRatio
  return `${url}??imageView2/1/w/${width * temp}/h/${height * temp}`
}

export function blurryImageCrop(url, width = 30, height = 30, radio, radius = 3, sigma = 5) {
  const temp = radio || devicePixelRatio
  return `${url}?imageMogr2/thumbnail/${width * temp}x${height * temp}/blur/${radius}x${sigma}`
}
