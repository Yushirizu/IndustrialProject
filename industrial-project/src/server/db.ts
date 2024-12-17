import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const createPrismaClient = () =>
    new PrismaClient({
        log: env.NODE_ENV === "development"
            ? [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'error' },
                { emit: 'stdout', level: 'warn' }
              ]
            : [{ emit: 'stdout', level: 'error' }],
    });

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Optional: Handle query events if needed
db.$on('query', (e) => {
    // Handle query event, e.g., log to a file or external service
    // console.log(e);
});