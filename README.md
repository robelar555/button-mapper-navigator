# Welcome to your Lovable project

##
## Project info

This project convert JSON in format:

[ {"name": "personlig-info",
    "buttons": [
      "Logg ut",
      "Avbryt",
      "Flere detaljer",
      "Neste"
    ]},
      {
    "name": "personlig-info",
    "buttons": [
      "Logg ut",
      "Avbryt",
      "Flere detaljer",
      "Neste"
    ]}
   
  ]
  
to format like

[
  {
    "sourceComponentName": "arbeidserfaring",
    "sourceButtonText": "Avbryt",
    "targetComponentName": "forhåndsvisning",
    "conditions": "Når en er logget ut"
  },
  {
    "sourceComponentName": "arbeidserfaring",
    "sourceButtonText": "Logg ut",
    "targetComponentName": "forhåndsvisning",
    "conditions": "Når skjemaet er ugyldig."
  }
]
    
**URL**: https://lovable.dev/projects/cf8a1b7c-4e8a-480a-8fdc-0aa8fc258dbc


## PICTURES ##

![image](https://github.com/user-attachments/assets/eb5217ae-f32d-4541-a344-2c362a2ee0d5)


![image](https://github.com/user-attachments/assets/4b9a6cf4-5695-44f6-a86c-0e61828304a6)

![image](https://github.com/user-attachments/assets/1134d45a-3d18-4f20-942e-a834005cbf1d)

![image](https://github.com/user-attachments/assets/35faada1-92a8-4072-9a1b-c1c6079f9491)


![image](https://github.com/user-attachments/assets/26f62f34-29fb-4b04-aeaa-0c0c30c6b1b3)

![image](https://github.com/user-attachments/assets/3eccfac2-00e7-4e53-89bf-08baf19ff12c)


![image](https://github.com/user-attachments/assets/686853af-fad2-42fb-ac25-e584b1264296)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/cf8a1b7c-4e8a-480a-8fdc-0aa8fc258dbc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/cf8a1b7c-4e8a-480a-8fdc-0aa8fc258dbc) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
