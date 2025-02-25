import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log(req.method, req.url);
    res.send('NHL API');
});

export default router;