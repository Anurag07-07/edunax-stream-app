import { PrismaClient } from '@prisma/client'

// Extend globalThis type to include a cached Prisma instance
declare global {
  var prisma: PrismaClient | undefined
}

// Create a single PrismaClient instance (singleton pattern)
export const db = globalThis.prisma || new PrismaClient()

// Cache the Prisma instance in development to prevent multiple connections
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

export {}
