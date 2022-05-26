type Text = {
  _text: string
}

export interface ILinkApiUser {
  createdAt: Text
  firstName: Text
  avatar: Text
  email: Text
  lastName: Text
  id: Text
}

export interface ILinkApiAddress {
  street: Text
  city: Text
  state: Text
  zipcode: Text
  country: Text
  number: Text
  id: Text
  userId: Text
}

export interface ILinkApiContact {
  name: Text
  phoneNumber: Text
  email: Text
  id: Text
  userId: Text
}
