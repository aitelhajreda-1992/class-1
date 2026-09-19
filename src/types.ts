export interface FormDataState {
  name: string;
  phone: string;
  city: string;
  address: string;
  size: number;
  quantity: number;
  color: string;
  size2?: number;
  color2?: string;
  notes?: string;
}

export interface FormErrorsState {
  name: string;
  phone: string;
  city: string;
  address: string;
  size: string;
}

export interface ShoeReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  sizeBought: number;
  verified: boolean;
}

export interface ShoeFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ShoeColorImage {
  url: string;
  caption: string;
  alt: string;
  angleLabel?: string;
}

export interface ShoeColor {
  id: string;
  name: string;
  colorLabel: string;
  hex: string;
  secondaryHex: string;
  imageUrl: string;
  images: ShoeColorImage[];
}
