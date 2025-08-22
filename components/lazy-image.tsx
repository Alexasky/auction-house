'use client';

import { useState, useEffect, useRef, HTMLAttributes } from "react";
import Image from 'next/image'

interface LazyImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
	const [imgSrc, setImgSrc] = useState(src || "/placeholder.svg")
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative w-full h-full ${!loaded ? "bg-gray-200" : ""} overflow-hidden`}
    >
      {isVisible && (
				<Image 
					src={imgSrc}
					alt={alt}
					width={400}
					height={400}
					onError={() => setImgSrc("/placeholder.svg")}
					onLoad={() => setLoaded(true)}
					className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
				/>
      )}
    </div>
  );
};

export default LazyImage;