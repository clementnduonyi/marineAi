// This service simulates a backend database (like Supabase with Prisma) using localStorage.
// In a real-world application, these functions would make API calls to a secure backend.

import type { DbUser } from '../types';

const USERS_STORAGE_KEY = 'MARINE_AI_PRO_USERS';
const SESSION_STORAGE_KEY = 'MARINE_AI_PRO_SESSION';

// Simulate network latency
const FAKE_LATENCY = 300; 

// Helper to get all users from localStorage
const getUsers = (): Record<string, DbUser> => {
    try {
        const users = localStorage.getItem(USERS_STORAGE_KEY);
        return users ? JSON.parse(users) : {};
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return {};
    }
};

// Helper to save all users to localStorage
const saveUsers = (users: Record<string, DbUser>): void => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Simulate Prisma's findOrCreate or upsert logic
export const findOrCreateUser = async (email: string): Promise<{user: DbUser}> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const users = getUsers();
            if (!users[email]) {
                users[email] = { email, generationsLeft: 5, isPro: false };
                saveUsers(users);
            }
            // Store session
            localStorage.setItem(SESSION_STORAGE_KEY, email);
            resolve({ user: users[email] });
        }, FAKE_LATENCY);
    });
};

export const getCurrentUser = async (): Promise<DbUser | null> => {
     return new Promise(resolve => {
        setTimeout(() => {
            const email = localStorage.getItem(SESSION_STORAGE_KEY);
            if (!email) {
                resolve(null);
                return;
            }
            const users = getUsers();
            resolve(users[email] || null);
        }, FAKE_LATENCY);
    });
}

export const clearCurrentUser = async (): Promise<void> => {
    return new Promise(resolve => {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        resolve();
    });
}

export const updateUserGenerations = async (email: string, generationsLeft: number): Promise<DbUser> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers();
            if (users[email]) {
                users[email].generationsLeft = generationsLeft;
                saveUsers(users);
                resolve(users[email]);
            } else {
                reject(new Error("User not found"));
            }
        }, FAKE_LATENCY);
    });
};

export const upgradeUserToPro = async (email: string): Promise<DbUser> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getUsers();
            if (users[email]) {
                users[email].isPro = true;
                users[email].generationsLeft = 999; // Effectively unlimited
                saveUsers(users);
                resolve(users[email]);
            } else {
                reject(new Error("User not found"));
            }
        }, FAKE_LATENCY);
    });
}
