CREATE FUNCTION [dbo].[CalculateSalary]
(
	@Age tinyint,
	@Height int
)
RETURNS DECIMAL(18,2)
AS
BEGIN
	RETURN CAST((40.00/@Age)*(180.00/@Height)*5000  as decimal(18,2))
END
