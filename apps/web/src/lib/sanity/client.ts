import { createClient, type SanityClient } from "@sanity/client";

/**
 * Get the Sanity project ID from environment variables.
 * Returns a placeholder when not configured to prevent build errors.
 */
function getProjectId(): string {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  if (!projectId) {
    // Return a placeholder that will fail gracefully at runtime
    // This allows the project to build without Sanity configuration
    console.warn(
      "SANITY_PROJECT_ID is not set. Sanity queries will fail until configured."
    );
    return "not-configured";
  }
  return projectId;
}

/**
 * Check if Sanity is properly configured.
 * Use this before making queries to provide better error messages.
 */
export function isSanityConfigured(): boolean {
  return Boolean(import.meta.env.SANITY_PROJECT_ID);
}

/**
 * Main Sanity client for production use.
 * Uses CDN for faster responses in production.
 */
export const client: SanityClient = createClient({
  projectId: getProjectId(),
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: import.meta.env.SANITY_API_VERSION || "2024-01-01",
  useCdn: import.meta.env.PROD,
  // Token is optional - only needed for draft content
  token: import.meta.env.SANITY_READ_TOKEN,
});

/**
 * Preview client for real-time updates.
 * Bypasses CDN to get the latest content.
 */
export const previewClient: SanityClient = createClient({
  projectId: getProjectId(),
  dataset: import.meta.env.SANITY_DATASET || "production",
  apiVersion: import.meta.env.SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: import.meta.env.SANITY_READ_TOKEN,
});
