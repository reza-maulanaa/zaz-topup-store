import { jwtVerify } from "jose";

export type EdgeJWTPayload = {
  id: string;
  email: string;
  role: string;
};

export async function verifyTokenEdge(token: string): Promise<EdgeJWTPayload> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as EdgeJWTPayload;
}
