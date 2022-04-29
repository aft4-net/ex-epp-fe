export interface LogInResponse {
    Guid: string;
    FullName: string;
    // FirstName: string | undefined;
    // MiddleName: string | undefined;
    EmployeeId: string | undefined;
    // LastName: string| undefined;
    Email: string| undefined;
    Token: string| undefined;
}