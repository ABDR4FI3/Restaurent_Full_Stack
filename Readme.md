
# Restaurant Management System

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
    - [Backend (Spring Boot)](#backend-spring-boot)
    - [Web Application (React)](#web-application-react)
    - [Mobile Application (Flutter)](#mobile-application-flutter)
5. [Usage](#usage)
6. [Folder Structure](#folder-structure)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## Project Overview
The Restaurant Management System is a comprehensive solution for managing restaurant operations, including reservations, orders, menu management, and customer interactions. It consists of a mobile application for customers, a web application for admin and staff, and a robust backend server.

## Tech Stack
### Frontend
- **Mobile Application:** Flutter
- **Web Application:** React

### Backend
- **Server:** Spring Boot

### Database
- **Database:** MySQL

## Features
- **Mobile Application:**
  - Landing Page
  - Browse menu
  - Add to Favourite
  - Show meal Details 
  - Place orders
  - Go to profile page
  - See booking History


- **Web Application:**
  - Manage menu items
  - Manage reservations
  - Track orders
  - Generate reports
  - Browse Menu
  - Add to Favourite
  - Show Meal Details
  - See booking History
  - Place Orders
  - Go to profile page

- **Backend:**
  - RESTful API
  - Authentication and Authorization
  - Order management
  - Reservation management
  - Menu management

## Installation
### Prerequisites
- Java 17
- Node.js 20.15.0
- Flutter 2.x
- MySQL

### Backend (Spring Boot)
1. **Clone the repository**
    ```sh
    git clone https://github.com/ABDR4FI3/Restaurent_Full_Stack
    cd restaurant-backend
    ```

2. **Setup the database**
    - Create a MySQL database and update the `application.properties` with your database configuration.

3. **Build and run the application**
    ```sh
    ./mvnw spring-boot:run
    ```

### Web Application (React)
1. **Clone the repository**
    ```sh
    git clone https://github.com/ABDR4FI3/Restaurent_Full_Stack
    cd restaurant-web
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Start the development server**
    ```sh
    npm run dev
    ```

### Mobile Application (Flutter)
1. **Clone the repository**
    ```sh
    git clone https://github.com/ABDR4FI3/Restaurent_Full_Stack
    cd restaurant-mobile
    ```

2. **Install dependencies**
    ```sh
    flutter pub get
    ```

3. **Run the application**
    ```sh
    flutter run
    ```

## Usage
- **Backend:** Access the backend APIs at `http://localhost:8080/api`
- **Web Application:** Access the web application at `http://localhost:3000`
- **Mobile Application:** Run the application on your mobile device or emulator.

## Folder Structure
### Backend (Spring Boot)
```
restaurant-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
└── README.md
```

### Web Application (React)
```
restaurant-web/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
├── package.json
└── README.md
```

### Mobile Application (Flutter)
```
restaurant-mobile/
├── lib/
│   ├── screens/
│   ├── widgets/
│   └── main.dart
├── pubspec.yaml
└── README.md
```

## API Documentation
The API documentation is generated using Swagger and can be accessed at `http://localhost:8080/swagger-ui.html`.

## Contributing
1. **Fork the repository**
2. **Create your feature branch**
    ```sh
    git checkout -b feature/YourFeature
    ```
3. **Commit your changes**
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**
    ```sh
    git push origin feature/YourFeature
    ```
5. **Open a pull request**

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
- **Email:** its.abdrafi3@gmail.com
- **GitHub:** [ABDR4FI3](https://github.com/ABDR4FI3)
- **LinkedIn:** [Abderrafie Elguessab
](https://www.linkedin.com/in/abdr4fi3/)

---

Feel free to customize this README structure according to your project specifics and preferences.