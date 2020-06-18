CREATE TABLE [Employees] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NOT NULL,
    [LastName] nvarchar(max) NOT NULL,
    [Age] tinyint NOT NULL,
    [CurrentSalary] decimal(8,2) NOT NULL,
    [CreatedAt] datetime2 NOT NULL,
    [ModifiedAt] datetime2 NULL,
    [IsDeleted] bit NOT NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY ([Id])
);