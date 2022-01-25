# whatsapp-clone

### [Click here](https://whatsapp-clone-9ba28.web.app) to check the deployed version of the app.  
  
This is a clone of whatsapp with limited functionalities. 

### Creating the app  
Create a react app using `npx create-react-app {app-name}`. Download the packages mentioned below. If some of the packages are not working then specifically import the versions given below.
| Package Name | Version |
|---|---|
|@emotion/react|11.7.1|
|@emotion/styled|11.6.0|
|@mui/icons-material|5.3.0|
|@mui/material|5.3.0|
|firebase|9.6.4|
|react-router-dom|6.2.1|  
Only the src folder has been uploaded in this repository. Copy the contents of this file and replace it with the ones in the project src folder. **Do not replace package.json and package-lock.json.***  
Comments have been given in the code for ease of understanding.

### Deploying/Hosting the app
**Note:** I faced difficulties executing the firebase scripts using powershell. If you also face this problem then use command prompt instead.
1. run `firebase login` and login using your google account.
2. run `firebase init` and select the following commands:
   2.1. Select Hosting: Configure and deploy Firebase Hosting sites 
