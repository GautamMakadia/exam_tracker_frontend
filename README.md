Atmiya University Exam Tracker Front End.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installing Dependencies
```bash
npm install
```

### Setting Enviroment variables
Need to create two files in root directory env.devlopment, env.production,
variables which can be visible to client must starts with 'NEXT_PUBLIC_' [see for more.](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- **devlopement** variables used for devlopemnt purpose.
- **production** variables used when project is build for public.

```bash
NEXT_PUBLIC_HTTP_PROTO="http/https"
# au.examtracker.com or 127.0.0.1:3000
NEXT_PUBLIC_HTTP_HOST="domain/address:port"
# au.examtracker.api or 127.0.0.1:8000
NEXT_PUBLIC_HTTP_API_HOST="domain/address:port" #for backend api
```

### Settign Firebase Auth Api Key.
Go to /src/lib/firebase.ts and change config object in firebase.ts with your api key config.

1. Goto firebase fonsole & create project.
2. Add web app and get the api config of web app from project setting.


### Start The Backend Api
Get the backend [repo.](https://github.com/GautamMakadia/exam-tracker-backend) and follow the steps.


###  run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Bulid & Start The Project
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


