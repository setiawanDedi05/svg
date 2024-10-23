import { db } from "@/app/server/db";

export const POST = async (req: Request) => {
  const {data} = await req.json();


    const email = data.email_addresses[0].email_address;
    const name = data.first_name;
    const imageUrl = data.image_url;
    const id = data.id;

    await db.user.create({
      data: {
        id,
        email,
        name,
        imageUrl,
      },
    });

  return new Response("Webhook received", { status: 200 });
};
