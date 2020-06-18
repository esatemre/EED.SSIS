CREATE TABLE [SalaryHistories] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeId] int NOT NULL,
    [PreviousSalary] decimal(18,2) NOT NULL,
    [Date] datetime2 NOT NULL,
    CONSTRAINT [PK_SalaryHistories] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SalaryHistories_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([Id]) ON DELETE CASCADE
);