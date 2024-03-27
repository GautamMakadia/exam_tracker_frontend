Atmiya University Exam Tracker Front End.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Requirements
1. python3.12 (pip)
2. node.js^latest  (npm)

## Installing Dependencies

### For Frontend(Next.js)

```bash
# cd into project root directory then /exam-tracker-au
cd /extam-tracker-au

npm install
```

#### For Backend Api(Fastapi)

```bash
# cd into exam-tacker-au/api/
cd exam-tacker-au/api/

pip install -r requirement.txt

# to run fastapi
python main.py
```

## ForntEnd Setup

### Api Re-Routing (For Production)

```js
  // url can be modified before `/:path*` based how public domain is built
  // i.e. if frontend app public domain is au.exam.edu,then host the backend api at au.exam.edu/api/ by vertual host
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/:path*" // chnage the host addr and port accordingly
            : "https://au.exam.edu/api/:path*", // for production build use public domain of api insted of localhost actual whic is in the repo.
      },
    ];
  },

```

### Settign Firebase Auth Api Key.
Go to /src/lib/firebase.ts and change config object in firebase.ts with your api key config.

1. Goto firebase fonsole & create project.
2. Add web app and get the api config of web app from project setting.



## Begin Devlopment Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Build The Project
To buld the the project follow the steps below.

Pre-Requesits:
- env.production at root of the project direcotory
- backend service must be running properly.

Command to build & start:
```bash
npm run build && npm run start
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


