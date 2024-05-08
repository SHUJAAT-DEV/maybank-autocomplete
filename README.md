
Project structure 
-----------------------------------------
> The idea behind the folder structure below is to containerize each behavior or functionality into nested folders according to their relatedness and reusability in the project.

```
├── node_modules (.gitignore)
├── public
│   ├── favicon.ico
│   └── manifest.json
├── src
│   ├── assets    # we can add the assets folder to add images
│   │   │   ├── images
│   │   │   └── logo.svg
│   ├── constants/data  # I have named data to contain all the mocket data         
│   │   └── data.js
│   ├── feature  #This mainly for redux toolkit we define the slices and other related thing         
|   │   ├── locations         
|   |   │   ├── searchSlice       
|   |   │   └── ..  
│   ├── pages
│   │   ├── search
│   │   │   ├── __test__
│   │   |   │   ├── Search.test.tsx
│   │   │   ├── Search.tsx
│   │   └── index.ts
│   ├── types
│   │   ├── ...
│   │   └── index.ts
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
└── README.md
└── tsconfig.json
```

How to run the code 
 ```
  1. npm install 
  2. npm run dev
  3. npm run test

  ``` 