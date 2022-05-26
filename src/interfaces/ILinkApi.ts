export interface ILinkApiUser {
  createdAt: string
  firstName: string
  avatar: string
  email: string
  lastName: string
  id: number
}

export interface ILinkApiAddress {
  street: string
  city: string
  state: string
  zipcode: string
  country: string
  number: number
  id: number
  userId: number
}

export interface ILinkApiContact {
  name: string
  phoneNumber: string
  email: string
  id: number
  userId: number
}
