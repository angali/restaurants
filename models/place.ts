//Model of places (restaurants)
export interface IPlace {
  title: string;
  id: string;
  language: string;
  ontologyId: string;
  resultType: string;
  address: Address;
  position: AccessEntityOrPosition;
  access?: (AccessEntityOrPosition)[] | null;
  distance: number;
  categories?: (FoodTypesEntityOrCategoriesEntity)[] | null;
  references?: (ReferencesEntity)[] | null;
  foodTypes?: (FoodTypesEntityOrCategoriesEntity)[] | null;
  contacts?: (ContactsEntity)[] | null;
  openingHours?: (OpeningHoursEntity)[] | null;
}
export interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  county: string;
  city: string;
  street: string;
  postalCode: string;
  houseNumber?: string | null;
}
export interface AccessEntityOrPosition {
  lat: number;
  lng: number;
}
export interface FoodTypesEntityOrCategoriesEntity {
  id: string;
  name: string;
  primary?: boolean | null;
}
export interface ReferencesEntity {
  supplier: SupplierOrCategoriesEntity;
  id: string;
}
export interface SupplierOrCategoriesEntity {
  id: string;
}
export interface ContactsEntity {
  phone?: (PhoneEntityOrWwwEntity)[] | null;
  mobile?: (PhoneEntityOrMobileEntityOrEmailEntityOrWwwEntityOrFaxEntity)[] | null;
  www?: (PhoneEntityOrWwwEntity)[] | null;
  email?: (PhoneEntityOrMobileEntityOrEmailEntityOrWwwEntityOrFaxEntity)[] | null;
  fax?: (PhoneEntityOrMobileEntityOrEmailEntityOrWwwEntityOrFaxEntity)[] | null;
}
export interface PhoneEntityOrWwwEntity {
  value: string;
  categories?: (SupplierOrCategoriesEntity)[] | null;
}
export interface PhoneEntityOrMobileEntityOrEmailEntityOrWwwEntityOrFaxEntity {
  value: string;
}
export interface OpeningHoursEntity {
  categories?: (SupplierOrCategoriesEntity)[] | null;
  text?: (string)[] | null;
  isOpen: boolean;
  structured?: (StructuredEntity)[] | null;
}
export interface StructuredEntity {
  start: string;
  duration: string;
  recurrence: string;
}
