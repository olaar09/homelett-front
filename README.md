# HomeLett Contract Signing Platform

A digital contract signing platform for rental agreements and notices built with Next.js and TypeScript.

## Features

- **Contract Notices**: View and access rental notices with PDF viewing capabilities
- **Rental Agreements**: Access rental agreements and manage housing contracts
- **Secure Access**: Protected with secure authentication and encryption
- **Mobile Friendly**: Responsive design for all devices
- **Error Handling**: Automatic retry logic with exponential backoff
- **PDF Integration**: Built-in PDF viewer with download capabilities

## API Endpoints

The platform integrates with the following API endpoints:

### Notices
- `GET /notices/public/{puuid}` - Fetch notice data by unique identifier

### Agreements
- `GET /agreements/public/{puuid}` - Fetch agreement data by unique identifier

## Usage

### Accessing Contracts

1. **Notice Page**: Navigate to `/notice/[puuid]` where `puuid` is your contract identifier
2. **Agreement Page**: Navigate to `/agreement/[puuid]` where `puuid` is your contract identifier

### Example URLs
- Notice: `https://your-domain.com/notice/123e4567-e89b-12d3-a456-426614174000`
- Agreement: `https://your-domain.com/agreement/123e4567-e89b-12d3-a456-426614174000`

## API Response Format

```json
{
  "status": "success",
  "data": {
    "status": "published",
    "generated_path": "/uploads/notices/notice_123.pdf",
    "tenant_signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── notice/[puuid]/     # Notice page with dynamic routing
│   ├── agreement/[puuid]/   # Agreement page with dynamic routing
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── services/
│   ├── APIService.tsx      # Base API service
│   ├── APIUtil.tsx        # API utility manager
│   └── ContractAPIService.tsx # Contract-specific API calls
└── utils/
    ├── consts.tsx         # Constants and configuration
    └── helpers.js        # Utility functions
```

## Error Handling

The platform includes comprehensive error handling:

- **Loading States**: Visual feedback during data fetching
- **Retry Logic**: Automatic retry with exponential backoff (up to 3 attempts)
- **Empty States**: User-friendly messages when no data is found
- **Error States**: Clear error messages with retry options

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Firebase**: Authentication and backend services

## License

© 2024 HomeLett. All rights reserved.