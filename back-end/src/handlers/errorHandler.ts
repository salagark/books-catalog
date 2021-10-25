import { Request, Response } from "express";

export function apiErrorHandler(err: any, req: Request, res: Response, message: string) {
	const error: object = { Message: message, Request: req, Stack: err };
	console.log(err);
	res.status(500);
	res.json({ Message: message });
}
