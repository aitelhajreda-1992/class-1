export interface FormDataState {
  name: string;
  phone: string;
  city: string;
  address: string;
  size: number;
  quantity: number;
  color: string;
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
