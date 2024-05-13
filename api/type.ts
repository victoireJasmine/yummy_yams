import { Request, Response } from 'express';
import { IPastry } from './models/pastryModel';
export type CustomRequest = Request & { user?: { id: string } | null, pastries?:IPastry[]};
export type CustomResponse = Response;