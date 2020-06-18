CREATE PROCEDURE [dbo].[UpdateEmployee]
	@FirstName nvarchar(MAX),
	@LastName nvarchar(MAX),
	@Age tinyint,
	@Height int
AS
BEGIN
	Declare @Salary decimal(8,2)
	Set @Salary = dbo.CalculateSalary(@Age,@Height)
	
	IF NOT EXISTS (SELECT 1 FROM dbo.Employees Where FirstName=@FirstName AND LastName=@LastName AND Age=@Age)
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				Insert Into dbo.Employees
				(
					FirstName,
					LastName,
					Age,
					CurrentSalary,
					CreatedAt,
					ModifiedAt,
					IsDeleted
				)
				Values 
				(
					@FirstName,
					@LastName,
					@Age,
					@Salary,
					GETUTCDATE(),
					NULL,
					0
				)
			COMMIT TRAN
		END TRY
		BEGIN CATCH
			ROLLBACK TRAN
			RETURN 1 --error code 1
		END CATCH
	END

RETURN 0
END
