
# Next Portfolio

[Next Portfolio](https://next-portfolio-ten-fawn.vercel.app)

## Overview

Next portfolio is a personal portfolio site.

## Features

1. Users can login via github and google.
2. Anyone can explore all available projects and blogs.
3. Logged user can access the dashboard.
4. Logged user can manage blogs, messages and projects.
5. Anyone can leave a message.

## Technologies Used

- **Frontend**: React, Nextjs, Tailwind CSS, TypeScript, ShadCN UI, Framer Motion
- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
- **State Management**: Redux, RTK Query

## Resources

- [React Router](https://reactrouter.com/en/main)
- [ShadCN UI](http://ui.shadcn.com)
- [React Hook Form](https://reacthookform.com/)
- [Lottie React](https://lottiereact.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux](https://redux.dev)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Framer Motion](https://motion.dev)

## How to Clone and Run

### 1. Clone Repositories

Clone both the client and server repositories to your computer:

```bash
git clone https://github.com/Md-Rashedul-Islam-Rajib/next-portfolio
git clone https://github.com/Md-Rashedul-Islam-Rajib/next-port-server
```

### 2. Configure Backend Credentials

Replace the necessary environment variables in the `.env` file of the server repository:

```bash
GITHUB_ID=your_githubid
GITHUB_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=abc
NEXTAUTH_URL=your_nextAuth_URL
```

- Add your localhost URL to CORS in the `app.ts` file in the server repository.

### 3. Install Dependencies

Open both the client and server repository folders in the command line interface (CLI) and install the necessary npm packages by running:

```bash
pnpm install
```

### 4. Start the Server

Navigate to the server repository folder and start the server using `nodemon`:

```bash
cd next-port-server
pnpm dev
```

### 5. Start the Client

Navigate to the client repository folder and start the client development server:

```bash
cd next-portfolio
pnpm dev
```


