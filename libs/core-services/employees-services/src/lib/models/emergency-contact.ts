import { BaseAuditEntity } from "@exec-epp/core-services/a-base-services";
import { Address } from "../..";

export interface EmergencyContact extends Address {
    FirstName: string
    MiddleName: string
    LastName: string
    Relationship: string
    PhoneNumbers: string[]
    PersonalEmailAddresses: string[]
}



// Old Models that are used currently in the back-end
// Used only the back-end is also modified to the new


export function convertEmergencyContactFromOld(emergencyOldModel: any): EmergencyContact {
    return {
        FirstName: emergencyOldModel.FirstName,
        MiddleName: emergencyOldModel.FatherName,
        LastName: emergencyOldModel.GrandFatherName,
        Relationship: emergencyOldModel.Relationship,
        PhoneNumbers: [
            emergencyOldModel.PhoneNumber,
            ...(emergencyOldModel.phoneNumber2? [emergencyOldModel.phoneNumber2]:[]),
            ...(emergencyOldModel.phoneNumber3? [emergencyOldModel.phoneNumber3]:[])
        ],
        PersonalEmailAddresses: [
            emergencyOldModel.email,
            ...(emergencyOldModel.email2? [emergencyOldModel.email2]:[]),
            ...(emergencyOldModel.email3? [emergencyOldModel.email3]:[])
        ],
        ...(emergencyOldModel as unknown as Address)
    } as EmergencyContact;
}
