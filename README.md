Here is a detailed README file based on the `VoidDesk.tsx` component you provided.

-----

# VOID Desk: Support Ticket Dashboard

VOID Desk is a modern, responsive support ticket dashboard built with React, TypeScript, and TailwindCSS. It provides a clean, data-rich interface for support agents to view, search, filter, and manage customer support tickets efficiently.

This project is currently a front-end-only application with mock data. The next planned phase is to add authentication and connect it to a live backend.

## Key Features

  * **At-a-Glance Dashboard:** Four prominent stat cards display **Total Tickets**, **Open**, **In Progress**, and **Resolved** counts, derived from the main ticket list.
  * **Dynamic Filtering:** Quickly filter the ticket list by status (All, Open, In Progress, Resolved) with a single click.
  * **Live Search:** Instantly search and filter tickets by **Ticket ID**, **Title**, or **Customer Name**.
  * **In-Place Ticket Management:** Change a ticket's status (Open, In Progress, Resolved) directly from the list view using a dropdown. This currently updates the local state.
  * **Visual Priority & Status:**
      * Tickets display a color-coded priority badge (Critical, High, Medium, Low).
      * Each ticket shows a relevant icon and text for its current status (Open, In Progress, Resolved).
  * **Informative Ticket Cards:** Each card clearly shows the ticket ID, title, customer, priority, status, time since last update, and message count.
  * **Modern & Responsive UI:** A sleek, dark-mode interface with blur and gradient effects that works beautifully on both desktop and mobile devices.
  * **Empty State:** A helpful "No tickets found" message appears with an icon when search or filter criteria result in an empty list.

## Tech Stack

  * **React** (v18+)
  * **TypeScript**
  * **TailwindCSS** (for utility-first styling)
  * **Lucide React** (for icons, e.g., `Search`, `User`, `Clock`)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js (v16 or higher)
  * `npm` or `yarn`

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/void-desk.git
    cd void-desk
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

4.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or your configured port) in your browser to see the application.

-----

## Project Structure (Proposed)

While the project currently lives in a single component (`VoidDesk.tsx`), a more scalable structure would look like this:

```
/src
|
|-- /components
|   |-- /ui
|   |   |-- Button.tsx
|   |   |-- Card.tsx
|   |   `-- Input.tsx
|   |
|   |-- DashboardStats.tsx  # The 4-card grid
|   |-- SearchBar.tsx       # The search and filter controls
|   |-- TicketCard.tsx      # A single ticket item
|   |-- TicketList.tsx      # The list mapping
|   |-- Header.tsx          # The main app header
|   `-- Login.tsx           # (Future) Admin login page
|
|-- /lib
|   |-- hooks.ts            # (Future) Custom hooks
|   `-- utils.ts            # Helper functions (e.g., getPriorityColor)
|
|-- /data
|   `-- mockData.ts         # To store the initial ticket array
|
|-- /pages
|   |-- index.tsx           # Main dashboard page (renders VoidDesk)
|   `-- login.tsx           # (Future) Login route
|
`-- App.tsx                 # Main app component
```

## Component Breakdown (`VoidDesk.tsx`)

This is the heart of the application. Here’s a breakdown of its internal logic:

### State Management

The component uses `useState` to manage the application's entire state:

  * `tickets`: Holds the array of all ticket objects. **This is currently mock data**.
  * `filter`: A string (`'all'`, `'open'`, `'in-progress'`, `'resolved'`) that stores the currently active status filter.
  * `searchTerm`: A string that stores the value from the search input.
  * `selectedTicket`: (Currently unused) Intended to hold the ticket object that the user clicks on, for displaying a detail view.

### Core Logic & Functions

  * `filteredTickets`: A derived array that is computed on every render. It first filters the master `tickets` list based on the `filter` state, then filters that result based on the `searchTerm` state. This is what gets rendered in the list.
  * `stats`: An object (`{ open, inProgress, resolved, total }`) that is computed by filtering the `tickets` array. This populates the dashboard stat cards.
  * `getPriorityColor(priority)`: A helper function that returns the appropriate TailwindCSS classes for a ticket's priority, allowing for dynamic color-coding.
  * `getStatusIcon(status)`: A helper function that returns the correct `lucide-react` icon component based on the ticket's status.
  * `updateTicketStatus(ticketId, newStatus)`: This function updates the master `tickets` state. It maps over the array and replaces the single ticket that matches the `ticketId` with a new object, spreading its old properties and overwriting the `status`.

### Rendering

The component is rendered in several distinct blocks:

1.  **Header:** A fixed, blurred header with the "VOID Desk" title and a user icon.
2.  **Stats Cards:** A 4-column grid rendering the `stats` object with gradient and blur effects.
3.  **Search and Filter:** The search `input` and the four filter `button`s. Their `onClick` and `onChange` handlers update the `filter` and `searchTerm` state, respectively.
4.  **Tickets List:**
      * Maps over the `filteredTickets` array to render a `TicketCard` for each ticket.
      * Passes ticket data to the helper functions to get the correct colors and icons.
      * Includes a `<select>` dropdown for changing the status. It uses `e.stopPropagation()` to prevent the card's `onClick` from firing when the dropdown is clicked.
5.  **Empty State:** A conditional block that renders a message and icon if `filteredTickets.length === 0`.

-----

## Roadmap & Future Plans

This project has a clear path for expansion, building on the existing front-end.

  * **Admin Authentication:**

      * Create a dedicated `/login` page (as you planned).
      * Implement an authentication flow (e.g., with Firebase, Supabase, or a custom backend) to protect the dashboard.

  * **Backend & API Integration:**

      * Replace the mock `tickets` array with a real data source.
      * Use `fetch` or a library like `axios` to `GET` tickets from an API.
      * Update the `updateTicketStatus` function to `POST` or `PUT` changes to the backend instead of just updating local state.

  * **Ticket Detail View:**

      * Use the `selectedTicket` state.
      * On ticket click, open a modal or navigate to a new page (`/ticket/[id]`).
      * This view should show all ticket details, a full message history, and an input to add new messages.

  * **Functional "More" Button:**

      * Implement the `MoreVertical` button to open a dropdown menu with actions like "Assign to user," "Delete ticket," or "View user history."

  * **Create New Ticket:**

      * Add a "New Ticket" button that opens a modal with a form for creating and submitting a new support ticket.

  * **Pagination:**

      * If the ticket list becomes long, implement pagination to improve performance and usability.