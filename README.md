
4 Projects are created for this assignment.
EED.Data => Database Project
EED.Integration => SSIS Project
EED.Test => Test Project
EED.Web => WebAPI + Angular Project


To run in your local machine, you have to change a few configuration.
1- Please rename your excel to TestData.xlsx and then put the file under C:/Import/ or
1- Please go to "EED.Integration" Project Change the excel file path of "Excel Connection Manager" under "Connection Managers".
2- Before running excel import, please publish the "EED.Data" project with prepared configuration file ("EED.Employee.publish.xml") if you have a localdb\MSSQLLocalDB in your machine.
3- Now you can run the SSIS package (EED.Integration/SSIS Packages/Package.dtsx) to import data from the excel file into database.
4- For user interface, you can select EED.Web project and press F5. 