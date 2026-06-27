import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { db } from './database'
import type { Session } from './types'

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)
const SALT_ROUNDS = 10

export interface AuthResponse {
    success: boolean
    session?: Session
    token?: string
    error?: string
}

export class MockAuth {
    // Sign up new user
    async signUp(
        email: string,
        password: string,
        fullName: string,
        role: 'client' | 'professional',
        id?: string
    ): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = db.getUserByEmail(email)
        if (existingUser) {
            return { success: false, error: 'User already exists' }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

        // Create user with optional fixed ID
        const user = db.createUser(email, passwordHash, id)

        // Create profile
        db.createProfile({
            id: user.id,
            email,
            full_name: fullName,
            role,
        })

        // Generate JWT
        const session: Session = {
            user_id: user.id,
            email: user.email,
            role,
        }

        const token = await new SignJWT({ ...session })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secretKey)

        return {
            success: true,
            session,
            token,
        }
    }

    // Sign in existing user
    async signIn(email: string, password: string): Promise<AuthResponse> {
        // Find user
        const user = db.getUserByEmail(email)
        if (!user) {
            return { success: false, error: 'Invalid credentials' }
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid) {
            return { success: false, error: 'Invalid credentials' }
        }

        // Get profile for role
        const profile = db.getProfile(user.id)
        if (!profile) {
            return { success: false, error: 'Profile not found' }
        }

        // Generate JWT
        const session: Session = {
            user_id: user.id,
            email: user.email,
            role: profile.role,
        }

        const token = await new SignJWT({ ...session })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secretKey)

        return {
            success: true,
            session,
            token,
        }
    }

    // Verify JWT token
    async verifyToken(token: string): Promise<Session | null> {
        try {
            const { payload } = await jwtVerify(token, secretKey)
            // jose returns generic payload, we need to cast/validate
            return payload as unknown as Session
        } catch {
            return null
        }
    }

    // Get session from token
    async getSession(token: string): Promise<Session | null> {
        return this.verifyToken(token)
    }
}

// Singleton instance
export const auth = new MockAuth()
