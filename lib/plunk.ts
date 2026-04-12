import Plunk from "@plunk/node";

if (!process.env.PLUNK_SECRET_KEY) {
    console.warn("[Plunk] PLUNK_SECRET_KEY is not set — email notifications will be skipped.");
}

export const plunk = process.env.PLUNK_SECRET_KEY
    ? new Plunk(process.env.PLUNK_SECRET_KEY)
    : null;
