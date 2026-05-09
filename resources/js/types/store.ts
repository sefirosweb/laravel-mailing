export type Id = number;

export type ListStatus = 'active' | 'all' | 'deleted';

export interface User {
    id: Id;
    name: string;
    email?: string;
}

export interface Group {
    id: Id;
    name: string;
    to: string;
    description: string | null;
    deleted_at?: string | null;
}

export interface List {
    id: Id;
    name: string;
    code: string;
    description: string | null;
    // Eager-loaded counters from GET /mailing_list (withCount).
    users_count?: number;
    groups_count?: number;
    deleted_at?: string | null;
}

export interface ListPayload {
    name: string;
    code: string;
    description: string;
}

export interface GroupPayload {
    name: string;
    to: string;
    description: string;
}

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}
