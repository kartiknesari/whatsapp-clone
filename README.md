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
   - Select **Hosting: Configure and deploy Firebase Hosting sites** by pressing the `spacebar` and move to the next section by hitting `enter`.
   - Select **Use an existing project** and select the project you are using for the whatsapp clone.
   - If problems occur then follow the solution firebase CLI provides as a workaround.
3. ***Make sure there are no errors in this step. Type "build" when firebase asks "what do you want to use as your public directory?"***
4. Enter "y" when firebase asks "Configure as a single-page app (rewrite all urls to /inde.html)?"
5. run `npm run build` when firebase initialization is completed. This creates an optimized version of the app that can be used in production.
6. run `firebase deploy` and you firebase will provide you a "Hosting URL". Click the link and watch the deployed version of your application.
