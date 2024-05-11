import { Request, Response } from 'express';
export type CustomRequest = Request & { user?: { id: string } | null};
export type CustomResponse = Response;