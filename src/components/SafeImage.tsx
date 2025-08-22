'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false)
  const imgSrc = !failed && typeof src === 'string' && src ? src : '/keyboard.svg'
  return <Image src={imgSrc} alt={alt} onError={() => setFailed(true)} {...props} />
}

