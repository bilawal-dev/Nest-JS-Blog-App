import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        return next.handle().pipe(
            map(data => {
                // * Modify the successful response data here
                return {
                    success: true,
                    data: data,
                    timestamp: new Date().toISOString(),
                };
            }),
        );
    }
}
