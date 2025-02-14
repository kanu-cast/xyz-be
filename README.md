# xyz-be

# Inventory Management System

## Overview
This is a web-based **Inventory Management System** designed for XYZ Organization to track assets like **laptops, furniture, cleaning materials, and utensils**. The system provides real-time tracking of **inventory items, borrowing records, damage reports, and system logs**. It supports **role-based access control (Admin and Employee)** and ensures secure authentication.

## Features
✅ **Inventory Management:** Add, update, delete, and track inventory items.  
✅ **Borrowing System:** Assign items to users, track overdue items, and manage returns.  
✅ **Damage Reports:** Log and track damaged items with repair/disposal status.  
✅ **System Logs:** Track all user actions for auditing purposes.  
✅ **Role-Based Access:** Admin has full control, while employees have limited access.  

## Tech Stack
- **Frontend:** ReactJS, Next.js (not included in this repo)
- **Backend:** Node.js, Express.js, Sequelize (PostgreSQL)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Yup for request validation
- **Testing:** Jest, Cypress (not included in this repo)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **PostgreSQL** (Create a database named `inventory_management`)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=inventory_management
JWT_SECRET=your-secret-key

```

## Installation

### Clone the repository:

```
git clone https://github.com/kanu-cast/xyz-be.git

```

### Install dependencies:

```
npm install

```

### Sync the database:

```
npx sequelize-cli db:migrate

```

### Start the server:

```
npm run dev

```

The server will run on http://localhost:3000.



Happy Coding!
