# Playwright - TS Test Project
Install project with the following line on your terminal. 
```
npm init playwright@latest
```
Create your project by following the prompts on the terminal.

>[!WARNING]
>If you are setting up a TypeScript project;
>TypeScript doesn't recognize the process global variable inside playwright.config.ts because it's a Node.js API. Because of that you get error message for the keyword  `process`.  
> Create a tsconfig.json and add `"moduleResolution": "bundler",`
> Add the following script inside the package.json to solve the issue.
```
"ts-node": {
    "compilerOptions": {
      "types": ["node"]
    }
  },
```

Install dotenv with this line `npm install dotenv`. This is to keep confidential information like passwords, API keys, or database strings safe in .env file.

# Create a repository on Github
* Login to your github,  
* Create a folder and name it. 
* ollow the instructions on github after creating your repository.

>[IMPORTANT]
>Because I didn't push .env file, github sends email letting you know that your tests fail after each push.
>To handle this, go to your github repository  `Settings > Secrets and variables > Actions`.
>Click `New repository secret`.
>Enter your .env file contents as `Name` and `Value`
>In your project create a file as `.github/workflows/playwright.yml` where environment secrets are included. 