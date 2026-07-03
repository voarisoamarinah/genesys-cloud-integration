# Genesys Cloud Integration API

A REST API that integrates with **Genesys Cloud** to expose agent data (list, availability, and single-agent status) to internal consumers, with OAuth2 client-credentials authentication against the Genesys Cloud platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- Fetch the full list of Genesys Cloud agents, enriched with presence, routing status, division, and queues.
- Filter agents by queue name.
- Retrieve only agents currently able to receive a new interaction.
- Retrieve availability details for a single agent by ID.
- Centralized, typed error handling with consistent JSON responses.
- Automatic OAuth2 token retrieval and caching for Genesys Cloud API calls.

## Tech Stack

- **Node.js** with **ES Modules**
- **Express** — HTTP server and routing
- **Axios** — HTTP client for Genesys Cloud API calls
- **dotenv** — environment variable management
- **nodemon** — development auto-reload

## Project Structure

```
src/
├── app.js                        # Express app setup (middlewares, routes)
├── server.js                     # Server bootstrap
├── config/
│   ├── env.js                    # Loads environment variables (dotenv)
│   └── genesys.config.js         # Genesys Cloud configuration (region, credentials, URLs)
├── controllers/
│   └── agents.controller.js      # Request handlers for agent endpoints
├── services/
│   ├── agents.service.js         # Business logic for agents
│   └── genesys/
│       ├── api.service.js        # Genesys Cloud API calls (users, queues)
│       ├── auth.service.js       # Genesys Cloud OAuth2 token retrieval/caching
│       └── httpClient.js         # Axios instance with auth + error interceptors
├── mappers/
│   └── agent.mapper.js           # Maps raw Genesys user data to API agent shape
├── rules/
│   └── availability.rule.js      # Business rule: can an agent receive an interaction?
├── middlewares/
│   ├── auth.middleware.js        # Validates the incoming Authorization header
│   └── error.middleware.js       # Global error handler + 404 fallback
├── utils/
│   └── errors.js                 # Custom error classes (AppError and subclasses)
└── routes/
    ├── index.js                  # Root API router
    └── agents.routes.js          # Agent-related routes
```

## Prerequisites

- Node.js 18+
- A Genesys Cloud OAuth **Client Credentials** grant (Client ID + Client Secret)
- A valid Genesys Cloud region (e.g. `mypurecloud.com`, `mypurecloud.ie`, etc.)

## Installation

```bash
git clone [<repository-url>](https://github.com/voarisoamarinah/genesys-cloud-integration.git)
cd genesys-cloud-integration
npm install
```

## Environment Variables

Create a `.env` file at the project root:

```env
PORT=3000

GENESYS_REGION=mypurecloud.com
GENESYS_CLIENT_ID=your-genesys-client-id
GENESYS_CLIENT_SECRET=your-genesys-client-secret
```

| Variable                 | Description                                             |
|---------------------------|-----------------------------------------------------------|
| `PORT`                    | Port the Express server listens on (default: `3000`)      |
| `GENESYS_REGION`          | Genesys Cloud region domain (used to build API/login URLs)|
| `GENESYS_CLIENT_ID`       | OAuth Client Credentials client ID                         |
| `GENESYS_CLIENT_SECRET`   | OAuth Client Credentials client secret                     |

## Running the Project

**Development** (with auto-reload):

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Authentication

This API sits **in front of** Genesys Cloud and requires its own bearer token on every request under `/api`.

```
Authorization: Bearer <token>
```

The token supplied in the header is forwarded to Genesys Cloud to authenticate outbound requests. Genesys Cloud's own OAuth2 client-credentials token (used internally for the `httpClient`) is fetched and cached automatically via `auth.service.js`.

## API Endpoints

All endpoints are prefixed with `/api` and require the `Authorization` header described above.

### `GET /api/agents`

Returns the full list of agents.

**Query parameters:**

| Param   | Type   | Description                          |
|---------|--------|----------------------------------------|
| `queue` | string | Optional. Filters agents by queue name |

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "agentId": "string",
      "fullName": "string",
      "email": "string",
      "division": "string",
      "queues": ["string"],
      "presence": "string",
      "routingStatus": "string",
      "onQueue": true,
      "canReceiveInteraction": true
    }
  ]
}
```

### `GET /api/agents/available`

Returns only the agents currently able to receive a new interaction (`canReceiveInteraction: true`).

**Query parameters:**

| Param   | Type   | Description                          |
|---------|--------|----------------------------------------|
| `queue` | string | Optional. Filters agents by queue name |

**Response `200`:** same shape as `GET /api/agents`, filtered.

### `GET /api/agents/:id/availability`

Returns the availability details for a single agent.

**Path parameters:**

| Param | Type   | Description         |
|-------|--------|------------------------|
| `id`  | string | Genesys Cloud agent/user ID |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "agentId": "string",
    "fullName": "string",
    "presence": "string",
    "routingStatus": "string",
    "onQueue": true,
    "queues": ["string"],
    "canReceiveInteraction": true
  }
}
```

## Error Handling

The API returns consistent JSON error responses with appropriate HTTP status codes:

```json
{
  "success": false,
  "message": "Description of the error"
}
```

| Status | Case                                   |
|--------|-----------------------------------------|
| `400`  | Invalid filter or invalid input (e.g. malformed agent ID) |
| `401`  | Missing or malformed `Authorization` header |
| `403`  | Token rejected by Genesys Cloud (invalid/expired) |
| `404`  | Agent not found, or unknown route |
| `500`  | Unexpected/unhandled server error |

Errors are handled through custom classes in `src/utils/errors.js` (`BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`), caught centrally by `error.middleware.js`.

## License

This project was developed as part of a technical assessment.
