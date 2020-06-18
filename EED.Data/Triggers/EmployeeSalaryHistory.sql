CREATE TRIGGER [EmployeeSalaryHistory]
ON [dbo].[Employees]
FOR UPDATE
AS
BEGIN
	SET NOCOUNT ON;
	Insert Into dbo.SalaryHistories(EmployeeId, Date, PreviousSalary) 
	(select Id, getutcdate(), CurrentSalary from deleted)
END
GO