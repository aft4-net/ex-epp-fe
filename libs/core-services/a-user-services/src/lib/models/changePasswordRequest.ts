export interface ChangePasswordRequest {
    OldPassword: string;
    Password: string;
    ConfirmPassword: string;
    Email: string;
}