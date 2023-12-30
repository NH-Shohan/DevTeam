import { Controller, Post, Body, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(
    @Body() loginData: { email: string; password: string },
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ): Promise<any> {
    const passwordMatch = await this.authService.loginUser(
      loginData.email,
      loginData.password,
      session,
    );

    if (passwordMatch) {
      // Return the session to the frontend
      return res
        .status(200)
        .json({ session, success: true, role: session.role });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
