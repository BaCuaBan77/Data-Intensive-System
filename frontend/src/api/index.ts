import { z } from 'zod'

// Response schemas based on the database schema
export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  full_name: z.string().nullable(),
  role: z.string(),
  match_wins: z.number().default(0),
  match_losses: z.number().default(0),
  match_ties: z.number().default(0),
  total_matches: z.number().default(0),
  status: z.string().nullable(),
  currency_balance: z.number().default(0),
  purchased_items: z.any(), // JSONB type
  rating: z.number().nullable(),
})

// Request schemas for search parameters
export const UserSearchParamsSchema = z.object({
  email: z.string().optional(),
})

// Infer TypeScript types from Zod schemas
export type UserResponse = z.infer<typeof UserResponseSchema>
export type UserSearchParams = z.infer<typeof UserSearchParamsSchema>

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api' // Adjust based on your backend URL

// Helper function for API calls
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Helper function to build query parameters
function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const filteredParams = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  
  return filteredParams.length > 0 ? `?${filteredParams.join('&')}` : ''
}

// READ ENDPOINTS

/**
 * Get all users or search users by email
 * @param searchParams Optional search parameters including email filter
 * @returns Array of users
 */
export async function getUsers(searchParams?: UserSearchParams) {
  const queryString = searchParams ? buildQueryString(searchParams) : ''
  const response = await apiRequest<UserResponse[]>(`/users${queryString}`)
  return z.array(UserResponseSchema).parse(response)
}

// Default export for convenience
const api = {
  // READ ENDPOINTS
  getUsers,
}

export default api
