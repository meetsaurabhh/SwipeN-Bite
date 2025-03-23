# SwipeN-Bite

## Current Situation
City exploration in unfamiliar environments creates triple challenges: finding quality dining options; finding good company, and travelling safely to and from the destination. A secure platform for finding dining establishments, taking a collective decision and matching users based on shared interests; is particularly useful to this unique inconvenience. It also ensures safety by providing the most secure route to the restaurant, factoring in safety conditions.

---

## Novelty Solution
### Safety-First Navigation Algorithm
Our proprietary routing algorithm considers multiple safety factors beyond traditional navigation apps, providing routes optimized for user security rather than just time or distance.

### Contextual Safety Analysis
We incorporate time-of-day safety variations, historical incident data, real-time traffic conditions, and community safety reports to create comprehensive safety profiles for potential routes.

### Integrated Experience Model
By combining the engaging food discovery mechanism (swipe interface) with intelligent safety navigation, we eliminate the need to switch between applications.

### Dynamic Safety Scoring
Routes receive safety scores that update in real-time based on changing conditions, allowing users to make informed decisions.

---

## Workflow
1. *User Authentication and Personal Information*
   - Users create accounts or log in via email, social media, or guest access.

2. *Location Detection/Identification*
   - App automatically detects the user's current location or allows manual input of the starting point.

3. *Food Discovery Interface*
   - Users are presented with restaurants in a swipe interface.
   - Each card displays restaurant images, cuisine type, ratings, and distance.
   - Users swipe right to save to "Eat List" or left to skip.
   - Users can share their "Eat List" and have others vote ‘yes’ or ‘no’ to eating at a particular restaurant.

4. *Restaurant Selection*
   - Users select a restaurant from either the swipe interface or the saved "Eat List."

5. *Safe Route Generation*
   - System analyzes multiple potential routes to the selected restaurant.
   - Safety factors are evaluated (crime data, lighting, traffic conditions, time of day).
   - Routes are ranked by safety score rather than just distance/time.

---

## Tech Stack
### Frontend Technology Stack
#### Core Framework & Language
- *React 18*: Main frontend framework
- *TypeScript*: For type-safe development
- *Vite*: Build tool and development server

#### UI & Styling
##### Component Libraries
- *shadcn/ui*: Modern, customizable UI components
- *radix-ui*: Accessible UI primitives
- *lucide-react*: Modern icon library

##### CSS & Styling
- *tailwindcss*: Utility-first CSS framework
- *@tailwindcss/forms*: Form styling utilities
- *tailwindcss-animate*: Animation utilities
- *class-variance-authority*: Component style variants

#### State Management & Data Flow
- *React Context API*: Application state management
- *AuthContext*: User authentication state
- *RestaurantsContext*: Food items and saved restaurants

#### Routing & Navigation
- *React Router v6*: Client-side routing
  - Protected routes
  - Route-based code splitting
  - Navigation guards

#### Data Management
- *Local Storage*: Persistent data storage
  - User authentication state
  - Saved food items
  - User preferences
  - Location settings

---

## Distinctive Features
### *Eat List*
*Eat List* allows users to save their favorite restaurants in one place. Users can also share their *Eat List* with friends and family, allowing them to vote on whether to visit a particular place or not. This feature simplifies group decision-making and makes planning dining experiences more interactive and engaging.


## Future Innovations
### *Food Cupid*
*Food Cupid* is a unique feature of SwipeN-Bite that allows users in the same city to connect with each other over food! If two users have swiped right on the same restaurant within a 5-10 minute window, the app matches them up and enables conversation. This eliminates the awkwardness of the first approach and transforms shared culinary interests into meaningful connections, creating a natural pathway to discover like-minded food enthusiasts in your area.
---

### 🥘🥗🍲🥞🥙SwipeN-Bite - Where Safety Meets Culinary Adventure! 👮🚓✅
