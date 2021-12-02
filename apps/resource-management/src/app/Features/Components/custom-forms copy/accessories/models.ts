export interface PersonalDetailsModel {
  employeeIdNumber: string | null
  firstName: string | null
  middleName: string | null
  lastName: string | null
  gender: string | null
  genderDetail: string | null
  dateofBirth: Date | null
  emails: string[]
  phoneNumbers: string[]
  nationalities: string[]
}

export interface OrganizationalDetailsModel {
  country: string | null,
  dutyStation: string | null,
  companyEmail: string | null,
  phoneNumber: string | null,
  jobTitle: string | null,
  businessUnit: string | null,
  department: string | null,
  reportingManager: string | null,
  employmentType: string | null,
  joiningDate: string | null,
  terminationDate: string | null,
  status: string | null
}

export interface AddressModel {
  country: string,
  stateRegionProvice: string,
  city: string,
  subcityZoneAddressline1: string,
  weredaAddressline2: string,
  houseNumber: string,
  postalCode: string,
  phoneNumber: string,
}

export interface EmergencyContactModel {
  firstName: string | null
  middleName: string | null
  lastName: string | null
  relationship: string | null
}

export interface FamilyDetailModel {
  relationship: string | null,
  relationshipDescription: string | null
  firstName: string | null
  middleName: string | null
  lastName: string | null
  gender: string | null
  dateofBirth: Date | null
  remark: string | null
}
