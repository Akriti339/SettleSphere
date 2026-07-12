# SettleSphere

A modern expense-sharing web application that helps friends and groups record shared expenses, track balances, and settle payments clearly.

## Overview

SettleSphere makes it easier to manage everyday shared spending such as trips, hostel expenses, meals, subscriptions, and group activities. Users can add friends, create groups, log expenses, split amounts among members, and view activity in one place.

## Features

- Create an account and sign in securely
- Add and manage friends
- Create expense-sharing groups
- Record expenses with amount, description, and date
- Split an expense among multiple members
- Track who paid and who owes money
- View recent expense activity
- Mark settlements after a payment is completed
- Responsive interface for desktop and mobile screens
- Purple-themed modern user interface

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, CSS
- **Backend Services:** Appwrite
- **Database:** Appwrite Databases
- **Authentication:** Appwrite Account API
- **Deployment:** Vercel

## Project Structure

```text
SettleSphere/
├── public/              # Static assets
├── src/
│   ├── _auth/           # Authentication pages and components
│   ├── components/      # Reusable UI components
│   ├── context/         # Global application state
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Appwrite configuration and API functions
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── data.json            # Sample project data
├── vercel.json          # Vercel SPA routing configuration
└── package.json          # Dependencies and scripts
