import type { RequestHandler } from "./$types";
import * as auth from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { resolve } from "$app/paths";

export const GET: RequestHandler = async (event) => {
  if (event.locals.session) {
    await auth.invalidateSession(event.locals.session.id);
  }

  auth.deleteSessionTokenCookie(event);

  throw redirect(302, resolve("/login"));
};
