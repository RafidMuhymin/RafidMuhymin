export async function onRequestPost({ request, env }) {
  const {
    EMAILJS_API_ENDPOINT,
    SERVICE_ID: service_id,
    TEMPLATE_ID: template_id,
    USER_ID: user_id,
    ACCESS_TOKEN: accessToken,
  } = env;

  const template_params = Object.fromEntries(await request.formData());

  return fetch(EMAILJS_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id,
      template_id,
      user_id,
      template_params,
      accessToken,
    }),
  })
    .then((res) => res.text())
    .then((res) => new Response(res))
    .catch(
      (error) =>
        new Response(error, {
          status: 400,
        })
    );
}
