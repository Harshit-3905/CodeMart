# CodeMart

CodeMart is an e-commerce website dedicated to selling coding-related items, catering specifically to the needs of developers, programmers, and tech enthusiasts.

## Tech Stack

- **Backend**: Hono.js
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Deployment**: Cloudflare Workers and Vercel
- **Styling**: ShadCN
- **Image Handling**: Cloudinary
- **State Management**: Recoil

## Setup on Your Local Machine

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Harshit-3905/CodeMart.git
   cd CodeMart
   ```

2. **Setup environment variables in backend**

   a. Get a PostgreSQL database URL from an online provider or create a docker container for it.

   b. Create an account on Cloudinary and get the Cloudinary cloud name.
   Go to Settings > Upload > Add Upload Preset and create a new unsigned upload preset.
   ![image](https://github.com/user-attachments/assets/4f8abfd2-2e10-473c-a107-b46871b068d7)
   c. Create a .env file similar to the .env.sample file
   d. Create a wrangler.toml file similar to the wrangler.toml.sample file

3. **Install dependencies and start backend**
   ```bash
   cd Backend
   npm install
   npx prisma generate --no-engine
   npm run dev
   ```
4. **Environment Variables in frontend**
   Create a .env file similar to the .env.sample file and add backend url on your local machine

5. **Install dependencies and start frontend**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

## Contributing

If you would like to contribute to the project, please fork the repository and create a pull request.
