// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express';

declare global {
  namespace NodeJS {
    interface processEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: number;
    }
  }

  namespace Express {
    enum Role {
      ADMIN = 'admin',
      MANAGER = 'manager',
    }

    interface RequestUser {
      id: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      isDisabled: boolean;
      lastLocation: string;
      score: number;
      lastLogin: Date;
      lastPasswordChanged?: Date;
      createdAt: Date;
      role: Role;
      permissions: string[];
    }
    interface Request {
      auth: RequestUser;
    }
  }
}
